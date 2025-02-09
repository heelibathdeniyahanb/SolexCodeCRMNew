﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SolexCode.CRM.API.New.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        [Required]
        public string InvoiceNo { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public string ClientName { get; set; }

        [Required]
        [EmailAddress]
        public string ClientEmail { get; set; }

        public string ClientCompany { get; set; }
        public string ClientPost { get; set; }

        [Required]
        public decimal Subtotal { get; set; }

        public decimal Discount { get; set; }

        [Required]
        public decimal Total { get; set; }

        public string Pipeline { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public int LastInvoiceNumber { get; set; }

        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int? NewLeadId { get; set; }
        [ForeignKey("NewLeadId")]
        public NewLead NewLead { get; set; }
    }
}