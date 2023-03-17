using System;

namespace AgriExpert.Models.User
{
    public class Experts
    {
        public Guid ExpertsId { get; set; }
        public string ExpertFullName { get; set; }
        public string ExpertUserName { get; set; }
        public string ExpertPassword { get; set; }
        public string ExpertStatus { get; set; }
        public string ExpertEmail { get; set; }
        public string ExpertPhone { get; set; }
        public string Role { get; set; }
        //Question properties
        //public Guid? QuestionsID { get; set; }
        //public IEnumerable<Questions> Questions { get; set; }
    }
}
