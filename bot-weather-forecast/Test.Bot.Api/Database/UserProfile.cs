namespace Test.Bot.Api.Database
{
    public class UserProfile
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string LocationISO { get; set; }
    }
}