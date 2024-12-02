using System.Collections.Generic;

namespace Test.Bot.Api.Weather
{
    public class WeatherForecast
    {
        public string LocationISO { get; set; }
        public string LocationName { get; set; }
        public string Description { get; set; }
        public string UnitGroup { get; set; }
        public IList<DayForecast> Days { get; set; }
    }
}