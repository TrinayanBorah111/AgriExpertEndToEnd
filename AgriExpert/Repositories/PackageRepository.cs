using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using AgriExpert.Data;
using AgriExpert.Models.Package;
using Microsoft.EntityFrameworkCore;

namespace AgriExpert.Repositories
{
    public class PackageRepository:IPackageRepository
    {
        private readonly AgriExpertDbContext agriExpertDbContext;

        public PackageRepository(AgriExpertDbContext agriExpertDbContext)
        {
            this.agriExpertDbContext = agriExpertDbContext;
        }

        public async Task<Packages> AddAsync(Packages package)
        {
            package.PackagesId = Guid.NewGuid();
            await agriExpertDbContext.AddAsync(package);
            await agriExpertDbContext.SaveChangesAsync();
            return package;
        }

        public async Task<Packages> DeleteAsync(Guid id)
        {
            var package = await agriExpertDbContext.Packages.FirstOrDefaultAsync(x => x.PackagesId == id);
            if (package == null)
            {
                return null;
            }
            agriExpertDbContext.Packages.Remove(package);
            await agriExpertDbContext.SaveChangesAsync();
            return package;
        }

        public async Task<IEnumerable<Packages>> GetAllAsync()
        {
            return await agriExpertDbContext.Packages.ToListAsync();
        }

        public async Task<Packages> GetAsync(Guid id)
        {
            return await agriExpertDbContext.Packages.FirstOrDefaultAsync(x => x.PackagesId == id);
        }
    }
}
