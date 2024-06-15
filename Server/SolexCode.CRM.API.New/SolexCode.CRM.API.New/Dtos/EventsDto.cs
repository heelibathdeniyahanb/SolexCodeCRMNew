using SolexCode.CRM.API.New.Models;

namespace SolexCode.CRM.API.New.DTOs
{
    public class EventsDto
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string Venue { get; set; }
        public string Host { get; set; }

        public DateTime? RepeatUntilDate { get; set; }
        public string? RepeatUntilTime { get; set; }
        public DateTimeOffset ReminderDate { get; set; }
        public string ReminderTime { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
        public DateTime DateModified { get; set; } = DateTime.Now;

        public ICollection<ParticipantDto>? Participants { get; set; }
        public string Description { get; set; }
        public bool IsImportant { get; set; }
        public bool IsSendViaEmail { get; set; }
    }
}
