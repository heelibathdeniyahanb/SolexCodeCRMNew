using Microsoft.EntityFrameworkCore;
using SolexCode.CRM.API.New.Models;

namespace SolexCode.CRM.API.New.Data
{
    public class DatabaseContext:DbContext
    {

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }
        public DbSet<Event> Event { get; set; }
    }
}
