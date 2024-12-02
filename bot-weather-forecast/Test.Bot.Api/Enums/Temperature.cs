using System.Collections.Generic;

namespace Test.Bot.Api.Temperature
{
    public enum TemperatureUnitType
    {
        metric = 1,
        us = 2,
        uk = 3,
        scientific = 4
    }

    public class TemperatureUnit
    {
        public string TempSymbol { get; set; }
        public string WindSymbol { get; set; }
    }

    public static class TemperatureUnitExtensions
    {

        private static readonly Dictionary<TemperatureUnitType, TemperatureUnit> TemperatureUnitMap = new()
        {
            {
                TemperatureUnitType.metric,
                new TemperatureUnit
                {
                TempSymbol="C",
                WindSymbol="km/h",
                }
            },
            {
                TemperatureUnitType.us,
                new TemperatureUnit
                {
                TempSymbol="F",
                WindSymbol="mph",
                }
            },
            {
                TemperatureUnitType.uk,
                new TemperatureUnit
                {
                TempSymbol="C",
                WindSymbol="mph",
                }
            },
            {
                TemperatureUnitType.scientific,
                new TemperatureUnit
                {
                TempSymbol="K",
                WindSymbol="m/s",
                }
            },
        };

        public static TemperatureUnit ToTemperatureUnit(string UnitGroup)
        {
            if (UnitGroup.Equals("metric"))
            {
                return ToTemperatureUnit(TemperatureUnitType.metric);
            }
            else if (UnitGroup.Equals("us"))
            {
                return ToTemperatureUnit(TemperatureUnitType.us);
            }
            else if (UnitGroup.Equals("uk"))
            {
                return ToTemperatureUnit(TemperatureUnitType.uk);
            }
            else if (UnitGroup.Equals("base"))
            {
                return ToTemperatureUnit(TemperatureUnitType.scientific);
            }
            return ToTemperatureUnit(TemperatureUnitType.scientific);
        }

        public static TemperatureUnit ToTemperatureUnit(this TemperatureUnitType unit)
        {
            return TemperatureUnitMap.TryGetValue(unit, out var symbol) ? symbol : null;
        }
    }
}