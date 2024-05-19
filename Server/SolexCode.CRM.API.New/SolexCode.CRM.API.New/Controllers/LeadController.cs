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

        public LeadController(DatabaseContext context)
        {
            _context = context;
        }

        // POST: api/lead
        [HttpPost]
        public async Task<ActionResult<Lead>> CreateLead([FromBody] Lead leadFormData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Lead.Add(leadFormData);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLeadById), new { id = leadFormData.Id }, leadFormData);
        }

        // GET: api/lead
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeads()
        {
            return await _context.Lead.ToListAsync();
        }

        // GET: api/lead/{id}
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
            return _context.Lead.Any(e => e.Id == id);
        }
    }
}
