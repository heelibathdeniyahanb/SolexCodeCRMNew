using SolexCode.CRM.API.New.Data;
using SolexCode.CRM.API.New.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SolexCode.CRM.API.New.Dtos;
using Microsoft.Extensions.Logging;

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

            // Retrieve User details based on UserEmail
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == leadFormData.UserEmail);
            if (user == null)
            {
                return BadRequest($"User with email '{leadFormData.UserEmail}' not found.");
            }

            var lead = new NewLead
            {
                LeadName = leadFormData.LeadName,
                CompanyName = leadFormData.CompanyName,
                StartDate = leadFormData.StartDate,
                EndDate = leadFormData.EndDate,
                SalesPipeline = leadFormData.SalesPipeline,
                LeadStatus = leadFormData.LeadStatus,
                SalesRep = leadManager.FullName,
                UserId = user.Id,
                UserFullName = leadFormData.UserFullName,
                UserEmail = leadFormData.UserEmail,
                LeadManagerId = leadManager.Id
            };

            _context.NewLeads.Add(lead);
            await _context.SaveChangesAsync();

            // Assuming SendLeadAssignmentEmail is a method in _emailController to send an email
            await _emailController.SendLeadAssignmentEmail(leadManager.Email, leadFormData);

            var notificationData = new LeadCreatedNotificationDto
            {

                LeadName = lead.LeadName,
                EndDate = lead.EndDate,
                LeadManagerName = leadManager.FullName,
                LeadManagerEmail = leadManager.Email,

                // Add other relevant data for notification if needed
            };

            await _emailController.SendLeadCreatedNotification(leadFormData.UserEmail, notificationData);



            // Return 201 Created response with the newly created lead data
            return CreatedAtAction(nameof(GetLeadById), new { id = lead.Id }, lead);
        }


        [HttpGet("manager/{leadManagerId}")]
        public async Task<ActionResult<IEnumerable<GetLeadByLeadManagerDto>>> GetLeadsByManager(string leadManagerId)
        {
            if (!int.TryParse(leadManagerId, out int leadManagerIdInt))
            {
                return BadRequest("Invalid lead manager ID.");
            }

            var leadManager = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == leadManagerIdInt && u.Role == "LeadManager");

            if (leadManager == null)
            {
                return NotFound("Lead Manager not found.");
            }

            var leads = await _context.NewLeads
                .Where(l => l.LeadManagerId == leadManagerIdInt)
                .Join(
                    _context.Users,
                    lead => lead.UserId,
                    user => user.Id,
                    (lead, user) => new GetLeadByLeadManagerDto
                    {
                        LeadId = lead.Id,
                        LeadName = lead.LeadName,
                        CompanyName = lead.CompanyName,
                        StartDate = lead.StartDate.ToDateTime(TimeOnly.MinValue), // Explicit conversion from DateOnly to DateTime
                        EndDate = lead.EndDate.ToDateTime(TimeOnly.MinValue), // Explicit conversion from DateOnly to DateTime
                        SalesPipeline = lead.SalesPipeline,
                        LeadStatus = lead.LeadStatus,
                        SalesRep = lead.SalesRep,
                        LeadManagerId = lead.LeadManagerId,
                        UserId = lead.UserId,
                        UserFullName = user.FullName,
                        UserEmail = user.Email
                    }
                )
                .ToListAsync();

            if (leads == null || leads.Count == 0)
            {
                return NotFound("No leads found for the specified lead manager.");
            }

            return Ok(leads);
        }



        [HttpGet("events/manager/{leadManagerId}")]
        public async Task<ActionResult<IEnumerable<Events>>> GetEventsByLeadManager(int leadManagerId)
        {
            // Check if the lead manager exists
            var leadManager = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == leadManagerId && u.Role == "LeadManager");

            if (leadManager == null)
            {
                return NotFound("Lead Manager not found.");
            }

            // Query to fetch events associated with the lead manager
            var events = await _context.Events
                .Where(e => _context.NewLeads.Any(l => l.Id == e.NewLeadId && l.LeadManagerId == leadManagerId))
                .ToListAsync();

            if (events == null || events.Count == 0)
            {
                return NotFound("No events found for the specified lead manager.");
            }

            return Ok(events);
        }





        // GET: api/lead
        [HttpGet]
        public ActionResult<IEnumerable<NewLead>> GetLead()
        {
            try
            {
                // Fetch all leads and project into a new list ensuring null handling
                var leads = _context.NewLeads
                    .Select(lead => new
                    {
                        Id = lead.Id,
                        LeadName = lead.LeadName,
                        CompanyName = lead.CompanyName,
                        StartDate = lead.StartDate,
                        EndDate = lead.EndDate,
                        SalesPipeline = lead.SalesPipeline,
                        LeadStatus = lead.LeadStatus,
                        SalesRep = lead.SalesRep,
                        LeadManagerId = lead.LeadManagerId,
                        UserId = lead.UserId,
                        UserFullName = lead.User.FullName,
                        UserEmail = lead.User.Email
                    })
                    .ToList();

                return Ok(leads);
            }
            catch (Exception ex)
            {
                // Log the error (you can use your logging mechanism here)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<NewLeadAndEventDto>> GetLeadById(int id)
        {
            var lead = await _context.NewLeads.FindAsync(id);

            if (lead == null)
            {
                return NotFound("Lead not found for the provided ID.");
            }

            var events = await _context.Events
                .Where(e => e.NewLeadId == id)
                .ToListAsync();

            var leadDto = new NewLeadAndEventDto
            {
                NewLead = lead,
                Events = events
            };

            return Ok(leadDto);
        }

        // GET: api/NewLead/user/2
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<NewLead>>> GetLeadsByUserId(int userId)
        {
            var leads = await _context.NewLeads
                                      .Where(nl => nl.UserId == userId)
                                      .ToListAsync();

            if (leads == null || !leads.Any())
            {
                return NotFound();
            }

            return Ok(leads);
        }
        // DELETE: api/lead/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLead(int id)
        {
            var leadToDelete = await _context.NewLeads.Include(lead => lead.Events)
                                                     .SingleOrDefaultAsync(lead => lead.Id == id);

            if (leadToDelete == null)
            {
                return NotFound();
            }

            // Delete associated events
            _context.Events.RemoveRange(leadToDelete.Events);

            // Now delete the lead itself
            _context.NewLeads.Remove(leadToDelete);

            // Save changes
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/lead/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLead(int id, NewLead lead)
        {
            if (id != lead.Id)
            {
                return BadRequest("Mismatched id in request.");
            }

            // Check if the lead exists
            if (!LeadExists(id))
            {
                return NotFound();
            }

            // Check model state and validation errors
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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
