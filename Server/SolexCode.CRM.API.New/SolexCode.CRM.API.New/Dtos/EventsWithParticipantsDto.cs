using SolexCode.CRM.API.New.Models;

namespace SolexCode.CRM.API.New.Dtos
{
    public class EventsWithParticipantsDto
    {
        public Events Event { get; set; }
        public List<Participant>Participants { get; set; }

    }
}
