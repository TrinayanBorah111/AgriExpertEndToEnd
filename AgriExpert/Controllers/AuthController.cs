using AgriExpert.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AgriExpert.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController:Controller
    {
        private readonly IAdminRepository adminRepository;
        private readonly IExpertRepository expertRepository;
        private readonly ITokenHandler tokenHandler;

        public AuthController(IAdminRepository adminRepository, IExpertRepository expertRepository, ITokenHandler tokenHandler)
        {
            this.adminRepository = adminRepository;
            this.expertRepository = expertRepository;
            this.tokenHandler = tokenHandler;
        }
        [HttpPost]
        [Route("adminlogin")]
        public async Task<IActionResult> LogInAdminAsync(Models.DTO.LoginRequest loginRequest)
        {
            //Validate Incoming
            if (!ValidateLogInAsync(loginRequest))
            {
                return BadRequest(ModelState);
            }
            //Check user is authenticated
            //Check username and password
            var admin = await adminRepository.AuthenticateAdminAsync(loginRequest.UserName, loginRequest.Password);
            if (admin != null)
            {
                //Generate a JWT token
                var token = tokenHandler.CreateAdminTokenAsync(admin);
                return Ok(token.Result);
            }
            return BadRequest("Username and Password incorrect");
        }
        [HttpPost]
        [Route("expertlogin")]
        public async Task<IActionResult> LogInExpertAsync(Models.DTO.LoginRequest loginRequest)
        {
            //Validate Incoming
            if (!ValidateLogInAsync(loginRequest))
            {
                return BadRequest(ModelState);
            }
            //Check user is authenticated
            //Check username and password
            var expert = await expertRepository.AuthenticateExpertAsync(loginRequest.UserName, loginRequest.Password);
            if (expert != null)
            {
                //Generate a JWT token
                var token = tokenHandler.CreateExpertTokenAsync(expert);
                return Ok(token.Result);
            }
            return BadRequest("Username and Password incorrect");
        }
        #region Private methods
        private bool ValidateLogInAsync(Models.DTO.LoginRequest loginRequest)
        {
            if (loginRequest == null)
            {
                ModelState.AddModelError(nameof(loginRequest), $"Experts data is required.");
                return false;
            }
            if (string.IsNullOrEmpty(loginRequest.UserName))
            {
                ModelState.AddModelError(nameof(loginRequest.UserName), $"{nameof(loginRequest.UserName)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(loginRequest.Password))
            {
                ModelState.AddModelError(nameof(loginRequest.Password), $"{nameof(loginRequest.Password)} cannot be empty.");
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
