# Welcome to 

We, engineers at , are striving to provide the best solutions for business-side problems which scale, last and 
require minimal maintenance. Our code is clean, well-tested and flexible, and we are not afraid to touch legacy code, 
re-evaluate it and rework it if necessary. We hope that our new colleagues appreciate the same values and stick to 
best-practices.

## Backend homework task

In this homework we ask you to add a new feature to our existing codebase. The feature is a simple weather forecast 
presentation using chatbot. The chatbot should be able to answer question (shortcut command) about the weather based on 
user's location.

## Description

When user prompts the chatbot with `/weather` command, the chatbot should respond with the weather forecast for the user's location. Answer to user's question should be 
formatted in an easily readable and understandable way which is supported by Bot Framework. 
[Adaptive Cards](https://adaptivecards.io/) might be a good option, more on that can be found 
[here](https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-howto-add-media-attachments?view=azure-bot-service-4.0&tabs=csharp).

We expect user's profile to be retrieved from a persistent storage (candidate's choice, i.e.: SQL Server, Redis,
Azure Storage, etc.). For the sake of simplicity Weather Forecast API client can be mocked.

Database schema for user's profile:
```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "displayName": {
      "type": "string"
    },
    "country": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "locationISO": {
      "type": "string",
      "$comment": "An ISO 3166-2 code of the location"
    }
  },
  "required": [
    "id",
    "firstName",
    "lastName",
    "displayName",
    "country",
    "city",
    "locationISO"
  ]
}
```

Sample:
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "John",
  "lastName": "Doe",
  "displayName": "John Doe",
  "country": "United States",
  "city": "New York",
  "locationISO": "US-NY"
}
```

Weather Forecast API:

Let's say that this API returns data in this format:
```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "locationISO": {
      "type": "string",
      "$comment": "An ISO 3166-2 code of the location"
    },
    "locationName": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "unitGroup": {
      "type": "string"
    },
    "days": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "date": {
              "type": "string",
              "format": "date"
            },
            "humidity": {
              "type": "number"
            },
            "windSpeed": {
              "type": "number"
            },
            "tempMin": {
              "type": "number"
            },
            "tempMax": {
              "type": "number"
            },
            "temp": {
              "type": "number"
            },
            "tempFeelsLike": {
              "type": "number"
            },
            "description": {
              "type": "string"
            }
          },
          "required": [
            "date",
            "humidity",
            "windSpeed",
            "tempMin",
            "tempMax",
            "temp",
            "tempFeelsLike",
            "description"
          ]
        }
      ]
    }
  },
  "required": [
    "locationISO",
    "locationName",
    "description",
    "unitGroup",
    "days"
  ]
}
```

Sample:
```json
{
  "locationISO": "US-NY",
  "locationName": "New York",
  "description": "Similar temperatures continuing with no rain expected.",
  "unitGroup": "metric",
  "days": [
    {
      "date": "2024-01-01",
      "humidity": 50,
      "windSpeed": 10,
      "tempMin": 10,
      "tempMax": 20,
      "temp": 15,
      "tempFeelsLike": 14,
      "description": "Partly cloudy throughout the day."
    }
  ]
}
```

You will need to seed the database with user profile(s) and mock the Weather Forecast API client.

## Requirements

- At , we strive to write clean and simple and easy-to-maintain code, covered with unit tests. 
The solution should match this philosophy.
- The design should be flexible enough to allow extending functionality.
- Short documentation of design decisions and assumptions can be provided in the code itself or a README.
- Missing user's profile or forecast information from an API should be handled gracefully and this information should 
be clearly communicated with the user.
- The solution should be provided as a pull request which introduces changes to `main` branch.


## INFO

It was created Date and Temperature extensions to figure out formats and symbols. Symbols are decided based on UnitGroup. Date format based on LocationISO.