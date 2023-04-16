using System;

namespace AgriExpert.Models.DTO
{
    public class UpdateQuestionRequest
    {
        public string QuestionContext { get; set; }
        public string QuestionStatus { get; set; }
        public string QuestionAnswer { get; set; }
        public string QuestionTopicName { get; set; }
        public string QuestionsTopicVariety { get; set; }
        public string QuestionTopicGrowingSeason { get; set; }
        public string QuestionTopicAge { get; set; }
        public string QuestionTopicOtherDetails { get; set; }
        public string QuestionTopicImages { get; set; }
        public string QuestionFeedback { get; set; }
        public Guid ExpertsId { get; set; }
    }
}
