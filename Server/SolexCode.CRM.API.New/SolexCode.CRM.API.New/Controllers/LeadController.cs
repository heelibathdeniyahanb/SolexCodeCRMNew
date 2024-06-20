using SolexCode.CRM.API.New.Data;
using SolexCode.CRM.API.New.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SolexCode.CRM.API.New.Dtos;

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
        public async Task<ActionResult<NewLead>> CreateLead([FromBody] LeadDto leadFormData)
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

            
            await _context.SaveChangesAsync();

            var lead = new NewLead
            {
                LeadName = leadFormData.LeadName,
                CompanyName = leadFormData.CompanyName,
                StartDate = leadFormData.StartDate,
                EndDate = leadFormData.EndDate,
                SalesPipeline = leadFormData.SalesPipeline,
                LeadStatus = leadFormData.LeadStatus,
               
                SalesRep = leadManager.FullName
            };

            _context.NewLeads.Add(lead);
            await _context.SaveChangesAsync();

            await _emailController.SendLeadAssignmentEmail(leadManager.Email, lead);

            var notificationData = new LeadCreatedNotificationDto
            {
                LeadName = lead.LeadName,
                EndDate = lead.EndDate,
                LeadManagerName = leadManager.FullName,
                LeadManagerEmail = leadManager.Email
            };

            

            return CreatedAtAction(nameof(GetLeadById), new { id = lead.Id }, lead);
        }

        [HttpGet("manager/{leadManagerId}")]
        public async Task<ActionResult<IEnumerable<NewLead>>> GetLeadsByManager(string leadManagerId)
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

            var leads = await _context.NewLeads
                .Where(l => l.SalesRep == leadManager.FullName)
                .ToListAsync();

            return Ok(leads);
        }

        // GET: api/lead
        [HttpGet]
        public ActionResult<IEnumerable<NewLead>> GetLead()
        {
            return _context.NewLeads.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NewLead>> GetLeadById(int id)
        {
            var lead = await _context.NewLeads.FindAsync(id);

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
            var lead = await _context.NewLeads.FindAsync(id);
            if (lead == null)
            {
                return NotFound();
            }

            _context.NewLeads.Remove(lead);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/lead/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLead(int id, NewLead lead)
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
            return _context.NewLeads.Any(e => e.Id == id);
        }

        [HttpPut("UpdatePipeline/{id}/{pipelineName}")]
        public async Task<IActionResult> UpdatePipeline(int id, string pipelineName)
        {
            var lead = await _context.NewLeads.FindAsync(id);
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

            var sortedManager = leadManagers
                .OrderBy(m => _context.NewLeads.Count(l => l.SalesRep == m.FullName && l.EndDate >= DateOnly.FromDateTime(DateTime.Now)))
                .ThenByDescending(m => m.DateAdded)
                .FirstOrDefault();

            return sortedManager;
        }
    }
}
