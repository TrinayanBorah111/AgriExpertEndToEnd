using AgriExpert.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.StaticFiles;

namespace AgriExpert.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize]
    public class QuestionController : Controller
    {
        private readonly IQuestionRepository questionRepository;
        private readonly IMapper mapper;
        private readonly ICustomerRepository customerRepository;
        private readonly IExpertRepository expertRepository;
        private readonly IWebHostEnvironment hostEnvironment;

        public QuestionController(IQuestionRepository questionRepository, IMapper mapper,
            ICustomerRepository customerRepository, IExpertRepository expertRepository, IWebHostEnvironment hostEnvironment)
        {
            this.questionRepository = questionRepository;
            this.mapper = mapper;
            this.customerRepository = customerRepository;
            this.expertRepository = expertRepository;
            this.hostEnvironment = hostEnvironment;
        }
        [HttpGet]
        //[Authorize(Roles = "Expert,Admin")]
        public async Task<IActionResult> GetAllQuestions()
        {
            //Fetch data from database
            var questions = await questionRepository.GetAllAsync();
            //Convert data to DTO
            var questionsDTO = mapper.Map<List<Models.DTO.Questions>>(questions);
            //Return response
            return Ok(questionsDTO);
        }
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetQuestionAsync")]
        //[Authorize(Roles = "Expert,Admin")]
        public async Task<IActionResult> GetQuestionAsync(Guid id)
        {
            //Fetch data from database
            var question = await questionRepository.GetAsync(id);
            //Convert data to DTO
            var questionDTO = mapper.Map<Models.DTO.Questions>(question);
            //Return response
            return Ok(questionDTO);

        }
        [HttpGet]
        [Route("expert/{id:guid}")]
        [ActionName("GetQuestionAsync")]
        //[Authorize(Roles = "Expert,Admin")]
        public async Task<IActionResult> GetAllAsyncExpertId(Guid id)
        {
            //Fetch data from database
            var questions = await questionRepository.GetAllAsyncExpertId(id);
            //Convert data to DTO
            var questionDTO = mapper.Map<List<Models.DTO.Questions>>(questions);
            //Return response
            return Ok(questionDTO);

        }
        [HttpGet]
        [Route("customer/{id:guid}")]
        [ActionName("GetQuestionAsync")]
        //[Authorize(Roles = "Expert,Admin")]
        public async Task<IActionResult> GetAllAsyncCustomerId(Guid id)
        {
            //Fetch data from database
            var questions = await questionRepository.GetAllAsyncCustomerId(id);
            //Convert data to DTO
            var questionDTO = mapper.Map<List<Models.DTO.Questions>>(questions);
            //Return response
            return Ok(questionDTO);

        }
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddQuestionAsync([FromForm] Models.DTO.AddQuestionRequest addQuestionRequest)
        {
            
            //Vaidate Add question Field
            if (!await ValidateAddQuestionAsync(addQuestionRequest))
            {
                return BadRequest(ModelState);
            }
            Console.WriteLine(addQuestionRequest.QuestionTopicImage);
            //addQuestionRequest.QuestionTopicImages = 
            string path =    await SaveImageAlt(addQuestionRequest.QuestionTopicImage, addQuestionRequest.CustomersId.ToString());
            //Convert DTO to domain object
            var question = new Models.Forum.Questions
            {
                QuestionContext = addQuestionRequest.QuestionContext,
                QuestionTopicName = addQuestionRequest.QuestionTopicName,
                QuestionsTopicVariety = addQuestionRequest.QuestionsTopicVariety,
                QuestionTopicAge = addQuestionRequest.QuestionTopicAge,
                QuestionTopicGrowingSeason = addQuestionRequest.QuestionTopicGrowingSeason,
                QuestionTopicImages = path,
                QuestionTopicOtherDetails = addQuestionRequest.QuestionTopicOtherDetails,
                CustomersId = addQuestionRequest.CustomersId,
            };
            //Pass domain object to repository to persist the data
            await questionRepository.AddAsync(question);
            //Convert the domain object to DTO
            var questionDTO = new Models.DTO.Questions
            {
                QuestionsId = question.QuestionsId,
                QuestionTopicName = question.QuestionTopicName,
                QuestionsTopicVariety = question.QuestionsTopicVariety,
                QuestionTopicAge = question.QuestionTopicAge,
                QuestionTopicGrowingSeason = question.QuestionTopicGrowingSeason,
                QuestionTopicImages = question.QuestionTopicImages,
                QuestionTopicOtherDetails = question.QuestionTopicOtherDetails,
                QuestionContext = question.QuestionContext,
                QuestionAnswer = question.QuestionAnswer,
                QuestionStatus = question.QuestionStatus,
                CustomersId = question.CustomersId,
            };
            //Send DTO back to client
            return CreatedAtAction(nameof(GetQuestionAsync), new { id = questionDTO.QuestionsId }, questionDTO);
            
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateQuestionAsync([FromRoute] Guid id, [FromBody] Models.DTO.UpdateQuestionRequest updateQuestionRequest)
        {
            //Validate update data
            if (!await ValidateUpdateQuestionAsync(updateQuestionRequest))
            {
                return BadRequest(ModelState);
            }
            //Convert the DTO to domain Model
            var question = new Models.Forum.Questions()
            {
                QuestionTopicName = updateQuestionRequest.QuestionTopicName,
                QuestionsTopicVariety = updateQuestionRequest.QuestionsTopicVariety,
                QuestionTopicAge = updateQuestionRequest.QuestionTopicAge,
                QuestionTopicGrowingSeason = updateQuestionRequest.QuestionTopicGrowingSeason,
                QuestionTopicImages = updateQuestionRequest.QuestionTopicImages,
                QuestionTopicOtherDetails = updateQuestionRequest.QuestionTopicOtherDetails,
                QuestionContext = updateQuestionRequest.QuestionContext,
                QuestionStatus = updateQuestionRequest.QuestionStatus,
                QuestionAnswer = updateQuestionRequest.QuestionAnswer,
                QuestionFeedback = updateQuestionRequest.QuestionFeedback,
                ExpertsId = updateQuestionRequest.ExpertsId,
            };
            //Update question using repository
            question = await questionRepository.UpdateAsync(id, question);
            //If null retrun notFound
            if (question == null)
            {
                return NotFound();
            }
            //Covert Domain to DTO
            var questionDTO = new Models.DTO.Questions()
            {
                QuestionsId = question.QuestionsId,
                QuestionTopicName = question.QuestionTopicName,
                QuestionsTopicVariety = question.QuestionsTopicVariety,
                QuestionTopicAge = question.QuestionTopicAge,
                QuestionTopicGrowingSeason = question.QuestionTopicGrowingSeason,
                QuestionTopicImages = question.QuestionTopicImages,
                QuestionTopicOtherDetails = question.QuestionTopicOtherDetails,
                QuestionContext = question.QuestionContext,
                QuestionStatus = question.QuestionStatus,
                QuestionAnswer = question.QuestionAnswer,
                QuestionFeedback= question.QuestionFeedback,
                ExpertsId = (Guid)question.ExpertsId,
            };

            //Return OK response
            return Ok(questionDTO);
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteQuestionAsync(Guid id)
        {
            //Get package from Database
            var question = await questionRepository.DeleteAsync(id);
            //If null Not Found
            if (question == null)
            {
                return NotFound();
            }
            //Convert response to DTO
            var questionDTO = new Models.DTO.Questions()
            {
                QuestionsId = question.QuestionsId,
                QuestionTopicName = question.QuestionTopicName,
                QuestionsTopicVariety = question.QuestionsTopicVariety,
                QuestionTopicAge = question.QuestionTopicAge,
                QuestionTopicGrowingSeason = question.QuestionTopicGrowingSeason,
                QuestionTopicImages = question.QuestionTopicImages,
                QuestionTopicOtherDetails = question.QuestionTopicOtherDetails,
                QuestionContext = question.QuestionContext,
                QuestionStatus = question.QuestionStatus,
                QuestionAnswer = question.QuestionAnswer,
                QuestionFeedback = question.QuestionFeedback,
                CustomersId = question.CustomersId,
            };

            //return Ok Response
            return Ok(questionDTO);
        }
        //[NonAction]
        //public async Task<string> SaveImage(IFormFile imageFile)
        //{
        //    string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
        //    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
        //    var imagePath = Path.Combine(hostEnvironment.ContentRootPath, "Images", imageName);
        //    using (var fileStream = new FileStream(imagePath, FileMode.Create))
        //    {
        //        await imageFile.CopyToAsync(fileStream);
        //    }
        //    return imageName;
        //}
        [HttpGet("/question/DownloadFile")]
        public async Task<IActionResult>  DownloadFile(string filePath, string fileName)
        {
            //var filePath1 = "ClientApp\\build\\" + filePath;
            var path = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp\\build\\", filePath); // get the path of the file
            Console.WriteLine(path);
            //var fs = new FileStream(path, FileMode.Open); // convert it to a stream
            // Return the file. A byte array can also be used instead of a stream
            //return File(fs, "application/octet-stream", filePath1);
            //return PhysicalFile(path, "text/plain", filePath1);
            //return File(await System.IO.File.ReadAllBytesAsync(path), "application/octet-stream", fileName);
           // var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename);

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(path, out var contenttype))
            {
                contenttype = "application/octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(path);
            return File(bytes, contenttype, Path.GetFileName(path));

        }
        [NonAction]
        public async Task<string> SaveImageAlt(IFormFile file, string customerId)
        {
            try
            {
                //string pathList = "";
                string subPath = "ClientApp\\build\\Files\\" + customerId.ToString(); // Your code goes here
                bool exists = Directory.Exists((subPath));
                if (!exists)
                    Directory.CreateDirectory((subPath));
                string path = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp\\build\\Files\\" + customerId.ToString(), file.FileName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                      file.CopyTo(stream);
                }
                //foreach (IFormFile file in files)
                //{
                //    string path = Path.Combine(Directory.GetCurrentDirectory(), "Images\\" + customerId.ToString(), file.FileName);
                //    using (Stream stream = new FileStream(path, FileMode.Create))
                //    {
                //        file.CopyTo(stream);
                //    }
                //    pathList += path;
                //}

                return file.FileName;
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        #region Private methods
        private async Task<bool> ValidateAddQuestionAsync(Models.DTO.AddQuestionRequest addQuestionRequest)
        {
            if (addQuestionRequest == null)
            {
                ModelState.AddModelError(nameof(addQuestionRequest), $"Questions data is required.");
                return false;
            }
            if (string.IsNullOrEmpty(addQuestionRequest.QuestionContext))
            {
                ModelState.AddModelError(nameof(addQuestionRequest.QuestionContext), $"{nameof(addQuestionRequest.QuestionContext)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addQuestionRequest.QuestionTopicName))
            {
                ModelState.AddModelError(nameof(addQuestionRequest.QuestionTopicName), $"{nameof(addQuestionRequest.QuestionTopicName)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addQuestionRequest.QuestionsTopicVariety))
            {
                ModelState.AddModelError(nameof(addQuestionRequest.QuestionsTopicVariety), $"{nameof(addQuestionRequest.QuestionsTopicVariety)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addQuestionRequest.QuestionTopicAge))
            {
                ModelState.AddModelError(nameof(addQuestionRequest.QuestionTopicAge), $"{nameof(addQuestionRequest.QuestionTopicAge)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addQuestionRequest.QuestionTopicGrowingSeason))
            {
                ModelState.AddModelError(nameof(addQuestionRequest.QuestionTopicGrowingSeason), $"{nameof(addQuestionRequest.QuestionTopicGrowingSeason)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addQuestionRequest.QuestionTopicImages))
            {
                ModelState.AddModelError(nameof(addQuestionRequest.QuestionTopicImages), $"{nameof(addQuestionRequest.QuestionTopicImages)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addQuestionRequest.QuestionTopicOtherDetails))
            {
                ModelState.AddModelError(nameof(addQuestionRequest.QuestionTopicOtherDetails), $"{nameof(addQuestionRequest.QuestionTopicOtherDetails)} cannot be empty.");
            }
            var CustomerId = await customerRepository.GetAsync(addQuestionRequest.CustomersId);
            if (CustomerId == null)
            {
                ModelState.AddModelError(nameof(addQuestionRequest.CustomersId), $"{nameof(addQuestionRequest.CustomersId)} invalid customer ID.");
            }
            if (ModelState.ErrorCount > 0)
            {
                return false;
            }
            return true;
        }
        private async Task<bool> ValidateUpdateQuestionAsync(Models.DTO.UpdateQuestionRequest updateQuestionRequest)
        {
            if (updateQuestionRequest == null)
            {
                ModelState.AddModelError(nameof(updateQuestionRequest), $"Questions data is required.");
                return false;
            }
            if (string.IsNullOrEmpty(updateQuestionRequest.QuestionContext))
            {
                ModelState.AddModelError(nameof(updateQuestionRequest.QuestionContext), $"{nameof(updateQuestionRequest.QuestionContext)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(updateQuestionRequest.QuestionStatus))
            {
                ModelState.AddModelError(nameof(updateQuestionRequest.QuestionStatus), $"{nameof(updateQuestionRequest.QuestionStatus)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(updateQuestionRequest.QuestionAnswer))
            {
                ModelState.AddModelError(nameof(updateQuestionRequest.QuestionAnswer), $"{nameof(updateQuestionRequest.QuestionAnswer)} cannot be empty.");
            }
            var ExpertId = await expertRepository.GetAsync(updateQuestionRequest.ExpertsId);
            if (ExpertId == null)
            {
                ModelState.AddModelError(nameof(updateQuestionRequest.ExpertsId), $"{nameof(updateQuestionRequest.ExpertsId)} invalid customer ID.");
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
