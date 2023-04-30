using AgriExpert.Models.Forum;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgriExpert.Repositories
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Orders>> GetAllAsync();
        Task<Orders> GetAsync(Guid id);
        Task<Orders> AddAsync(Orders order);
    }
}
