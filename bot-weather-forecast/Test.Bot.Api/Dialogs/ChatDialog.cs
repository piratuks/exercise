using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Dialogs;
using Test.Bot.Api.Chat;

namespace Test.Bot.Api.Dialogs
{
    public class ChatDialog : CancelAndHelpDialog
    {
        private readonly IChatService _chatService;
        
        public ChatDialog(IChatService chatService)
            : base(nameof(ChatDialog))
        {
            _chatService = chatService;
            
            AddDialog(new TextPrompt(nameof(TextPrompt)));
            
            var waterfallSteps = new WaterfallStep[]
            {
                QuestionStepAsync,
                ResponseStepAsync,
                LoopStepAsync,
            };

            AddDialog(new WaterfallDialog(nameof(WaterfallDialog), waterfallSteps));

            // The initial child Dialog to run.
            InitialDialogId = nameof(WaterfallDialog);
        }

        private Task<DialogTurnResult> QuestionStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            return stepContext.PromptAsync(nameof(TextPrompt), new PromptOptions(), cancellationToken);
        }

        private async Task<DialogTurnResult> ResponseStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            var promptMessage = (string)stepContext.Result;

            var answer = await _chatService.SendMessageAsync(promptMessage, cancellationToken);
            await stepContext.Context.SendActivityAsync(MessageFactory.Text(answer, answer), cancellationToken);

            return await stepContext.NextAsync(answer, cancellationToken);
        }

        private async Task<DialogTurnResult> LoopStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            return await stepContext.ReplaceDialogAsync(InitialDialogId, null, cancellationToken);
        }
    }
}