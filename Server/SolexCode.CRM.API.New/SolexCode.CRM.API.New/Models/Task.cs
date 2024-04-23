namespace SolexCode.CRM.API.New.Models
{
    public class Task
    {
       public int Id { get; set; }

       public DateTime DateAdded { get; set; }
       public DateTime DateModified { get; set; }
       public string? TaskName { get; set; }
       public string? TaskDescription { get; set; }
       public string? TaskStatus { get; set; }
       public DateTime DueDate { get; set; }
       public DateTime Reminder { get; set; }
        public string RelatedTo { get; set; }
       public bool Priority { get; set; }
        public string CreatedBy { get; set; }

        public Task()
        {
            
            CreatedBy = ""; // Default value, should be set based on user context
            DateAdded = DateTime.Now;
            DateModified = DateTime.Now;
        }



    }

    public enum TaskStatus
    {
        ToDo,
        InProgress,
        Completed,
        Cancelled
    }
}
