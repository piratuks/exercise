using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Test.Bot.Api.Weather
{
    public class WeatherForecastService : IWeatherForecastService
    {
        private readonly HttpClient _httpClient;
        private readonly string _weatherAPI;

        public WeatherForecastService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _weatherAPI = configuration.GetValue<string>("WeatherAPI");
        }

        public async Task<WeatherForecast> GetWeatherForecastAsync(string locationISO)
        {
            var response = await _httpClient.GetStringAsync($"{_weatherAPI}?locationISO={locationISO}");
            var settings = new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver()
            };
            return JsonConvert.DeserializeObject<WeatherForecast>(response, settings);
        }
    }
}