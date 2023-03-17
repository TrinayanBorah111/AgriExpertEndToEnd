using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using AgriExpert.Models.Package;

namespace AgriExpert.Repositories
{
        public interface IPackageRepository
        {
            Task<IEnumerable<Packages>> GetAllAsync();
            Task<Packages> GetAsync(Guid id);
            Task<Packages> AddAsync(Packages packages);
            Task<Packages> DeleteAsync(Guid id);
        }
}
