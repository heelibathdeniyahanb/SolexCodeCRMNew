using System.ComponentModel.DataAnnotations.Schema;

namespace SolexCode.CRM.API.New.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public long Amount { get; set; }
        public string PaymentMethodId { get; set; }
        public string PaymentIntentId { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public string ClientName { get; set; } 
        public string ClientCompany { get; set; } 
        public string Description { get; set; }
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
