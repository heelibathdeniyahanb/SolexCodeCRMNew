
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
    public class LeadController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly EmailController _emailController;

        public LeadController(DatabaseContext context, EmailController emailController)
        {
            _context = context;
            _emailController = emailController;
        }

        // POST: api/lead
        [HttpPost]
        public async Task<ActionResult<Lead>> CreateLead([FromBody] Lead leadFormData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var leadManager = await AssignLeadManager();
            if (leadManager == null)
            {
                return BadRequest("No eligible lead manager found.");
            }

            leadFormData.SalesRep = leadManager.FullName;

            _context.Lead.Add(leadFormData);
            await _context.SaveChangesAsync();

            await _emailController.SendLeadAssignmentEmail(leadManager.Email, leadFormData);

            return CreatedAtAction(nameof(GetLeadById), new { id = leadFormData.Id }, leadFormData);
        }

        [HttpGet("manager/{leadManagerId}")]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadsByManager(string leadManagerId)
        {
            if (!int.TryParse(leadManagerId, out int leadManagerIdInt))
            {
                return BadRequest("Invalid lead manager ID.");
            }

            var leadManager = await _context.Users
                .Where(u => u.Id == leadManagerIdInt && u.Role == "LeadManager")
                .FirstOrDefaultAsync();

            if (leadManager == null)
            {
                return NotFound("Lead Manager not found.");
            }

            var leads = await _context.Lead
                .Where(l => l.SalesRep == leadManager.FullName)
                .ToListAsync();

            return Ok(leads);
        }
        // GET: api/lead
        [HttpGet]

        public ActionResult<IEnumerable<Models.Lead>> GetLead()
        {
            return _context.Lead.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lead>> GetLeadById(int id)
        {
            var lead = await _context.Lead.FindAsync(id);

            if (lead == null)
            {
                return NotFound();
            }

            return lead;
        }


        // DELETE: api/lead/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLead(int id)
        {
            var lead = await _context.Lead.FindAsync(id);
            if (lead == null)
            {
                return NotFound();
            }

            _context.Lead.Remove(lead);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/lead/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLead(int id, Lead lead)
        {
            if (id != lead.Id)
            {
                return BadRequest();
            }

            _context.Entry(lead).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool LeadExists(int id)
        {
            return _context.Lead.Any(e => e.Id == id);
        }

        [HttpPut("UpdatePipeline/{id}/{pipelineName}")]
        public async Task<IActionResult> UpdatePipeline(int id, string pipelineName)
        {
            var lead = await _context.Lead.FindAsync(id);
            if (lead == null)
            {
                return NotFound();
            }

            lead.SalesPipeline = pipelineName;
            _context.Entry(lead).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private async Task<User> AssignLeadManager()
        {
            var leadManagers = await _context.Users
                .Where(u => u.Role == "LeadManager")
                .ToListAsync();

            var sortedManagers = leadManagers
                .OrderBy(m => _context.Lead.Count(l => l.SalesRep == m.FullName && l.EndDate >= DateOnly.FromDateTime(DateTime.Now)))
                .ThenByDescending(m => m.DateAdded)
                .FirstOrDefault();

            return sortedManagers;
        }
    }
}

