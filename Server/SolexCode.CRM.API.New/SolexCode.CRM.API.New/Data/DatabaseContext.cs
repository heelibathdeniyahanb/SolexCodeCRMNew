using Microsoft.EntityFrameworkCore;
using SolexCode.CRM.API.New.Models;
using CRMTask = SolexCode.CRM.API.New.Models.Task;

namespace SolexCode.CRM.API.New.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<Event> Event { get; set; }
        public DbSet<CRMTask> Task { get; set; } // Use the alias here
        public DbSet<Lead> Lead{ get; set; }
        public DbSet<User> Users { get; set; }
    }
}
