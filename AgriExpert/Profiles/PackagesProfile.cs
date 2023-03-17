using AutoMapper;

namespace AgriExpert.Profiles
{
    public class PackagesProfile:Profile
    {
        public PackagesProfile()
        {
            CreateMap<Models.Package.Packages, Models.DTO.Packages>()
                .ReverseMap();
        }
    }
}
