using AgriExpert.Data;
using AgriExpert.Models.Forum;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgriExpert.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AgriExpertDbContext agriExpertDbContext;

        public OrderRepository(AgriExpertDbContext agriExpertDbContext)
        {
            this.agriExpertDbContext = agriExpertDbContext;
        }

        public async Task<Orders> AddAsync(Orders order)
        {
            order.OrdersId = Guid.NewGuid();
            await agriExpertDbContext.AddAsync(order);
            await agriExpertDbContext.SaveChangesAsync();
            return order;
        }

        public async Task<IEnumerable<Orders>> GetAllAsync()
        {
            return await agriExpertDbContext.Orders
                .Include(x => x.Customers)
                 .ToListAsync();
        }

        public async Task<Orders> GetAsync(Guid id)
        {
            return await agriExpertDbContext.Orders
               .FirstOrDefaultAsync(x => x.OrdersId == id);
        }
    }
}
