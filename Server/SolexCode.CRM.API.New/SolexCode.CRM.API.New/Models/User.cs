namespace SolexCode.CRM.API.New.Models
{
    public class User
    {
        public User()
        {
            Participants = new List<Participant>();
            ChatParticipants = new List<ChatParticipant>();
            NewLeads = new List<NewLead>();
            //  NewLeadClients = new List<NewLeadClient>();


        }
        public int Id { get; set; }
        public string FullName { get; set; }


        public string Password { get; set; }
        public bool ChangePassword { get; set; }
        public string Email { get; set; }

        public string Role { get; set; }
        public string MobileNumber { get; set; }
        public DateOnly BirthDate { get; set; }
        public string CompanyName { get; set; }
        public string Continent { get; set; }
        public string Country { get; set; }
        public string Industry { get; set; }
        public string ImagePath { get; set; }
       
        public DateTime DateAdded { get; set; } = DateTime.Now;
        public ICollection<Participant> Participants { get; set; }
        public ICollection<ChatParticipant> ChatParticipants { get; set; }

        public ICollection<NewLead> NewLeads { get; set; }
        //public ICollection<NewLeadClient> NewLeadClients { get; set; }
    }
}
