using SolexCode.CRM.API.New.Data;
using SolexCode.CRM.API.New.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolexCode.CRM.API.New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientLeadController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ClientLeadController(DatabaseContext context)
        {
            _context = context;
        }

        // POST: api/clientlead
        [HttpPost]
        public async Task<ActionResult<ClientLead>> CreateLead([FromBody] ClientLead leadFormData)
        {
            _context.ClientLead.Add(leadFormData); // Changed 'ClientLead' to 'ClientLeads'
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLead), new { id = leadFormData.Id }, leadFormData);
        }

        // GET: api/clientlead
        [HttpGet]
        public ActionResult<IEnumerable<ClientLead>> GetLead()
        {
            return _context.ClientLead.ToList(); // Changed 'ClientLead' to 'ClientLeads'
        }

        // DELETE: api/clientlead/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLead(int id)
        {
            var lead = await _context.ClientLead.FindAsync(id); // Changed 'ClientLead' to 'ClientLeads'
            if (lead == null)
            {
                return NotFound();
            }

            _context.ClientLead.Remove(lead); // Changed 'ClientLead' to 'ClientLeads'
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool LeadExists(int id)
        {
            return _context.ClientLead.Any(e => e.Id == id); // Changed 'ClientLead' to 'ClientLeads'
        }
    }
}
