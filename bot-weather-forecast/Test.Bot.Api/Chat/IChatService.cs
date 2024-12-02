using System.Threading;
using System.Threading.Tasks;

namespace Test.Bot.Api.Chat
{
    public interface IChatService
    {
        Task<string> SendMessageAsync(string message, CancellationToken cancellationToken = default);    
    }
}