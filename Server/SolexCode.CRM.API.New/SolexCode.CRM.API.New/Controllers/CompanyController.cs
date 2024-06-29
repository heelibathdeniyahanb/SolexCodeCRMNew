using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolexCode.CRM.API.New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly Data.DatabaseContext _context;

        public CompanyController(Data.DatabaseContext context)
        {
            _context = context;
        }

        // POST: api/company
        [HttpPost]
        public async Task<ActionResult<Models.Company>> CreateLead([FromBody] Models.Company leadFormData)
        {
            // Remove the Id property assignment if it's coming from the client
            leadFormData.Id = 0; // This will ensure that the database generates the Id

            _context.Company.Add(leadFormData);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // Log the error or handle it appropriately
                return BadRequest("Unable to save the lead. Please try again.");
            }

            return CreatedAtAction(nameof(GetLead), new { id = leadFormData.Id }, leadFormData);
        }

        // GET: api/company
        [HttpGet]
        public ActionResult<IEnumerable<Models.Company>> GetLead()
        {
            return _context.Company.ToList();
        }

        // GET: api/company/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Company>> GetLead(int id)
        {
            var lead = await _context.Company.FindAsync(id);

            if (lead == null)
            {
                return NotFound();
            }

            return lead;
        }

        // DELETE: api/company/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLead(int id)
        {
            var lead = await _context.Company.FindAsync(id);
            if (lead == null)
            {
                return NotFound();
            }

            _context.Company.Remove(lead);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LeadExists(int id)
        {
            return _context.Company.Any(e => e.Id == id);
        }
    }
}