using System.Collections.Generic;
using System.IO;
using Microsoft.Bot.Schema;
using Newtonsoft.Json;

namespace Test.Bot.Api.Utils
{
    public class UtilsService
    {
        public Attachment CreateAdaptiveCardAttachment(string path, Dictionary<string, string> placeholders = null)
        {
            using (var stream = GetType().Assembly.GetManifestResourceStream(path))
            {
                using (var reader = new StreamReader(stream))
                {
                    var adaptiveCard = reader.ReadToEnd();

                    if (placeholders != null)
                    {
                        foreach (var placeholder in placeholders)
                        {
                            adaptiveCard = adaptiveCard.Replace($"{{{{{placeholder.Key}}}}}", placeholder.Value);
                        }
                    }

                    return new Attachment()
                    {
                        ContentType = "application/vnd.microsoft.card.adaptive",
                        Content = JsonConvert.DeserializeObject(adaptiveCard,
                            new JsonSerializerSettings { MaxDepth = null }),
                    };
                }
            }
        }
    }
}