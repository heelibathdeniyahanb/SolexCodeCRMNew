namespace SolexCode.CRM.API.New.Models
{
    public class Otp
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Code { get; set; }
        public DateTime GeneratedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
        public bool IsVerified { get; set; } = false;

        // Navigation property
        public User User { get; set; }
    }
}
