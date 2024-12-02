using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Integration.AspNet.Core;
using Microsoft.Bot.Connector.Authentication;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Test.Bot.Api.Bots;
using Test.Bot.Api.Chat;
using Test.Bot.Api.Database;
using Test.Bot.Api.Dialogs;
using Test.Bot.Api.Utils;
using Test.Bot.Api.Weather;

namespace Test.Bot.Api
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient().AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.MaxDepth = HttpHelper.BotMessageSerializerSettings.MaxDepth;
            });

            services.AddSingleton<IDatabaseService, DatabaseService>();

            services.AddHttpClient<IWeatherForecastService, WeatherForecastService>();

            services.AddSingleton<UtilsService, UtilsService>();

            // Create the Bot Framework Authentication to be used with the Bot Adapter.
            services.AddSingleton<BotFrameworkAuthentication, ConfigurationBotFrameworkAuthentication>();

            // Create the Bot Adapter with error handling enabled.
            services.AddSingleton<IBotFrameworkHttpAdapter, AdapterWithErrorHandler>();

            // Create the storage we'll be using for User and Conversation state. (Memory is great for testing purposes.)
            services.AddSingleton<IStorage, MemoryStorage>();

            // Create the User state. (Used in this bot's Dialog implementation.)
            services.AddSingleton<UserState>();

            // Create the Conversation state. (Used by the Dialog system itself.)
            services.AddSingleton<ConversationState>();

            // Register the ChatDialog.
            services.AddSingleton<ChatDialog>();

            // Register the ChatService.
            services.AddTransient<IChatService, ChatServiceStub>();

            // The MainDialog that will be run by the bot.
            services.AddSingleton<MainDialog>();

            // Create the bot as a transient. In this case the ASP Controller is expecting an IBot.
            services.AddTransient<IBot, DialogAndWelcomeBot<MainDialog>>(serviceProvider =>
            {
                var conversationState = serviceProvider.GetRequiredService<ConversationState>();
                var userState = serviceProvider.GetRequiredService<UserState>();
                var dialog = serviceProvider.GetRequiredService<MainDialog>();
                var logger = serviceProvider.GetRequiredService<ILogger<DialogAndWelcomeBot<MainDialog>>>();
                var databaseService = serviceProvider.GetRequiredService<IDatabaseService>();
                var weatherForecastService = serviceProvider.GetRequiredService<IWeatherForecastService>();
                var utilsService = serviceProvider.GetRequiredService<UtilsService>();
                return new DialogAndWelcomeBot<MainDialog>(
                    conversationState, userState, dialog, logger, databaseService, weatherForecastService, utilsService);
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles()
                .UseStaticFiles()
                .UseWebSockets()
                .UseRouting()
                .UseAuthorization()
                .UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}