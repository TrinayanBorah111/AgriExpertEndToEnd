using System;

namespace AgriExpert.Models.DTO
{
    public class Orders
    {
        public Guid OrdersId { get; set; }
        public string OrdersRequirement { get; set; }
        public string OrdersAddress { get; set; }
        public string OrdersPhone { get; set; }
        public Guid? CustomersId { get; set; }
        public virtual Customers Customers { get; set; }
    }
}
