using SolexCode.CRM.API.New.Data;
using SolexCode.CRM.API.New.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices(int? leadId = null)
        {
            IQueryable<Invoice> invoices = _context.Invoice;

            if (leadId != null)
            {
                invoices = invoices.Where(i => i.NewLeadId == leadId);
            }

            return await invoices.ToListAsync();
        }

        // GET: api/Invoice/All
        [HttpGet("All")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetAllInvoices()
        {
            return await _context.Invoice.ToListAsync();
        }

        // GET: api/Invoice/5?leadId={leadId}
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id, int leadId)
        {
            var invoice = await _context.Invoice
                .FirstOrDefaultAsync(i => i.Id == id && i.NewLeadId == leadId);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        // Create Invoice
        [HttpPost("CreateInvoiceForLead/{leadId}")]
        public async Task<ActionResult<Invoice>> CreateInvoiceForLead(int leadId, [FromBody] Invoice invoice, [FromQuery] string userEmail)
        {
            try
            {
                var lead = await _context.NewLeads.FindAsync(leadId);
                if (lead == null)
                {
                    return NotFound("Lead not found.");
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                invoice.NewLeadId = leadId;
                invoice.UserId = user.Id;

                _context.Invoice.Add(invoice);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetInvoice), new { id = invoice.Id, leadId = invoice.NewLeadId, userId = invoice.UserId }, invoice);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        // GET: api/Invoice/GetInvoicesByUserId/{userId}
        [HttpGet("GetInvoicesByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoicesByUserId(int userId)
        {
            try
            {
                var invoices = await _context.Invoice
                    .Where(i => i.UserId == userId)
                    .ToListAsync();

                if (invoices == null || invoices.Count == 0)
                {
                    return NotFound("No invoices found for the user.");
                }

                return Ok(invoices);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        // PUT: api/Invoice/5?leadId={leadId}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInvoice(int id, int leadId, [FromBody] Invoice invoice)
        {
            if (id != invoice.Id || leadId != invoice.NewLeadId)
            {
                return BadRequest();
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