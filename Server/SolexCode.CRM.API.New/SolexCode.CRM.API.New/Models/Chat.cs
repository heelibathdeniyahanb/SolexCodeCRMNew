namespace SolexCode.CRM.API.New.Models
{
    
    
        public class ChatMessage
        {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public int ChatId { get; set; } // Add this property to link to Chat
        public string Content { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;

        public User Sender { get; set; }
        public User Receiver { get; set; }
        public Chat Chat { get; set; } // Navigation property to Chat
    }

        public class ChatParticipant
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public int ChatId { get; set; }
            public User User { get; set; }
            public Chat Chat { get; set; }
        }

        public class Chat
        {
        public int Id { get; set; }
        public List<ChatParticipant> Participants { get; set; } = new List<ChatParticipant>();
        public List<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    }
    

}
