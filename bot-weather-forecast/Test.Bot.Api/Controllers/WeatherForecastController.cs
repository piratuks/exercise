using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Test.Bot.Api.Weather;

namespace Test.Bot.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly List<WeatherForecast> Forecasts = new List<WeatherForecast>
    {
        new WeatherForecast
        {
            LocationISO = "US-NY",
            LocationName = "New York",
            Description = "Similar temperatures continuing with no rain expected.",
            UnitGroup = "metric",
            Days = new List<DayForecast>
            {
                new DayForecast
                {
                    Date = new DateTime(2024, 1, 1),
                    Humidity = 50,
                    WindSpeed = 10,
                    TempMin = 10,
                    TempMax = 20,
                    Temp = 15,
                    TempFeelsLike = 14,
                    Description = "Partly cloudy throughout the day."
                }
            }
        },
    };

        [HttpGet]
        public IActionResult Get([FromQuery] string locationISO)
        {
            if (string.IsNullOrWhiteSpace(locationISO))
            {
                return BadRequest("LocationISO query parameter is required.");
            }

            var forecast = Forecasts
                .Find(f => f.LocationISO.Equals(locationISO, StringComparison.OrdinalIgnoreCase));

            if (forecast == null)
            {
                Ok();
            }

            var settings = new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver()
            };

            return Ok(JsonConvert.SerializeObject(forecast, settings));
        }
    }
}