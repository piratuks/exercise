using System.Threading.Tasks;

namespace Test.Bot.Api.Weather
{
    public interface IWeatherForecastService
    {
        Task<WeatherForecast> GetWeatherForecastAsync(string locationISO);
    }
}