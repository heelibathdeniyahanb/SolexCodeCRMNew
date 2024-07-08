namespace SolexCode.CRM.API.New.Dtos
{
    public class InvoiceCreateDto
    {
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
        public int UserId { get; set; }
        public int? NewLeadId { get; set; }
    }
}
