using SolexCode.CRM.API.New.DTOs;

namespace SolexCode.CRM.API.New.Dtos
{
    public class UpdateLeadDto
    {
        public int Id { get; set; }
        public string LeadName { get; set; }
        public string CompanyName { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string SalesRep { get; set; }
        public int LeadManagerId { get; set; }
        public string SalesPipeline { get; set; }
        public string LeadStatus { get; set; }
        public bool IsWon { get; set; }
        public List<TaskDto> Tasks { get; set; }
        public int UserId { get; set; }
        public string UserFullName { get; set; }
        public string UserEmail { get; set; }
    }

}
