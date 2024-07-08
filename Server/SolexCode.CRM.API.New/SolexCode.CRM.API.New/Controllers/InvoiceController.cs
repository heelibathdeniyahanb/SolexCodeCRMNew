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
    public class InvoiceController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public InvoiceController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Invoice
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices(int? userId = null)
        {
            IQueryable<Invoice> invoices = _context.Invoice;

            if (userId != null)
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null || user.Role != "LeadManager")
                {
                    return BadRequest("Invalid user or user is not a LeadManager");
                }
                invoices = invoices.Where(i => i.UserId == userId);
            }

            return await invoices.ToListAsync();
        }

        // GET: api/Invoice/All
        [HttpGet("All")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetAllInvoices()
        {
            return await _context.Invoice.ToListAsync();
        }

        // GET: api/Invoice/5?userId={userId}
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id, int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null || user.Role != "LeadManager")
            {
                return BadRequest("Invalid user or user is not a LeadManager");
            }

            var invoice = await _context.Invoice
                .FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        //Create Invoice
        [HttpPost("CreateInvoiceForLeadManager/{userId}")]
        public async Task<ActionResult<Invoice>> CreateInvoiceForLeadManager(int userId, [FromBody] InvoiceCreateDto invoiceDto)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);

                if (user == null || user.Role != "LeadManager")
                {
                    return BadRequest("Invalid user or user is not a LeadManager");
                }

                var invoice = new Invoice
                {
                    InvoiceNo = invoiceDto.InvoiceNo,
                    Date = invoiceDto.Date,
                    DueDate = invoiceDto.DueDate,
                    ClientName = invoiceDto.ClientName,
                    ClientEmail = invoiceDto.ClientEmail,
                    ClientCompany = invoiceDto.ClientCompany,
                    ClientPost = invoiceDto.ClientPost,
                    Subtotal = invoiceDto.Subtotal,
                    Discount = invoiceDto.Discount,
                    Total = invoiceDto.Total,
                    Pipeline = invoiceDto.Pipeline,
                    Description = invoiceDto.Description,
                    Price = invoiceDto.Price,
                    Quantity = invoiceDto.Quantity,
                    TotalPrice = invoiceDto.TotalPrice,
                    LastInvoiceNumber = invoiceDto.LastInvoiceNumber,
                    UserId = userId,
                    NewLeadId = invoiceDto.NewLeadId
                };

                _context.Invoice.Add(invoice);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetInvoice), new { id = invoice.Id, userId = invoice.UserId }, invoice);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

      
        // GET: api/Invoice/GetInvoicesByClientEmail/{email}
        [HttpGet("GetInvoicesByClientEmail/{email}")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoicesByClientEmail(string email)
        {
            try
            {
                var invoices = await _context.Invoice
                    .Where(i => i.ClientEmail == email)
                    .ToListAsync();

                if (invoices == null || invoices.Count == 0)
                {
                    return NotFound("No invoices found for the client.");
                }

                return Ok(invoices);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        // PUT: api/Invoice/5?userId={userId}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInvoice(int id, int userId, [FromBody] Invoice invoice)
        {
            if (id != invoice.Id || userId != invoice.UserId)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null || user.Role != "LeadManager")
            {
                return BadRequest("Invalid user or user is not a LeadManager");
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        private bool InvoiceExists(int id)
        {
            return _context.Invoice.Any(e => e.Id == id);
        }

        // DELETE: api/Invoice/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoice.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoice.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Invoice/GetByEmail
        [HttpGet("GetByEmail")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoicesByEmail(string clientEmail)
        {
            var invoices = await _context.Invoice
                .Where(i => i.ClientEmail == clientEmail)
                .ToListAsync();

            if (invoices == null || invoices.Count == 0)
            {
                return NotFound("No invoices found for the given client email.");
            }

            return invoices;
        }
    }
}