using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using AgriExpert.Repositories;

namespace AgriExpert.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PackageController:Controller
    {
        private readonly IPackageRepository packageRepository;
        private readonly IMapper mapper;
        public PackageController(IPackageRepository packageRepository, IMapper mapper)
        {
            this.packageRepository = packageRepository;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPackages()
        {
            var packages = await packageRepository.GetAllAsync();

            //return DTO packages
            //var packagesDTO = new List<Models.DTO.Packages>();
            //packages.ToList().ForEach(package =>
            //{
            //    var packageDTO = new Models.DTO.Packages()
            //    {
            //        PackagesId = package.PackagesId,
            //        PackageName = package.PackageName,
            //        PackageType =package.PackageType,
            //        PackageDescription =package.PackageDescription,
            //        PackagePrice =package.PackagePrice,
            //    };
            //   packagesDTO.Add(packageDTO);
            //});
            var packagesDTO = mapper.Map<List<Models.DTO.Packages>>(packages);
            return Ok(packagesDTO);
        }
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetPackageAsync")]
        public async Task<IActionResult> GetPackageAsync(Guid id)
        {
            var package = await packageRepository.GetAsync(id);
            if (package == null)
            {
                return NotFound();
            }
            var packageDTO = mapper.Map<Models.DTO.Packages>(package);
            return Ok(packageDTO);
        }

        [HttpPost]
        public async Task<IActionResult> AddPAckageAsync(Models.DTO.AddPackageRequest addPackageRequest)
        {
            //Request(DTO) to Domain Model
            var package = new Models.Package.Packages()
            {
                PackageName = addPackageRequest.PackageName,
                PackageType = addPackageRequest.PackageType,
                PackageDescription = addPackageRequest.PackageDescription,
                PackagePrice = addPackageRequest.PackagePrice,
            };
            //Pass details to repository
            package = await packageRepository.AddAsync(package);
            //Convert back to DTO
            var packageDTO = new Models.DTO.Packages()
            {
                PackagesId = package.PackagesId,
                PackageName = package.PackageName,
                PackageType = package.PackageType,
                PackageDescription = package.PackageDescription,
                PackagePrice = package.PackagePrice,
            };
            return CreatedAtAction(nameof(GetPackageAsync), new { id = packageDTO.PackagesId }, packageDTO);
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeletePackageAsync(Guid id)
        {
            //Get package from Database
            var package = await packageRepository.DeleteAsync(id);
            //If null Not Found
            if (package == null)
            {
                return NotFound();
            }
            //Convert response to DTO
            var packageDTO = new Models.DTO.Packages()
            {
                PackagesId = package.PackagesId,
                PackageName = package.PackageName,
                PackageType = package.PackageType,
                PackageDescription = package.PackageDescription,
                PackagePrice = package.PackagePrice,
            };

            //return Ok Response
            return Ok(packageDTO);
        }
    }
}
