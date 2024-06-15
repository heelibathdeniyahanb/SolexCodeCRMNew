using Microsoft.EntityFrameworkCore;
using SolexCode.CRM.API.New.Models;
//using static System.Net.WebRequestMethods;
using CRMTask = SolexCode.CRM.API.New.Models.Task;

namespace SolexCode.CRM.API.New.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<Events> Events { get; set; }
        public DbSet<Participant> Participant { get; set; }
        public DbSet<CRMTask> Task { get; set; } // Use the alias here
        public DbSet<Lead> Lead{ get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Email> Email { get; set; }
        public DbSet<Otp> Otps { get; set; }

        public DbSet<ClientLead> ClientLead { get; set; }   
        public DbSet<Invoice> Invoice { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Email Attachments Configuration

            modelBuilder.Entity<Email>()
               .HasMany(e => e.Attachments)
               .WithOne(a => a.Email)
               .HasForeignKey(a => a.EmailId);

            // Participant Configuration
            modelBuilder.Entity<Participant>()
                .HasKey(p => new { p.UserId, p.EventId });

            modelBuilder.Entity<Participant>()
                .HasOne(p => p.User)
                .WithMany(u => u.Participants)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<Participant>()
                .HasOne(p => p.Event)
                .WithMany(e => e.Participants)
                .HasForeignKey(p => p.EventId);

            base.OnModelCreating(modelBuilder);
        }

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
