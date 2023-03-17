namespace AgriExpert.Models.DTO
{
    public class AddExpertRequest
    {
        public string ExpertFullName { get; set; }
        public string ExpertUserName { get; set; }
        public string ExpertPassword { get; set; }
        public string ExpertEmail { get; set; }
        public string ExpertPhone { get; set; }
        public string Role { get; set; }
    }
}
