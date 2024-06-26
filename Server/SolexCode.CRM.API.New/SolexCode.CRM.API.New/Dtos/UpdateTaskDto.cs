namespace SolexCode.CRM.API.New.Dtos
{
    public class UpdateTaskDto
    {
        public string? TaskName { get; set; }
        public string? TaskDescription { get; set; }
        public string? Status { get; set; }
        public DateTime? DueDate { get; set; }
        public string? LeadName { get; set; }
        public DateTime? ReminderDate { get; set; }
        public string? ReminderTime { get; set; }
        public bool? Priority { get; set; }
    }
}
