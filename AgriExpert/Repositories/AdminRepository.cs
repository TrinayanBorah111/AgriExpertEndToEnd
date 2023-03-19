using AgriExpert.Data;
using AgriExpert.Models.User;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace AgriExpert.Repositories
{
    public class AdminRepository:IAdminRepository
    {
        private readonly AgriExpertDbContext agriExpertDbContext;
        public AdminRepository(AgriExpertDbContext agriExpertDbContext)
        {
            this.agriExpertDbContext = agriExpertDbContext;
        }
        public async Task<Admins> AuthenticateAdminAsync(string username, string password)
        {
            var Admins = await agriExpertDbContext.Admin
                .ToListAsync();
            var admin = Admins.Find(x => x.AdminUserName.Equals(username, StringComparison.InvariantCultureIgnoreCase) &&
            x.AdminPassword == password);
            return admin;
        }
    }
}
