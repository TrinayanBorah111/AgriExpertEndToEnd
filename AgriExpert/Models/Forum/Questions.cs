using AgriExpert.Models.User;
using Microsoft.AspNetCore.Http;
using System;

namespace AgriExpert.Models.Forum
{
    public class Questions
    {
        public Guid QuestionsId { get; set; }
        public string QuestionTopicName { get; set; }
        public string QuestionsTopicVariety { get; set; }
        public string QuestionTopicGrowingSeason { get; set; }
        public string QuestionTopicAge { get; set; }
        public string QuestionTopicOtherDetails { get; set; }
        public string QuestionTopicImages { get; set; }
        //public IFormFile QuestionTopicImage { get; set; }
        public string QuestionContext { get; set; }
        public string QuestionStatus { get; set; }
        public string QuestionAnswer { get; set; }
        public string QuestionFeedback { get; set; }
        //Customer properties
        public Guid CustomersId { get; set; }
        public Customers Customers { get; set; }
        //Expert properties
        public Guid? ExpertsId { get; set; }
        public virtual Experts Experts { get; set; }
    }
}
