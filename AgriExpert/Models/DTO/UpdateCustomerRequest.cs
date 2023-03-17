using System;

namespace AgriExpert.Models.DTO
{
    public class UpdateCustomerRequest
    {
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public Guid PackagesId { get; set; }
    }
}
