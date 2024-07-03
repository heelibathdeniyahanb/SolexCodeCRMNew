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

        public DbSet<Events> Events { get; set; }
        public DbSet<Participant> Participant { get; set; }
        public DbSet<CRMTask> Task { get; set; } // Use the alias here

        public DbSet<NewTask> NewTasks { get; set; }
        public DbSet<Lead> Lead { get; set; }
        public DbSet<NewLead> NewLeads { get; set; }
        
        public DbSet<LeadClient> LeadClients { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Email> Email { get; set; }
        public DbSet<Otp> Otps { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<ChatParticipant> ChatParticipants { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<ClientLead> ClientLead { get; set; }
        public DbSet<Invoice> Invoice { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<TicketAttachment> TicketAttachment { get; set; }
        public DbSet<UnRegisteredUser> UnRegisteredUsers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Email Attachments Configuration
            modelBuilder.Entity<Email>()
               .HasMany(e => e.Attachments)
               .WithOne(a => a.Email)
               .HasForeignKey(a => a.EmailId);

            // lead and task
            modelBuilder.Entity<Lead>()
               .HasMany(lead => lead.Tasks)
               .WithOne(task => task.Lead)
               .HasForeignKey(task => task.LeadId)
               .IsRequired(false);


            // newlead and event
            modelBuilder.Entity<NewLead>()
               .HasMany(lead => lead.Events)
               .WithOne(events => events.NewLead)
               .HasForeignKey(events => events.NewLeadId)
               .IsRequired(false);

            // newlead and newtask
            modelBuilder.Entity<NewLead>()
               .HasMany(lead => lead.NewTasks)
               .WithOne(nt => nt.NewLead)
               .HasForeignKey(nt => nt.NewLeadId)
               .IsRequired(false);


            // Configure the one-to-many relationship user-company
            modelBuilder.Entity<User>()
                .HasOne(u => u.Company)
                .WithMany(c => c.Users)
                .HasForeignKey(u => u.CompanyId);

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

            // Chat Configurations
            modelBuilder.Entity<User>()
                .HasMany(u => u.Participants)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<Chat>()
                .HasMany(c => c.Participants)
                .WithOne(p => p.Chat)
                .HasForeignKey(p => p.ChatId);

            modelBuilder.Entity<Chat>()
                .HasMany(c => c.Messages)
                .WithOne(m => m.Chat)
                .HasForeignKey(m => m.ChatId);

            modelBuilder.Entity<ChatMessage>()
                .HasOne(m => m.Sender)
                .WithMany()
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ChatMessage>()
                .HasOne(m => m.Receiver)
                .WithMany()
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            // One-to-many relationship between LeadClient and Lead
            modelBuilder.Entity<LeadClient>()
                .HasMany(client => client.Leads)
                .WithOne(lead => lead.LeadClient)
                .HasForeignKey(lead => lead.LeadClientId);

            //one to many relationship with user and lead
            modelBuilder.Entity<User>()
               .HasMany(u => u.NewLeads)
               .WithOne(nl => nl.User)
               .HasForeignKey(nl => nl.UserId)
               .OnDelete(DeleteBehavior.Cascade);

            //Ticket Attachments Configuration
            modelBuilder.Entity<Ticket>()
               .HasMany(e => e.Attachments)
               .WithOne(a => a.Ticket)
               .HasForeignKey(a => a.TicketId);



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
