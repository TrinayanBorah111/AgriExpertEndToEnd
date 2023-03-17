using AgriExpert.Models.Forum;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace AgriExpert.Repositories
{
    public interface IQuestionRepository
    {
        Task<IEnumerable<Questions>> GetAllAsync();
        Task<Questions> GetAsync(Guid id);
        Task<Questions> AddAsync(Questions question);
        Task<Questions> UpdateAsync(Guid id, Questions question);
        Task<Questions> DeleteAsync(Guid id);
    }
}
