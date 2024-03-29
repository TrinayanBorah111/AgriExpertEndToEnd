﻿using System;

namespace AgriExpert.Models.DTO
{
    public class Customers
    {
        public Guid CustomersId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerTransactionID { get; set; }
        public DateTime? PackagePurchaseDate { get; set; }
        //Package properties
        public Guid PackagesId { get; set; }
        public Packages Packages { get; set; }

        //Questions properties
        //public IEnumerable<Questions> Questions { get; set; }
    }
}
