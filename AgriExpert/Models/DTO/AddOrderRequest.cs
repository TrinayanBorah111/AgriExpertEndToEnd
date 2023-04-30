using System;

namespace AgriExpert.Models.DTO
{
    public class AddOrderRequest
    {
        public string OrdersRequirement { get; set; }
        public string OrdersAddress { get; set; }
        public string OrdersPhone { get; set; }
        public Guid? CustomersId { get; set; }
    }
}
