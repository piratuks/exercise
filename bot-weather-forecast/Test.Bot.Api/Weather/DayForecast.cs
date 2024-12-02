using System;

namespace Test.Bot.Api.Weather
{
    public class DayForecast
    {
        public DateTime Date { get; set; }
        public double Humidity { get; set; }
        public double WindSpeed { get; set; }
        public double TempMin { get; set; }
        public double TempMax { get; set; }
        public double Temp { get; set; }
        public double TempFeelsLike { get; set; }
        public string Description { get; set; }
    }
}