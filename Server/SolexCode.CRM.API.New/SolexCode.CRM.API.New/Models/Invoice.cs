using MimeKit.Encodings;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SolexCode.CRM.API.New.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime Date { get; set; }
        public DateTime DueDate { get; set; }
        public string ClientName { get; set; }
        public string ClientEmail { get; set; }
        public string ClientCompany { get; set; }
        public string ClientPost { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public string Pipeline { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public int LastInvoiceNumber { get; set; }

        // New property to hold User reference
        public int UserId { get; set; }
        public User User { get; set; }

        //New property to hold Lead reference

        public int? NewLeadId { get; set; } // Add this line to define the foreign key
        [ForeignKey("NewLeadId")]
        [JsonIgnore]
        public NewLead NewLead { get; set; } // Add this line to define the navigation property


    }

}
