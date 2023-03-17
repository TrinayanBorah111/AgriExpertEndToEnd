using AgriExpert.Data;
using AgriExpert.Models.Forum;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AgriExpert.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly AgriExpertDbContext agriExpertDbContext;

        public QuestionRepository(AgriExpertDbContext agriExpertDbContext)
        {
            this.agriExpertDbContext = agriExpertDbContext;
        }

        public async Task<Questions> AddAsync(Questions question)
        {
            question.QuestionsId = Guid.NewGuid();
            question.QuestionAnswer = "-";
            question.QuestionStatus = "NotAnswered";
            await agriExpertDbContext.AddAsync(question);
            await agriExpertDbContext.SaveChangesAsync();
            return question;
        }

        public async Task<Questions> DeleteAsync(Guid id)
        {
            var question = await agriExpertDbContext.Questions.FirstOrDefaultAsync(x => x.QuestionsId == id);
            if (question == null)
            {
                return null;
            }
            agriExpertDbContext.Questions.Remove(question);
            await agriExpertDbContext.SaveChangesAsync();
            return question;
        }

        public async Task<IEnumerable<Questions>> GetAllAsync()
        {
            return await agriExpertDbContext.Questions
               .Include(x => x.Customers)
               .Include(x => x.Experts)
               .ToListAsync();
        }

        public async Task<Questions> GetAsync(Guid id)
        {
            return await agriExpertDbContext.Questions
               .Include(x => x.Customers)
               .Include(x => x.Experts)
               .FirstOrDefaultAsync(x => x.QuestionsId == id);
        }

        public async Task<Questions> UpdateAsync(Guid id, Questions question)
        {
            var existingQuestion = await agriExpertDbContext.Questions.FirstOrDefaultAsync(x => x.QuestionsId == id);
            if (existingQuestion == null)
            {
                return null;
            }
            existingQuestion.QuestionTopicName = question.QuestionTopicName;
            existingQuestion.QuestionsTopicVariety = question.QuestionsTopicVariety;
            existingQuestion.QuestionTopicAge = question.QuestionTopicAge;
            existingQuestion.QuestionTopicGrowingSeason = question.QuestionTopicGrowingSeason;
            existingQuestion.QuestionTopicImages = question.QuestionTopicImages;
            existingQuestion.QuestionTopicOtherDetails = question.QuestionTopicOtherDetails;
            existingQuestion.QuestionContext = question.QuestionContext;
            existingQuestion.QuestionStatus = question.QuestionStatus;
            existingQuestion.QuestionAnswer = question.QuestionAnswer;
            existingQuestion.ExpertsId = question.ExpertsId;
            await agriExpertDbContext.SaveChangesAsync();
            return existingQuestion;
        }
    }
}
