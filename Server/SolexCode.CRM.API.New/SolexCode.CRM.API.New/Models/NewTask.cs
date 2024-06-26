using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SolexCode.CRM.API.New.Models
{
    public class NewTask
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateModified { get; set; }
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

        [ForeignKey("Id")]
        public int? NewLeadId { get; set; }
        [JsonIgnore]
        public NewLead NewLead { get; set; }



        public NewTask()
        {
            DateAdded = DateTime.Now;
            DateModified = DateTime.Now;
        }

        public enum TaskStatus
        {
            ToDo,
            InProgress,
            Completed,
            Cancelled
        }

    }
}
