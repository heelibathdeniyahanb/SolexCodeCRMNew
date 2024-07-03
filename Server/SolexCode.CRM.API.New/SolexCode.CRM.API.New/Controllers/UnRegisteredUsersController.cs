using Microsoft.AspNetCore.Mvc;
using SolexCode.CRM.API.New.Data;
using SolexCode.CRM.API.New.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace SolexCode.CRM.API.New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnRegisteredUsersController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public UnRegisteredUsersController(DatabaseContext context)
        {
            _context = context;
        }

        // POST: api/UnRegisteredUsers
        [HttpPost]
        public async Task<ActionResult<UnRegisteredUser>> PostUnRegisteredUser(UnRegisteredUser unRegisteredUser)
        {
            _context.UnRegisteredUsers.Add(unRegisteredUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUnRegisteredUser), new { id = unRegisteredUser.Id }, unRegisteredUser);
        }

        // GET: api/UnRegisteredUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnRegisteredUser>>> GetUnRegisteredUsers()
        {
            return await _context.UnRegisteredUsers.ToListAsync();
        }

        // GET: api/UnRegisteredUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UnRegisteredUser>> GetUnRegisteredUser(int id)
        {
            var unRegisteredUser = await _context.UnRegisteredUsers.FindAsync(id);

            if (unRegisteredUser == null)
            {
                return NotFound();
            }

            return unRegisteredUser;
        }
    }
}
