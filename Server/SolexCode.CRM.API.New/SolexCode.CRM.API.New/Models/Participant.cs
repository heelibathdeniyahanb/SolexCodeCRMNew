namespace SolexCode.CRM.API.New.Models;

public class Participant
{
  

    // Foreign key for Event

    public int EventId { get; set; }
    public Events Event { get; set; }

    // Foreign key for User
    public int UserId { get; set; }
    public User User { get; set; }
}
