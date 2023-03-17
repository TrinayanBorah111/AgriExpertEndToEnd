using System;

namespace AgriExpert.Models.DTO
{
    public class Packages
    {
        public Guid PackagesId { get; set; }
        public string PackageName { get; set; }
        public string PackageType { get; set; }
        public string PackageDescription { get; set; }
        public double PackagePrice { get; set; }
    }
}
