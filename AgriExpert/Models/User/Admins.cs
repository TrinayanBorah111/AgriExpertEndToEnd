using System;

namespace AgriExpert.Models.User
{
    public class Admins
    {
        public Guid AdminsId { get; set; }
        public string AdminUserName { get; set; }
        public string AdminPassword { get; set; }
    }
}
