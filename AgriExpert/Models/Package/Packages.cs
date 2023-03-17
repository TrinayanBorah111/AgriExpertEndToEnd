using AgriExpert.Models.User;
using System.Collections.Generic;
using System;

namespace AgriExpert.Models.Package
{
    public class Packages
    {
        public Guid PackagesId { get; set; }
        public string PackageName { get; set; }
        public string PackageType { get; set; }
        public string PackageDescription { get; set; }
        public double PackagePrice { get; set; }

        //Customer properties
        public IEnumerable<Customers> Customers { get; set; }
    }
}
