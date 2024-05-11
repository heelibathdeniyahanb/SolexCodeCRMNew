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
    public class TaskController(DatabaseContext context) : ControllerBase
    {
        private readonly DatabaseContext _context = context;


        [HttpGet]
        public ActionResult<IEnumerable<Models.Task>> GetUsers()
        {
            return _context.Task.ToList();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<SolexCode.CRM.API.New.Models.Task>> GetTask(int id) // Specify the fully qualified name
        {
            var task = await _context.Task.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }
        [HttpPost]
        public async Task<ActionResult<SolexCode.CRM.API.New.Models.Task>> CreateTask(SolexCode.CRM.API.New.Models.Task task)
        {
            task.DateAdded = DateTime.Now;
            task.DateModified = DateTime.Now;
            _context.Task.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, SolexCode.CRM.API.New.Models.Task task) // Specify the fully qualified name
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Task.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Task.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.Task.Any(e => e.Id == id);
        }
    }
}
