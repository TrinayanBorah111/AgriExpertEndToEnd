using AgriExpert.Models.User;
using System.Threading.Tasks;

namespace AgriExpert.Repositories
{
    public interface ITokenHandler
    {
        Task<string> CreateAdminTokenAsync(Admins admins);
        Task<string> CreateExpertTokenAsync(Experts experts);
    }
}
