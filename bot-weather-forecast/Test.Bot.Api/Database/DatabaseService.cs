
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;

namespace Test.Bot.Api.Database
{
    public class DatabaseService : IDatabaseService
    {
        private readonly string _connectionString;

        public DatabaseService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<UserProfile> GetUserProfileAsync(string userId)
        {
            using var connection = new SqliteConnection(_connectionString);
            const string query = @"
            SELECT 
                id as Id, 
                firstName as FirstName, 
                lastName as LastName, 
                displayName as DisplayName, 
                country as Country, 
                city as City, 
                locationISO as LocationISO 
            FROM UserProfiles
            WHERE id = @Id";
            return await connection.QuerySingleOrDefaultAsync<UserProfile>(query, new { Id = userId });
        }
    }
}