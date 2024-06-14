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

        public DbSet<ClientLead> ClientLead { get; set; }   
        public DbSet<Invoice> Invoice { get; set; }

        public (int LastNumber, string LastDate) GetLastInvoiceData()
        {
            var lastInvoice = Invoice.OrderByDescending(i => i.Id).FirstOrDefault();
            if (lastInvoice != null)
            {
                var lastInvoiceDate = lastInvoice.Date.ToString("yyyy-MM-dd");
                return (lastInvoice.LastInvoiceNumber, lastInvoiceDate);
            }
            return (0, DateTime.Now.ToString("yyyy-MM-dd"));
        }
    }
}
