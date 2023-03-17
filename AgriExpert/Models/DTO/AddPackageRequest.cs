using System;

namespace AgriExpert.Models.DTO
{
    public class AddPackageRequest
    {
        public Guid PackagesId { get; set; }
        public string PackageName { get; set; }
        public string PackageType { get; set; }
        public string PackageDescription { get; set; }
        public double PackagePrice { get; set; }
    }
}
