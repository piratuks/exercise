using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Schema;
using Microsoft.Extensions.Logging;
using Test.Bot.Api.Database;
using Test.Bot.Api.Utils;
using Test.Bot.Api.Weather;

namespace Test.Bot.Api.Bots
{
    public class DialogAndWelcomeBot<T> : DialogBot<T>
        where T : Dialog
    {
        private readonly IDatabaseService _databaseService;
        private readonly IWeatherForecastService _weatherService;
        private readonly UtilsService _utilsService;

        public DialogAndWelcomeBot(ConversationState conversationState, UserState userState, T dialog,
            ILogger<DialogBot<T>> logger, IDatabaseService databaseService, IWeatherForecastService weatherService, UtilsService utilsService)
            : base(conversationState, userState, dialog, logger)
        {
            _databaseService = databaseService;
            _weatherService = weatherService;
            _utilsService = utilsService;
        }

        protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
        {
            var command = turnContext.Activity.Text.Trim();
            if (command.StartsWith("/weather"))
            {
                var weatherCommandService = new WeatherCommandService(turnContext, cancellationToken, _databaseService, _weatherService, _utilsService);
                var userProfileData = await weatherCommandService.getUserProfileData();
                var weatherData = await weatherCommandService.getWeatherData(userProfileData);
                var valid = await weatherCommandService.validateData(userProfileData, weatherData);

                if (!valid) return;

                var cardList = weatherCommandService.getCardList(weatherData);

                var reply = MessageFactory.Attachment(cardList);
                await turnContext.SendActivityAsync(reply, cancellationToken);
            }
            else
            {
                await turnContext.SendActivityAsync(MessageFactory.Text("Command not recognized."), cancellationToken);
            }
        }

        protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded,
            ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            foreach (var member in membersAdded)
            {
                // Greet anyone that was not the target (recipient) of this message.
                // To learn more about Adaptive Cards, see https://aka.ms/msbot-adaptivecards for more details.
                if (member.Id != turnContext.Activity.Recipient.Id)
                {
                    var welcomeCard = _utilsService.CreateAdaptiveCardAttachment("Test.Bot.Api.Cards.welcomeCard.json");
                    var response = MessageFactory.Attachment(welcomeCard);
                    await turnContext.SendActivityAsync(response, cancellationToken);
                    await Dialog.RunAsync(turnContext, ConversationState.CreateProperty<DialogState>(nameof(DialogState)),
                        cancellationToken);
                }
            }
        }
    }
}