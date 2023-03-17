using AgriExpert.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace AgriExpert.Repositories
{
    public interface IExpertRepository
    {
        Task<IEnumerable<Experts>> GetAllAsync();
        Task<Experts> GetAsync(Guid id);
        Task<Experts> AddAsync(Experts expert);
        Task<Experts> DeleteAsync(Guid id);
        Task<Experts> UpdateAsync(Guid id, Experts expert);
    }
}
