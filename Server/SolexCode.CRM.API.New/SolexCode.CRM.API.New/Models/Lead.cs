namespace SolexCode.CRM.API.New.Models
{
    public class Lead
    {
        public int Id { get; set; }
        public string LeadName { get; set; }
        public string CompanyName { get; set;}
        public DateTime StartDate { get; set;}
        public DateTime EndDate { get; set;}
        public string SalesRep { get; set;}
        public string SalesPipeline { get; set; }
        public string LeadStatus { get; set; }
    }


}
