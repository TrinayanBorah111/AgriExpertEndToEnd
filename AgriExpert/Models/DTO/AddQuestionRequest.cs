using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace AgriExpert.Models.DTO
{
    public class AddQuestionRequest
    {
        public string QuestionContext { get; set; }
        public string QuestionTopicName { get; set; }
        public string QuestionsTopicVariety { get; set; }
        public string QuestionTopicGrowingSeason { get; set; }
        public string QuestionTopicAge { get; set; }
        public string QuestionTopicOtherDetails { get; set; }
        public string QuestionTopicImages { get; set; }
        public IFormFile QuestionTopicImage { get; set; }
        //public List<IFormFile> QuestionTopicImage { get; set; }
        public Guid CustomersId { get; set; }
    }
}
