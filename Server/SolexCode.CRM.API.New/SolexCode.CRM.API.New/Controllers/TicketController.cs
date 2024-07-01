using Microsoft.AspNetCore.Mvc;
using SolexCode.CRM.API.New.Models;
using SolexCode.CRM.API.New.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using SolexCode.CRM.API.New.Dto;
using System.IO;
using System;
using System.Net.Sockets;

namespace SolexCode.CRM.API.New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TicketsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/tickets
        [HttpGet]
        public ActionResult<IEnumerable<Ticket>> GetTickets()
        {
            try
            {
                var tickets = _context.Ticket.ToArray();

              

                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return StatusCode(400, $"Internal server error: {ex}");
            }
        }

        // GET: api/tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Ticket.Include(t => t.Attachments).FirstOrDefaultAsync(t => t.TicketId == id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // POST: api/tickets
        // POST: api/tickets
        // POST: api/tickets
        [HttpPost]
        public async Task<IActionResult> PostTicket([FromForm] TicketRequestDto ticketRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customerSupporter = await AssignCustomerSupporter();
            if (customerSupporter == null)
            {
                return BadRequest("No eligible customer supporter found.");
            }

            var ticket = new Ticket
            {
                TicketName = ticketRequest.TicketName,
                Tracker = ticketRequest.Tracker,
                Email = ticketRequest.Email,
                ContactNo = ticketRequest.ContactNo,
                Description = ticketRequest.Description,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                CustomerSupporterId = customerSupporter.Id, // Assuming CustomerSupporterId is the foreign key
                CustomerSupporterName = customerSupporter.FullName // Replace with actual property in Ticket model
            };

            _context.Ticket.Add(ticket);
            await _context.SaveChangesAsync();

            if (ticketRequest.Attachments != null && ticketRequest.Attachments.Any())
            {
                foreach (var formFile in ticketRequest.Attachments)
                {
                    if (formFile.Length > 0)
                    {
                        using var memoryStream = new MemoryStream();
                        await formFile.CopyToAsync(memoryStream);

                        var attachment = new TicketAttachment
                        {
                            TicketId = ticket.TicketId,
                            FileName = formFile.FileName,
                            ContentType = formFile.ContentType,
                            FileData = memoryStream.ToArray()
                        };

                        _context.TicketAttachment.Add(attachment);
                    }
                }
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(GetTicket), new { id = ticket.TicketId }, ticket);
        }

        private async Task<User> AssignCustomerSupporter()
        {
            var customerSupporters = await _context.Users
                .Where(u => u.Role == "CustomerSupporter")
                .ToListAsync();


            var selectedSupporter = customerSupporters
       .OrderBy(cs => _context.Ticket.Count(t => t.CustomerSupporterId == cs.Id))
       .ThenBy(cs => cs.DateAdded)
       .FirstOrDefault();

            return selectedSupporter;
        }



        //// PUT: api/tickets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket([FromRoute] int id, [FromForm] TicketRequestDto ticketRequest)
        {

            var ticket = await _context.Ticket.Include(t => t.Attachments).FirstOrDefaultAsync(t => t.TicketId == id);
            if (ticket == null)
            {
                return NotFound();
            }

            ticket.TicketName = ticketRequest.TicketName;
            ticket.Email = ticketRequest.Email;
            ticket.ContactNo = ticketRequest.ContactNo;
            ticket.Description = ticketRequest.Description;
            ticket.Tracker = ticketRequest.Tracker;
            ticket.UpdatedDate = DateTime.Now;
            ticket.CustomerSupporterName = ticketRequest.CustomerSupporterName;

            _context.Entry(ticket).State = EntityState.Modified;

            if (ticketRequest.Attachments != null && ticketRequest.Attachments.Count > 0)
            {
                // Remove attachments that are not in the updated request
                var existingAttachmentIds = ticket.Attachments.Select(a => a.AttachmentId).ToList();
                foreach (var existingAttachmentId in existingAttachmentIds)
                {
                    if (!ticketRequest.Attachments.Any(a => a.FileName == ticket.Attachments.First(ea => ea.AttachmentId == existingAttachmentId).FileName))
                    {
                        var attachmentToRemove = ticket.Attachments.FirstOrDefault(a => a.AttachmentId == existingAttachmentId);
                        _context.TicketAttachment.Remove(attachmentToRemove);
                    }
                }

                // Add or update the attachments
                foreach (var file in ticketRequest.Attachments)
                {
                    if (file.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await file.CopyToAsync(memoryStream);
                            var existingAttachment = ticket.Attachments.FirstOrDefault(a => a.FileName == file.FileName);
                            if (existingAttachment != null)
                            {
                                existingAttachment.FileData = memoryStream.ToArray();
                                _context.Entry(existingAttachment).State = EntityState.Modified;
                            }
                            else
                            {
                                var newAttachment = new TicketAttachment
                                {
                                    TicketId = ticket.TicketId,
                                    FileName = file.FileName,
                                    FileData = memoryStream.ToArray()
                                };
                                _context.TicketAttachment.Add(newAttachment);
                            }
                        }
                    }
                }
            }
            else
            {
                // Remove all attachments if none are provided in the request
                _context.TicketAttachment.RemoveRange(ticket.Attachments);
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
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

        // DELETE: api/tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Ticket.Include(t => t.Attachments).FirstOrDefaultAsync(t => t.TicketId == id);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Ticket.Remove(ticket);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool TicketExists(int id)
        {
            return _context.Ticket.Any(e => e.TicketId == id);
        }
    }
}
