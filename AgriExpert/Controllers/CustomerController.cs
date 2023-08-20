using AgriExpert.Models.DTO;
using AgriExpert.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace AgriExpert.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize(Roles = "Admin")]
    public class CustomerController : Controller
    {
        private readonly ICustomerRepository customerRepository;
        private readonly IMapper mapper;
        private readonly IPackageRepository packageRepository;
        readonly IMemoryCache memoryCache = new MemoryCache(new MemoryCacheOptions());
        public CustomerController(ICustomerRepository customerRepository, IMapper mapper,
            IPackageRepository packageRepository,IMemoryCache memoryCache)
        {
            this.customerRepository = customerRepository;
            this.mapper = mapper;
            this.packageRepository = packageRepository;
            this.memoryCache = memoryCache;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            //Fetch data from database
            var customers = await customerRepository.GetAllAsync();
            //Convert data to DTO
            var customersDTO = mapper.Map<List<Models.DTO.Customers>>(customers);
            //Return response
            return Ok(customersDTO);
        }
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetCustomerAsync")]
        public async Task<IActionResult> GetCustomerAsync(Guid id)
        {
            //Fetch data from database
            var customer = await customerRepository.GetAsync(id);
            //Convert data to DTO
            var customerDTO = mapper.Map<Models.DTO.Customers>(customer);
            //Return response
            return Ok(customerDTO);
        }
        [HttpGet]
        [Route("/customer/plancheck/{id:guid}")]
        public async Task<IActionResult> CheckCustomerPlanAsync(Guid id)
        {
            //Fetch data from database
            var customer = await customerRepository.CheckPlanValidity(id);
            //Convert data to DTO
            var customerDTO = mapper.Map<Models.DTO.Customers>(customer);
            var package = "";
            if(customerDTO != null)
            {
                DateTime d1 = (DateTime)customerDTO.PackagePurchaseDate;
                DateTime d2 = DateTime.Now.AddDays(-1);

                TimeSpan t = d2 - d1;
                double NrOfDays = t.TotalDays;
                
                if (customerDTO.Packages.PackageType == "3Day")
                {
                    if (NrOfDays >= 3)
                    {
                        package = "Invalid";
                    }
                    else
                    {
                        package = "Valid";
                    }
                }
                else if (customerDTO.Packages.PackageType == "6Months")
                {
                    if (NrOfDays >= 180)
                    {
                        package = "Invalid";
                    }
                    else
                    {
                        package = "Valid";
                    }
                }
                else if (customerDTO.Packages.PackageType == "1Year")
                {
                    if (NrOfDays >= 365)
                    {
                        package = "Invalid";
                    }
                    else
                    {
                        package = "Valid";
                    }
                }
            }
            //Return response
         
            return Ok(new { response = package });
        }
        [HttpGet]
        [Route("/customer/getCustomerOTP/{CustomerPhone}")]
        public async Task<IActionResult> GetCustomerOTPAsync(string CustomerPhone)
        {
            string result="";
            //Verifying Phone number OTP
            //var phoneExist = await customerRepository.PhoneOTPVerfication("+91"+CustomerPhone);
            //if (phoneExist == null)
            //{
                // Create a New HttpClient object.
                HttpClient client = new HttpClient();
                Random random = new Random();
                string value = random.Next(1001, 9999).ToString();
                string message = "Your OTP Number is " + value + " (Sent By: AgriExpertt )";
                try
                {
                    HttpResponseMessage response = await client.GetAsync("https://www.fast2sms.com/dev/bulkV2?authorization=DdnYXxNsCTc3vfHJUmk2rg7qewhIG4y8AElS5Lp1b6KRjOMaWZsAOSayT0JVm95CW7feDEXInqlQKYbp&route=v3&sender_id=FTWSMS&message=" + message + "&language=english&flash=0&numbers=" + CustomerPhone);
                    response.EnsureSuccessStatusCode();
                    string responseBody = await response.Content.ReadAsStringAsync();
                    result = responseBody;

                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("\nException Caught!");
                    Console.WriteLine("Message :{0} ", e.Message);
                }

                memoryCache.Set(CustomerPhone, value);
           // }
            
            return Ok(result);
        }
        [HttpGet]
        [Route("/customer/verifyCustomerOTP")]
        public async Task<IActionResult> VerifiyCustomerOTPAsync(string CustomerPhone, string OTP)
        {
            string generatedOTP = (string)memoryCache.Get(CustomerPhone);
            if (generatedOTP == OTP)
            {
                
                var phoneExist = await customerRepository.PhoneOTPVerfication("+91" + CustomerPhone);
                
                if (phoneExist == null)
                {
                    
                    var customer = new Models.User.Customers
                    {
                        CustomerName = "",
                        CustomerPhone = "+91"+CustomerPhone,
                        PackagesId = Guid.Empty,
                        PackagePurchaseDate = DateTime.Now,
                        CustomerAddress = "",
                    };
                    await customerRepository.AddAsync(customer);
                    var customerDTO = new Models.DTO.Customers
                    {
                        CustomersId = customer.CustomersId,
                        CustomerName = customer.CustomerName,
                        CustomerPhone = customer.CustomerPhone,
                        PackagePurchaseDate = customer.PackagePurchaseDate,
                        CustomerAddress = customer.CustomerAddress,
                    };
                    memoryCache.Remove(CustomerPhone);
                    //return CreatedAtAction(nameof(GetCustomerAsync), new { id = customerDTO.CustomersId }, customerDTO);
                    return Ok(customerDTO);
                }
                else
                {
                    var customer = await customerRepository.GetCustomerDetailsAsync("+91" + CustomerPhone);
                    var customerDTO = new Models.DTO.Customers()
                    {
                        CustomersId = customer.CustomersId,
                        CustomerName = customer.CustomerName,
                        CustomerPhone = customer.CustomerPhone,
                    };
                    memoryCache.Remove(CustomerPhone);
                    return Ok(customerDTO);
                }
                
            }
            var results = "OTPNotMatching";
            return Ok(new { response = results });
            
            
        }
        [HttpPost]
        public async Task<IActionResult> AddCustomerAsync([FromBody] Models.DTO.AddCustomerRequest addCustomerRequest)
        {
            //Validate customer data
            if (!ValidateAddCustomerAsync(addCustomerRequest))
            {
                return BadRequest(ModelState);
            }
            //Convert DTO to domain object
            var customer = new Models.User.Customers
            {
               // CustomerName = addCustomerRequest.CustomerName,
                CustomerPhone = addCustomerRequest.CustomerPhone,
            };
            
            //Pass domain object to repository to persist the data
            await customerRepository.AddAsync(customer);
            //Convert the domain object to DTO
            var customerDTO = new Models.DTO.Customers
            {
                CustomersId = customer.CustomersId,
                CustomerName = customer.CustomerName,
                CustomerPhone = customer.CustomerPhone,
            };
            //Send DTO back to client
            return CreatedAtAction(nameof(GetCustomerAsync), new { id = customerDTO.CustomersId }, customerDTO);
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteCustomerAsync(Guid id)
        {
            //Get expert from Database
            var customer = await customerRepository.DeleteAsync(id);
            //If null Not Found
            if (customer == null)
            {
                return NotFound();
            }
            //Convert response to DTO
            var customerDTO = new Models.DTO.Customers()
            {
                CustomersId = customer.CustomersId,
                CustomerName = customer.CustomerName,
                CustomerPhone = customer.CustomerPhone,
            };

            //return Ok Response
            return Ok(customerDTO);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateCustomerAsync([FromRoute] Guid id, [FromBody] Models.DTO.UpdateCustomerRequest updateCustomerRequest)
        {
            //Validate update data
            if (!await ValidateUpdateCustomerAsync(updateCustomerRequest))
            {
                return BadRequest(ModelState);
            }
            //Convert the DTO to domain Model
            var customer = new Models.User.Customers()
            {
                CustomerName = updateCustomerRequest.CustomerName,
                CustomerPhone = updateCustomerRequest.CustomerPhone,
                CustomerAddress = updateCustomerRequest.CustomerAddress,
                PackagesId = updateCustomerRequest.PackagesId,
                PackagePurchaseDate = DateTime.Now,
                
            };
            //Update question using repository
            customer = await customerRepository.UpdateAsync(id, customer);
            //If null retrun notFound
            if (customer == null)
            {
                return NotFound();
            }
            //Covert Domain to DTO
            var customerDTO = new Models.DTO.Customers
            {
                CustomersId = customer.CustomersId,
                CustomerName = customer.CustomerName,
                CustomerPhone = customer.CustomerPhone,
                PackagesId = (Guid)customer.PackagesId
            };
            //Return OK response
            return Ok(customerDTO);
        }
        #region Private methods
        private bool ValidateAddCustomerAsync(Models.DTO.AddCustomerRequest addCustomerRequest)
        {

            if (addCustomerRequest == null)
            {
                ModelState.AddModelError(nameof(addCustomerRequest), $"Customer data is required.");
                return false;
            }
            if (string.IsNullOrEmpty(addCustomerRequest.CustomerPhone))
            {
                ModelState.AddModelError(nameof(addCustomerRequest.CustomerPhone), $"{nameof(addCustomerRequest.CustomerPhone)} cannot be empty.");
            }
            //if (string.IsNullOrEmpty(addCustomerRequest.CustomerName))
            //{
            //    ModelState.AddModelError(nameof(addCustomerRequest.CustomerName), $"{nameof(addCustomerRequest.CustomerName)} cannot be empty.");
            //}
            if (ModelState.ErrorCount > 0)
            {
                return false;
            }
            return true;
        }
        private async Task<bool> ValidateUpdateCustomerAsync(Models.DTO.UpdateCustomerRequest updateCustomerRequest)
        {
            if (updateCustomerRequest == null)
            {
                ModelState.AddModelError(nameof(updateCustomerRequest), $"Customer data is required.");
                return false;
            }
            if (string.IsNullOrEmpty(updateCustomerRequest.CustomerPhone))
            {
                ModelState.AddModelError(nameof(updateCustomerRequest.CustomerPhone), $"{nameof(updateCustomerRequest.CustomerPhone)} cannot be empty.");
            }
            //if (string.IsNullOrEmpty(updateCustomerRequest.CustomerName))
            //{
            //    ModelState.AddModelError(nameof(updateCustomerRequest.CustomerName), $"{nameof(updateCustomerRequest.CustomerName)} cannot be empty.");
            //}
            var PackageId = await packageRepository.GetAsync(updateCustomerRequest.PackagesId);
            if (PackageId == null)
            {
                ModelState.AddModelError(nameof(updateCustomerRequest.PackagesId), $"{nameof(updateCustomerRequest.PackagesId)} invalid package ID.");
            }
            if (ModelState.ErrorCount > 0)
            {
                return false;
            }
            return true;
        }
        #endregion
    }
}
