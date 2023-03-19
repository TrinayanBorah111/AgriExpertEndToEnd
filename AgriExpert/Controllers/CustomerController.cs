using AgriExpert.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace AgriExpert.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "Admin")]
    public class CustomerController : Controller
    {
        private readonly ICustomerRepository customerRepository;
        private readonly IMapper mapper;
        private readonly IPackageRepository packageRepository;

        public CustomerController(ICustomerRepository customerRepository, IMapper mapper,
            IPackageRepository packageRepository)
        {
            this.customerRepository = customerRepository;
            this.mapper = mapper;
            this.packageRepository = packageRepository;
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
                CustomerName = addCustomerRequest.CustomerName,
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
                PackagesId = updateCustomerRequest.PackagesId,
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
            if (string.IsNullOrEmpty(addCustomerRequest.CustomerName))
            {
                ModelState.AddModelError(nameof(addCustomerRequest.CustomerName), $"{nameof(addCustomerRequest.CustomerName)} cannot be empty.");
            }
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
            if (string.IsNullOrEmpty(updateCustomerRequest.CustomerName))
            {
                ModelState.AddModelError(nameof(updateCustomerRequest.CustomerName), $"{nameof(updateCustomerRequest.CustomerName)} cannot be empty.");
            }
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
