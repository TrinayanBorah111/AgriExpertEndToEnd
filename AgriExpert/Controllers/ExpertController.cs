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
    public class ExpertController : Controller
    {
        private readonly IExpertRepository expertRepository;
        private readonly IMapper mapper;

        public ExpertController(IExpertRepository expertRepository, IMapper mapper)
        {
            this.expertRepository = expertRepository;
            this.mapper = mapper;
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllExperts()
        {
            //Fetch data from database
            var experts = await expertRepository.GetAllAsync();
            //Convert data to DTO
            var expertsDTO = mapper.Map<List<Models.DTO.Experts>>(experts);
            //Return response
            return Ok(expertsDTO);
        }
        [HttpGet]
        [Route("expertId")]
        [Authorize(Roles = "Admin,Expert")]
        public async Task<IActionResult> GetExpertId(string username,string password)
        {
            //Fetch data from database
            var experts = await expertRepository.GetAsyncId(username,password);
            //Convert data to DTO
            var expertsDTO = mapper.Map<Models.DTO.Experts>(experts);
            //Return response
            return Ok(expertsDTO.ExpertsId);
        }
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetExpertAsync")]
        //[Authorize(Roles = "Admin,Expert")]
        public async Task<IActionResult> GetExpertAsync(Guid id)
        {
            //Fetch data from database
            var expert = await expertRepository.GetAsync(id);
            //Convert data to DTO
            var expertDTO = mapper.Map<Models.DTO.Experts>(expert);
            //Return response
            return Ok(expertDTO);
        }
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddExpertAsync([FromBody] Models.DTO.AddExpertRequest addExpertRequest)
        {
            //Validate Expert data
            if (!ValidateAddExpertAsync(addExpertRequest))
            {
                return BadRequest(ModelState);
            }
            //Convert DTO to domain object
            var expert = new Models.User.Experts
            {
                ExpertFullName = addExpertRequest.ExpertFullName,
                ExpertUserName = addExpertRequest.ExpertUserName,
                ExpertEmail = addExpertRequest.ExpertEmail,
                ExpertPassword = addExpertRequest.ExpertPassword,
                ExpertPhone = addExpertRequest.ExpertPhone,
                Role = addExpertRequest.Role,
            };
            //Pass domain object to repository to persist the data
            await expertRepository.AddAsync(expert);
            //Convert the domain object to DTO
            var expertDTO = new Models.DTO.Experts
            {
                ExpertsId = expert.ExpertsId,
                ExpertFullName = expert.ExpertFullName,
                ExpertUserName = expert.ExpertUserName,
                ExpertEmail = expert.ExpertEmail,
                ExpertPassword = expert.ExpertPassword,
                ExpertStatus = expert.ExpertStatus,
                ExpertPhone = expert.ExpertPhone,
                Role = expert.Role,
            };
            //Send DTO back to client
            return CreatedAtAction(nameof(GetExpertAsync), new { id = expertDTO.ExpertsId }, expertDTO);
        }
        [HttpDelete]
        [Route("{id:guid}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteExpertAsync(Guid id)
        {
            //Get expert from Database
            var expert = await expertRepository.DeleteAsync(id);
            //If null Not Found
            if (expert == null)
            {
                return NotFound();
            }
            //Convert response to DTO
            var expertDTO = new Models.DTO.Experts()
            {
                ExpertsId = expert.ExpertsId,
                ExpertFullName = expert.ExpertFullName,
                ExpertUserName = expert.ExpertUserName,
                ExpertEmail = expert.ExpertEmail,
                ExpertPassword = expert.ExpertPassword,
                ExpertPhone = expert.ExpertPhone,
                ExpertStatus = expert.ExpertStatus,
                Role = expert.Role,
            };

            //return Ok Response
            return Ok(expertDTO);
        }
        [HttpPut]
        [Route("{id:guid}")]
        [Authorize(Roles = "Admin,Expert")]
        public async Task<IActionResult> UpdateExpertAsync([FromRoute] Guid id, [FromBody] Models.DTO.UpdateExpertRequest updateExpertRequest)
        {
            //Validate update data
            if (!ValidateUpdateExpertAsync(updateExpertRequest))
            {
                return BadRequest(ModelState);
            }
            //Convert the DTO to domain Model
            var expert = new Models.User.Experts()
            {
                ExpertFullName = updateExpertRequest.ExpertFullName,
                ExpertUserName = updateExpertRequest.ExpertUserName,
                ExpertPassword = updateExpertRequest.ExpertPassword,
                ExpertStatus = updateExpertRequest.ExpertStatus,
                ExpertPhone = updateExpertRequest.ExpertPhone,
                ExpertEmail = updateExpertRequest.ExpertEmail,
                Role = updateExpertRequest.Role,
            };
            //Update question using repository
            expert = await expertRepository.UpdateAsync(id, expert);
            //If null retrun notFound
            if (expert == null)
            {
                return NotFound();
            }
            //Covert Domain to DTO
            var expertDTO = new Models.DTO.Experts()
            {
                ExpertsId = expert.ExpertsId,
                ExpertFullName = expert.ExpertFullName,
                ExpertUserName = expert.ExpertUserName,
                ExpertStatus = expert.ExpertStatus,
                ExpertEmail = expert.ExpertEmail,
                ExpertPhone = expert.ExpertPhone,
                ExpertPassword = expert.ExpertPassword,
                Role = expert.Role,
            };
            //Return OK response
            return Ok(expertDTO);
        }
        #region Private methods
        private bool ValidateAddExpertAsync(Models.DTO.AddExpertRequest addExpertRequest)
        {
            if (addExpertRequest == null)
            {
                ModelState.AddModelError(nameof(addExpertRequest), $"Experts data is required.");
                return false;
            }
            if (string.IsNullOrEmpty(addExpertRequest.ExpertFullName))
            {
                ModelState.AddModelError(nameof(addExpertRequest.ExpertFullName), $"{nameof(addExpertRequest.ExpertFullName)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addExpertRequest.ExpertUserName))
            {
                ModelState.AddModelError(nameof(addExpertRequest.ExpertUserName), $"{nameof(addExpertRequest.ExpertUserName)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addExpertRequest.ExpertPhone))
            {
                ModelState.AddModelError(nameof(addExpertRequest.ExpertPhone), $"{nameof(addExpertRequest.ExpertPhone)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addExpertRequest.ExpertEmail))
            {
                ModelState.AddModelError(nameof(addExpertRequest.ExpertEmail), $"{nameof(addExpertRequest.ExpertEmail)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addExpertRequest.ExpertPassword))
            {
                ModelState.AddModelError(nameof(addExpertRequest.ExpertPassword), $"{nameof(addExpertRequest.ExpertPassword)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addExpertRequest.Role))
            {
                ModelState.AddModelError(nameof(addExpertRequest.Role), $"{nameof(addExpertRequest.Role)} cannot be empty.");
            }
            if (ModelState.ErrorCount > 0)
            {
                return false;
            }
            return true;
        }
        private bool ValidateUpdateExpertAsync(Models.DTO.UpdateExpertRequest updateExpertRequest)
        {
            if (updateExpertRequest == null)
            {
                ModelState.AddModelError(nameof(updateExpertRequest), $"Experts data is required.");
                return false;
            }
            if (string.IsNullOrEmpty(updateExpertRequest.ExpertFullName))
            {
                ModelState.AddModelError(nameof(updateExpertRequest.ExpertFullName), $"{nameof(updateExpertRequest.ExpertFullName)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(updateExpertRequest.ExpertUserName))
            {
                ModelState.AddModelError(nameof(updateExpertRequest.ExpertUserName), $"{nameof(updateExpertRequest.ExpertUserName)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(updateExpertRequest.ExpertPhone))
            {
                ModelState.AddModelError(nameof(updateExpertRequest.ExpertPhone), $"{nameof(updateExpertRequest.ExpertPhone)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(updateExpertRequest.ExpertEmail))
            {
                ModelState.AddModelError(nameof(updateExpertRequest.ExpertEmail), $"{nameof(updateExpertRequest.ExpertEmail)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(updateExpertRequest.ExpertPassword))
            {
                ModelState.AddModelError(nameof(updateExpertRequest.ExpertPassword), $"{nameof(updateExpertRequest.ExpertPassword)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(updateExpertRequest.ExpertStatus))
            {
                ModelState.AddModelError(nameof(updateExpertRequest.ExpertStatus), $"{nameof(updateExpertRequest.ExpertStatus)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(updateExpertRequest.Role))
            {
                ModelState.AddModelError(nameof(updateExpertRequest.Role), $"{nameof(updateExpertRequest.Role)} cannot be empty.");
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
