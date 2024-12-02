using System;
using System.Security.Cryptography;
using System.Threading;
using System.Threading.Tasks;

namespace Test.Bot.Api.Chat
{
    public class ChatServiceStub : IChatService
    {
        private readonly string[] _responses = {
            "Why don't scientists trust atoms? Because they make up everything!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "Parallel lines have so much in common. It's a shame they'll never meet.",
            "How does a penguin build its house? Igloos it together!",
            "What do you call a bear with no teeth? A gummy bear.",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
            "Why did the bicycle fall over? Because it was two-tired!",
            "I'm reading a book on anti-gravity. It's impossible to put down.",
            "Why did the tomato turn red? Because it saw the salad dressing!"
        };
    
        public Task<string> SendMessageAsync(string message, CancellationToken cancellationToken = default)
        {
            var index = RandomNumberGenerator.GetInt32(0, 9);
            return Task.FromResult($"{message}{Environment.NewLine}  {_responses[index]}");
        }
    }
}