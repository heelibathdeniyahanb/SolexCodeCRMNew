using Microsoft.AspNetCore.Http;
using System;
using System.Security.Claims;

namespace SolexCode.CRM.API.New.DTOs
{
    public class TaskDto
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateModified { get; set; }
        public string TaskName { get; set; }
        public string? TaskDescription { get; set; }
        public string Status { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? ReminderDate { get; set; }
        public string? ReminderTime { get; set; }
        public bool Priority { get; set; }
        public string CreatedByName { get; set; }
        public string CreatedByEmail { get; set; }
        public int CreatedById { get; set; }

        public TaskDto()
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
