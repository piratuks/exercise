using System.Collections.Generic;

namespace Test.Bot.Api.Date
{
    public static class DateExtensions
    {

        private static readonly Dictionary<string, string> DateFormatMap = new()
        {
            {
                "US-NY",
                "MM-dd-yyyy"
            },
        };

        public static string ToFormat(string location)
        {
            var format = DateFormatMap.TryGetValue(location, out var symbol) ? symbol : null;

            if (string.IsNullOrEmpty(format)) return "yyyy-MM-dd";


            return format;
        }
    }
}