namespace SolexCode.CRM.API.New.Dtos
{
    public class GetLeadByLeadManagerDto
    {
        public int LeadId { get; set; }
        public string LeadName { get; set; }
        public string CompanyName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string SalesPipeline { get; set; }
        public string LeadStatus { get; set; }
        public string SalesRep { get; set; }
        public int LeadManagerId { get; set; }
        public int UserId { get; set; }
        public string UserFullName { get; set; }
        public string UserEmail { get; set; }
    }
}
