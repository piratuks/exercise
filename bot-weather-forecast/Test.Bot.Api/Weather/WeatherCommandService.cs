using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;
using Test.Bot.Api.Database;
using Test.Bot.Api.Date;
using Test.Bot.Api.Temperature;
using Test.Bot.Api.Utils;

namespace Test.Bot.Api.Weather
{
    public class WeatherCommandService
    {
        private readonly ITurnContext<IMessageActivity> _turnContext;
        private readonly CancellationToken _cancellationToken;
        private readonly IDatabaseService _databaseService;
        private readonly IWeatherForecastService _weatherService;
        private readonly UtilsService _utilsService;

        public WeatherCommandService(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken, IDatabaseService databaseService, IWeatherForecastService weatherService, UtilsService utilsService)
        {
            _turnContext = turnContext;
            _cancellationToken = cancellationToken;
            _databaseService = databaseService;
            _weatherService = weatherService;
            _utilsService = utilsService;
        }

        public List<Attachment> getCardList(WeatherForecast weatherData)
        {
            var cardList = new List<Attachment> { constructWeatherCard(weatherData) };
            var detailsCards = constructWeatherDetailsCard(weatherData);
            cardList.AddRange(detailsCards);
            return cardList;
        }

        private List<Attachment> constructWeatherDetailsCard(WeatherForecast weatherData)
        {
            var cardList = new List<Attachment> { };
            var tempUnit = TemperatureUnitExtensions.ToTemperatureUnit(weatherData.UnitGroup);
            var dateFormat = DateExtensions.ToFormat(weatherData.LocationISO);

            foreach (var day in weatherData.Days)
            {
                var cardWeatherDetailsPlaceholders = new Dictionary<string, string>
                    {
                        { "date", day.Date.ToString(dateFormat) },
                        { "temperature", day.Temp.ToString() },
                        { "temperatureSymbol", tempUnit.TempSymbol },
                        { "temperatureFeelsLike", day.TempFeelsLike.ToString() },
                        { "lowestTemperature", day.TempMin.ToString() },
                        { "highestTemperature", day.TempMax.ToString() },
                        { "humidity", day.Humidity.ToString() },
                        { "windSpeed", day.WindSpeed.ToString() },
                        { "windSymbol", tempUnit.WindSymbol },
                        { "description", day.Description },
                    };
                var cardWeatherDetails = _utilsService.CreateAdaptiveCardAttachment("Test.Bot.Api.Cards.cardWeatherDetails.json", cardWeatherDetailsPlaceholders);
                cardList.Add(cardWeatherDetails);
            }

            return cardList;
        }

        private Attachment constructWeatherCard(WeatherForecast weatherData)
        {
            var cardWeatherPlaceholders = new Dictionary<string, string>
            {
                { "cardTitle", weatherData.LocationName },
                { "cardDesc", weatherData.Description }
            };
            return _utilsService.CreateAdaptiveCardAttachment("Test.Bot.Api.Cards.cardWeather.json", cardWeatherPlaceholders);
        }

        public async Task<UserProfile> getUserProfileData()
        {
            var userId = _turnContext.Activity.From.Id;
            var userProfile = await _databaseService.GetUserProfileAsync(userId);

            return userProfile;
        }

        public async Task<WeatherForecast> getWeatherData(UserProfile userProfile)
        {
            if (userProfile != null)
            {
                var weatherData = await _weatherService.GetWeatherForecastAsync(userProfile.LocationISO);

                return weatherData;
            }

            return null;
        }

        public async Task<bool> validateData(UserProfile userProfile, WeatherForecast weatherData)
        {
            var validProfile = await validateProfile(userProfile);
            var validWeather = await validateWeather(weatherData);

            return validProfile && validWeather;
        }

        private async Task<bool> validateProfile(UserProfile userProfile)
        {
            if (userProfile == null)
            {
                await _turnContext.SendActivityAsync(MessageFactory.Text("User profile not found."), _cancellationToken);
                return false;
            }

            return true;
        }

        private async Task<bool> validateWeather(WeatherForecast weatherData)
        {
            if (weatherData == null)
            {
                await _turnContext.SendActivityAsync(MessageFactory.Text("Weather data not available."), _cancellationToken);
                return false;

            }

            return true;
        }
    }
}