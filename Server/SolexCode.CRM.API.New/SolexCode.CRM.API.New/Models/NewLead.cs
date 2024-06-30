using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SolexCode.CRM.API.New.Models
{
    public class NewLead
    {
        public int Id { get; set; }
        public string LeadName { get; set; }
        public string CompanyName { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string SalesRep { get; set; }
        public int? LeadManagerId { get; set; }
        public string SalesPipeline { get; set; }
        public string LeadStatus { get; set; }

        public ICollection<Task> Tasks { get; set; } = new List<Task>();
        [JsonIgnore]
        public ICollection<Events> Events { get; set; } = new List<Events>();
        [JsonIgnore]
        public ICollection<NewTask> NewTasks { get; set; }

        // Foreign key to User

        public int? UserId { get; set; } // Add this line to define the foreign key
        [ForeignKey("UserId")]
        [JsonIgnore]
        public User User { get; set; } // Add this line to define the navigation property

        public string UserFullName { get; set; }
        public string UserEmail { get; set; }

    }
}

