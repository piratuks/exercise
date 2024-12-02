using System.Threading.Tasks;

namespace Test.Bot.Api.Database
{
    public interface IDatabaseService
    {
        Task<UserProfile> GetUserProfileAsync(string userId);
    }
}