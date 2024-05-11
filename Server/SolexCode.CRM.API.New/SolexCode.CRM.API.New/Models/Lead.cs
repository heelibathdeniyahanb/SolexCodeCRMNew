namespace SolexCode.CRM.API.New.Models
{
    public class Lead
    {
        public int Id { get; set; }
        public string LeadName { get; set; }
        public string CompanyName { get; set;}
        public DateOnly StartDate { get; set;}
        public DateOnly EndDate { get; set;}
        public string SalesRep { get; set;}
        public string SalesPipeline { get; set; }
        public string LeadStatus { get; set; }
    }


}
