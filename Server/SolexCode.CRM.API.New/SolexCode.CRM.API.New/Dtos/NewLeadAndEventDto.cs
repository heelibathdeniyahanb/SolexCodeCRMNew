using SolexCode.CRM.API.New.Models;

namespace SolexCode.CRM.API.New.Dtos
{
    public class NewLeadAndEventDto
    {
        public NewLead NewLead { get; set; }
        public List<Events> Events { get; set; }
    }
}
