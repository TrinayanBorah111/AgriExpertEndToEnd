using AgriExpert.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace AgriExpert.Repositories
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customers>> GetAllAsync();
        Task<Customers> GetAsync(Guid id);
        Task<Customers> AddAsync(Customers customer);
        Task<Customers> DeleteAsync(Guid id);
        Task<Customers> UpdateAsync(Guid id, Customers customer);
    }
}
