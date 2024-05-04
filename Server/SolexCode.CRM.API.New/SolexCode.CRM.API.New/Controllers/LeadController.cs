using SolexCode.CRM.API.New.Data;
using SolexCode.CRM.API.New.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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


        // Controller
        [HttpPost("/api/leads")]
        public async Task<IActionResult> CreateLead([FromBody] Lead leadFormData)
        {
            _context.Lead.Add(leadFormData);
            _context.SaveChanges();
             return Ok();
        }


        [HttpGet]
        public ActionResult<IEnumerable<Models.Lead>> GetLead()
        {
            return _context.Lead.ToList();
        }



        [HttpPost]
        public async Task<ActionResult<Models.Lead>> CreateTask(Models.Lead lead)
        {
            _context.Lead.Add(lead);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLead), new { id = lead.Id }, lead);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Lead.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Lead.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }


}
