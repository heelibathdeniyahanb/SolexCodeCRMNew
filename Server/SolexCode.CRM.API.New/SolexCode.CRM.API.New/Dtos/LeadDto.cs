using SolexCode.CRM.API.New.DTOs;

namespace SolexCode.CRM.API.New.Dtos
{
    public class LeadDto
    {
        public string LeadName { get; set; }
        public string CompanyName { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string SalesPipeline { get; set; }
        public string LeadStatus { get; set; }
        public string UserFullName { get; set; }
        public string UserEmail { get; set; }
        // public LeadClientDto LeadClientDto { get; set; }



    }
}
