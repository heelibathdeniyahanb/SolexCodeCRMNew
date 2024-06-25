namespace SolexCode.CRM.API.New.Dtos
{
    public class LeadCreatedNotificationDto
    {
        public string LeadName { get; set; }
        public DateOnly EndDate { get; set; }
        public string LeadManagerName { get; set; }
        public string LeadManagerEmail { get; set; }
        public string UserFullName { get; }
    }
}
