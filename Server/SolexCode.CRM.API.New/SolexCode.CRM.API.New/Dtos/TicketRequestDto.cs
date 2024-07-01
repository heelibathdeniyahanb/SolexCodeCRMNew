using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace SolexCode.CRM.API.New.Dto
{
    public class TicketRequestDto
    {
        public string? TicketName { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public string? ContactNo { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string? Tracker { get; set; } = string.Empty;
        public List<IFormFile>? Attachments { get; set; }

        public string?CustomerSupporterName { get; set; }
    }
}
