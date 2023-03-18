using AgriExpert.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System;

namespace AgriExpert.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionController : Controller
    {
        private readonly IQuestionRepository questionRepository;
        private readonly IMapper mapper;
        private readonly ICustomerRepository customerRepository;
        private readonly IExpertRepository expertRepository;

        public QuestionController(IQuestionRepository questionRepository, IMapper mapper,
            ICustomerRepository customerRepository, IExpertRepository expertRepository)
        {
            this.questionRepository = questionRepository;
            this.mapper = mapper;
            this.customerRepository = customerRepository;
            this.expertRepository = expertRepository;
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
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddQuestionAsync([FromBody] Models.DTO.AddQuestionRequest addQuestionRequest)
        {
            //Vaidate Add question Field
            if (!await ValidateAddQuestionAsync(addQuestionRequest))
            {
                return BadRequest(ModelState);
            }
            //Convert DTO to domain object
            var question = new Models.Forum.Questions
            {
                QuestionContext = addQuestionRequest.QuestionContext,
                QuestionTopicName = addQuestionRequest.QuestionTopicName,
                QuestionsTopicVariety = addQuestionRequest.QuestionsTopicVariety,
                QuestionTopicAge = addQuestionRequest.QuestionTopicAge,
                QuestionTopicGrowingSeason = addQuestionRequest.QuestionTopicGrowingSeason,
                QuestionTopicImages = addQuestionRequest.QuestionTopicImages,
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
                CustomersId = question.CustomersId,
            };

            //return Ok Response
            return Ok(questionDTO);
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
