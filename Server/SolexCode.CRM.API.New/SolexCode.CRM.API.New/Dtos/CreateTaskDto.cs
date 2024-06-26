namespace SolexCode.CRM.API.New.Dtos
{
    public class CreateTaskDto
    {
        public string TaskName { get; set; }
        public string? TaskDescription { get; set; }
        public string Status { get; set; }
        public DateTime DueDate { get; set; }
        public string LeadName { get; set; }
        public DateTime? ReminderDate { get; set; }
        public string? ReminderTime { get; set; }
        public bool Priority { get; set; }
        public string CreatedByName { get; set; }
        public string CreatedByEmail { get; set; }
        public int? CreatedById { get; set; }
        public int NewLeadId { get; set; }
    }
}
