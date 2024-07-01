using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SolexCode.CRM.API.New.Models
{
    public class Ticket
    {
        [Key]
        public int TicketId { get; set; }

        public string TicketName { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime UpdatedDate { get; set; } = DateTime.Now;

        public string Tracker { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string ContactNo { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string CustomerSupporterName {  get; set; } = string.Empty;

        public int CustomerSupporterId { get; set; }
        [JsonIgnore]
        public ICollection<TicketAttachment>? Attachments { get; set; }
    }

    public class TicketAttachment
    {
        [Key]
        public int AttachmentId { get; set; }

        [ForeignKey("Ticket")]
        public int TicketId { get; set; }

        public Ticket? Ticket { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string ContentType { get; set; } = string.Empty;
        public byte[]? FileData { get; set; } // Binary data for the file
    }
}
