using AutoMapper;

namespace AgriExpert.Profiles
{
    public class QuestionsProfile:Profile
    {
        public QuestionsProfile()
        {
            CreateMap<Models.Forum.Questions, Models.DTO.Questions>()
                   .ReverseMap();
            CreateMap<Models.User.Customers, Models.DTO.Customers>()
                .ReverseMap();
            CreateMap<Models.User.Experts, Models.DTO.Experts>()
                .ReverseMap();
        }
    }
}
