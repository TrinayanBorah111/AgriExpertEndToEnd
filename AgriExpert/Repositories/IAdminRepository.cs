using AgriExpert.Models.User;
using System.Threading.Tasks;

namespace AgriExpert.Repositories
{
    public interface IAdminRepository
    {
        Task<Admins> AuthenticateAdminAsync(string username, string password);
    }
}
