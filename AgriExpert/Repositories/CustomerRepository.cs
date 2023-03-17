using AgriExpert.Data;
using AgriExpert.Models.User;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgriExpert.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly AgriExpertDbContext agriExpertDbContext;

        public CustomerRepository(AgriExpertDbContext agriExpertDbContext)
        {
            this.agriExpertDbContext = agriExpertDbContext;
        }
        public async Task<Customers> AddAsync(Customers customer)
        {
            customer.CustomersId = Guid.NewGuid();
            await agriExpertDbContext.AddAsync(customer);
            await agriExpertDbContext.SaveChangesAsync();
            return customer;
        }

        public async Task<Customers> DeleteAsync(Guid id)
        {
            var customer = await agriExpertDbContext.Customers.FirstOrDefaultAsync(x => x.CustomersId == id);
            if (customer == null)
            {
                return null;
            }
            agriExpertDbContext.Customers.Remove(customer);
            await agriExpertDbContext.SaveChangesAsync();
            return customer;
        }

        public async Task<IEnumerable<Customers>> GetAllAsync()
        {
            return await agriExpertDbContext.Customers
                .Include(x => x.Packages)
                 .ToListAsync();
        }

        public async Task<Customers> GetAsync(Guid id)
        {
            return await agriExpertDbContext.Customers
                .FirstOrDefaultAsync(x => x.CustomersId == id);
        }

        public async Task<Customers> UpdateAsync(Guid id, Customers customer)
        {
            var existingCustomer = await agriExpertDbContext.Customers.FirstOrDefaultAsync(x => x.CustomersId == id);
            if (existingCustomer == null)
            {
                return null;
            }
            existingCustomer.CustomerName = customer.CustomerName;
            existingCustomer.CustomerPhone = customer.CustomerPhone;
            existingCustomer.PackagesId = customer.PackagesId;
            await agriExpertDbContext.SaveChangesAsync();
            return existingCustomer;
        }
    }
}
