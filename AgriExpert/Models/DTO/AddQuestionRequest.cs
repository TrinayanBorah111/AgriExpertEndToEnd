using System;

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
        public Guid CustomersId { get; set; }
    }
}
