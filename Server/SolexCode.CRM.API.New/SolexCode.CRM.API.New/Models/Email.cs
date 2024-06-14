using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SolexCode.CRM.API.New.Models
{
    public class Email
    {
        public int Id { get; set; }

        [Required]
        public string? From { get; set; }

        [Required]
        public string? To { get; set; }

        [Required]
        public string? Subject { get; set; }

        [Required]
        public string Body { get; set; }

        public DateTime SentDateTime { get; set; }

        public List<Attachment> Attachments { get; set; } = new List<Attachment>();
    }

    public class Attachment
    {
        [Key]
        public int Id { get; set; }

        public string FileName { get; set; }
        public byte[] Content { get; set; }

        public int EmailId { get; set; }
        public Email Email { get; set; }
    }


}
