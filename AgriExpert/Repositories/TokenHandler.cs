using AgriExpert.Models.User;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System;

namespace AgriExpert.Repositories
{
    public class TokenHandler: ITokenHandler
    {
        private readonly IConfiguration configuration;
        public TokenHandler(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public Task<string> CreateAdminTokenAsync(Admins admins)
        {
            //Create claims
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.GivenName, admins.AdminUserName));
            claims.Add(new Claim(ClaimTypes.Role, admins.Role));
            //Create credentials
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credantials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //create token
            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credantials);
            return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));


        }

        public Task<string> CreateExpertTokenAsync(Experts experts)
        {
            //Create claims
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.GivenName, experts.ExpertUserName));
            claims.Add(new Claim(ClaimTypes.Role, experts.Role));

            //Create credentials
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credantials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //create token
            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credantials);
            return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
        }
    }
}
