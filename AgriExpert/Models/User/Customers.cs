using System.Collections.Generic;
using System;
using AgriExpert.Models.Package;
using AgriExpert.Models.Forum;

namespace AgriExpert.Models.User
{
    public class Customers
    {
        public Guid CustomersId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        //Package properties
        public Guid? PackagesId { get; set; }
        public virtual Packages Packages { get; set; }

        //Questions properties
        //public IEnumerable<Questions> Questions { get; set; }
    }
}
