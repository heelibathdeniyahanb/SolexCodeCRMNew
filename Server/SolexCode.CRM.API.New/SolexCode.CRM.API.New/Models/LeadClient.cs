namespace SolexCode.CRM.API.New.Models
{
    public class LeadClient
    {

        public int Id { get; set; }
        // Foreign key for User
        public int UserId { get; set; }
        public User User { get; set; }

            // One-to-many relationship
        public ICollection<Lead> Leads { get; set; } = new List<Lead>();
    }
}
