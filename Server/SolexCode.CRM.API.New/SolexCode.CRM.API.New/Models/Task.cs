using System;

namespace SolexCode.CRM.API.New.Models
{
    public class Task
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
       
        public int? LeadId { get; set; }
        public Lead Lead { get; set; } // Navigation property should be of type Lead
        public bool Priority { get; set; }
        public string CreatedByName { get; set; }
        public string CreatedByEmail { get; set; }
        public int CreatedById { get; set; }

        public Task()
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
