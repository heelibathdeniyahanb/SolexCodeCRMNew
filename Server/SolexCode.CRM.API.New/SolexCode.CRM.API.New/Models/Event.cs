namespace SolexCode.CRM.API.New.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Host { get; set; }
        public string Venue { get; set; }
        public DateTime DateTime { get; set; }
        public string Participants { get; set; }
    }
}
