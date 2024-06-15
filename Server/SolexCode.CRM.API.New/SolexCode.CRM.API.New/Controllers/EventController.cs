using SolexCode.CRM.API.New.Models;
using SolexCode.CRM.API.New.DTOs;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using SolexCode.CRM.API.New.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SolexCode.CRM.API.New.Controllers;
using Org.BouncyCastle.Cms;

namespace CRM3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public EventController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Event
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Events>>> GetEvents()
        {
            return await _context.Events.ToListAsync();
        }

        // GET: api/Event/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Events>> GetEvent(int id)
        {
            var ev = await _context.Events.FindAsync(id);

            if (ev == null)
            {
                return NotFound();
            }

            return ev;
        }


        // POST: api/Event
        [HttpPost]
        public async Task<ActionResult<Events>> CreateEvent(EventsDto ev)
        {
            var eventToCreate = new Events
            {
                EventName = ev.EventName,
                Date = ev.Date,
                Time = ev.Time,
                Venue = ev.Venue,
                Host = ev.Host,
                RepeatUntilDate = ev.RepeatUntilDate,
                RepeatUntilTime = ev.RepeatUntilTime,
                ReminderDate = ev.ReminderDate,
                ReminderTime = ev.ReminderTime,
                DateAdded = ev.DateAdded,
                DateModified = DateTime.Now,
                IsSendViaEmail = ev.IsSendViaEmail,
                Description = ev.Description,
                IsImportant = ev.IsImportant
            };

            _context.Events.Add(eventToCreate);
            await _context.SaveChangesAsync();

            var emails = ev.Participants.Select(p => p.Email).ToList();
            var recipients = await _context.Users.Where(p => emails.Contains(p.Email)).ToListAsync();

            foreach (var recipient in recipients)
            {
                var participantToCreate = new Participant
                {
                    EventId = eventToCreate.Id,
                    UserId = recipient.Id
                };
                _context.Participant.Add(participantToCreate);

                // Send email to participant
                var subject = "Invitation to Event: " + ev.EventName;
                var body = $"Dear {recipient.FullName},\n\nYou have been invited to attend the event '{ev.EventName}' on {ev.Date} at {ev.Time} at {ev.Venue}.\n\nRegards,\nSolexCode";


                await new EmailController(_context).SendEmail(subject, body, new string[] { recipient.Email }, new List<IFormFile>());
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvent), new { id = eventToCreate.Id }, ev);
        }



        // PUT: api/Event/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, EventsDto evDto)
        {
            if (id != evDto.Id)
            {
                return BadRequest();
            }

            var ev = await _context.Events.FindAsync(id);

            if (ev == null)
            {
                return NotFound();
            }

            ev.EventName = evDto.EventName;
            ev.Date = evDto.Date;
            ev.Time = evDto.Time;
            ev.Venue = evDto.Venue;
            ev.Host = evDto.Host;
            ev.RepeatUntilDate = evDto.RepeatUntilDate;
            ev.RepeatUntilTime = evDto.RepeatUntilTime;
            ev.ReminderDate = evDto.ReminderDate;
            ev.ReminderTime = evDto.ReminderTime;
            ev.IsSendViaEmail = evDto.IsSendViaEmail;
            ev.Description = evDto.Description;
            ev.IsImportant = evDto.IsImportant;
            ev.DateModified = DateTime.Now;

            _context.Entry(ev).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
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


        // DELETE: api/Event/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var ev = await _context.Events.FindAsync(id);
            if (ev == null)
            {
                return NotFound();
            }

            // Remove associated participants
            var participants = _context.Participant.Where(p => p.EventId == id);
            _context.Participant.RemoveRange(participants);

            // Remove the event
            _context.Events.Remove(ev);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Event/Suggestions/{input}
        [HttpGet("Suggestions/{input}")]
        public async Task<ActionResult<IEnumerable<User>>> GetSuggestions(string input)
        {
            var matchingUsers = await _context.Users
                                        .Where(u => u.FullName.StartsWith(input))
                                        .Select(u => new { u.FullName, u.Email })
                                        .ToListAsync();

            return Ok(matchingUsers);
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.Id == id);
        }
    }
}
