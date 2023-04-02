using AgriExpert.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using AgriExpert.Data;
using Microsoft.EntityFrameworkCore;

namespace AgriExpert.Repositories
{
    public class ExpertRepository : IExpertRepository
    {
        private readonly AgriExpertDbContext agriExpertDbContext;

        public ExpertRepository(AgriExpertDbContext agriExpertDbContext)
        {
            this.agriExpertDbContext = agriExpertDbContext;
        }
        public async Task<Experts> AddAsync(Experts expert)
        {
            expert.ExpertsId = Guid.NewGuid();
            expert.ExpertStatus = "-";
            expert.Role = "Expert";
            await agriExpertDbContext.AddAsync(expert);
            await agriExpertDbContext.SaveChangesAsync();
            return expert;
        }
        public async Task<Experts> AuthenticateExpertAsync(string username, string password)
        {
            var Experts = await agriExpertDbContext.Experts
                .ToListAsync();
            var expert = Experts.Find(x => x.ExpertUserName.Equals(username, StringComparison.InvariantCultureIgnoreCase) &&
            x.ExpertPassword == password);
            return expert;
        }
        public async Task<Experts> DeleteAsync(Guid id)
        {
            var expert = await agriExpertDbContext.Experts.FirstOrDefaultAsync(x => x.ExpertsId == id);
            if (expert == null)
            {
                return null;
            }
            agriExpertDbContext.Experts.Remove(expert);
            await agriExpertDbContext.SaveChangesAsync();
            return expert;
        }

        public async Task<IEnumerable<Experts>> GetAllAsync()
        {
            return await agriExpertDbContext.Experts
                .ToListAsync();
        }

        public async Task<Experts> GetAsync(Guid id)
        {
            return await agriExpertDbContext.Experts
                .FirstOrDefaultAsync(x => x.ExpertsId == id);
        }

        public async Task<Experts> GetAsyncId(string username,string password)
        {
            return await agriExpertDbContext.Experts
                .FirstOrDefaultAsync(x => x.ExpertUserName == username && x.ExpertPassword == password);
        }

        public async Task<Experts> UpdateAsync(Guid id, Experts experts)
        {
            var existingExpert = await agriExpertDbContext.Experts.FirstOrDefaultAsync(x => x.ExpertsId == id);
            if (existingExpert == null)
            {
                return null;
            }
            existingExpert.ExpertFullName = experts.ExpertFullName;
            existingExpert.ExpertUserName = experts.ExpertUserName;
            existingExpert.ExpertPhone = experts.ExpertPhone;
            existingExpert.ExpertStatus = experts.ExpertStatus;
            existingExpert.ExpertEmail = experts.ExpertEmail;
            existingExpert.ExpertPassword = experts.ExpertPassword;
            existingExpert.Role = experts.Role;
            await agriExpertDbContext.SaveChangesAsync();
            return existingExpert;

        }
    }
}
