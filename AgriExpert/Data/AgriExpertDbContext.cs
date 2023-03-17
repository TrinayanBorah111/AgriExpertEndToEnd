using AgriExpert.Models.Forum;
using AgriExpert.Models.Package;
using AgriExpert.Models.User;
using Microsoft.EntityFrameworkCore;

namespace AgriExpert.Data
{
    public class AgriExpertDbContext : DbContext
    {
        public AgriExpertDbContext(DbContextOptions<AgriExpertDbContext> options) : base(options)
        {

        }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<Customers> Customers { get; set; }
        public DbSet<Experts> Experts { get; set; }
        public DbSet<Packages> Packages { get; set; }
        public DbSet<Admins> Admin { get; set; }
    }
}
