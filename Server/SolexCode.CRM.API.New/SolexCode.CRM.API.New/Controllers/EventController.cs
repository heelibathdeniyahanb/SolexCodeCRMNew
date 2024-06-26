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

        // GET: api/Event/UsersWithEventId/{eventId}
        [HttpGet("UsersWithEventId/{eventId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetUsersWithEventId(int eventId)
        {
            var usersWithEventId = await _context.Users
                                            .Join(_context.Participant,
                                                  user => user.Id,
                                                  participant => participant.UserId,
                                                  (user, participant) => new
                                                  {
                                                      user.FullName,
                                                      user.Email,
                                                      participant.EventId
                                                  })
                                            .Where(up => up.EventId == eventId)
                                            .ToListAsync();

            return Ok(usersWithEventId);
        }


        // GET: api/Event/EventsWithParticipants
        [HttpGet("EventsWithParticipants")]
        public async Task<ActionResult<IEnumerable<object>>> GetEventsWithParticipants()
        {
            var eventsWithParticipants = await _context.Events
                                                .SelectMany(ev => _context.Participant
                                                    .Where(p => p.EventId == ev.Id)
                                                    .Select(p => new
                                                    {
                                                        Event = ev,
                                                        ParticipantFullName = p.User.FullName,
                                                        ParticipantEmail = p.User.Email
                                                    }))
                                                .ToListAsync();

            return Ok(eventsWithParticipants);
        }

        // GET: api/Event/EventsByUserId/{userId}
        [HttpGet("EventsByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Events>>> GetEventsByUserId(int userId)
        {
            var events = await _context.Events
                .Where(e => e.Participants.Any(p => p.UserId == userId))
                .ToListAsync();

            if (events == null || events.Count == 0)
            {
                return NotFound("No events found for the specified user.");
            }

            return Ok(events);
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
                CreatedByEmail = ev.CreatedByEmail,
                CreatedById = ev.CreatedById,
                CreatedByName = ev.CreatedByName,

                ReminderDate = ev.ReminderDate,
                ReminderTime = ev.ReminderTime,
                DateAdded = ev.DateAdded,
                DateModified = DateTime.Now,
                IsSendViaEmail = ev.IsSendViaEmail,
                Description = ev.Description,
                IsImportant = ev.IsImportant,
                NewLeadId = ev.NewLeadId

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

            var ev = await _context.Events
                .Include(e => e.Participants)
                .ThenInclude(p => p.User)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (ev == null)
            {
                return NotFound();
            }

            // Update event details
            ev.EventName = evDto.EventName;
            ev.Date = evDto.Date;
            ev.Time = evDto.Time;
            ev.Venue = evDto.Venue;
            ev.CreatedByName = evDto.CreatedByName;
            ev.CreatedByEmail = evDto.CreatedByEmail;
            ev.CreatedById = evDto.CreatedById;
            ev.ReminderDate = evDto.ReminderDate;
            ev.ReminderTime = evDto.ReminderTime;
            ev.IsSendViaEmail = evDto.IsSendViaEmail;
            ev.Description = evDto.Description;
            ev.IsImportant = evDto.IsImportant;
            ev.DateModified = DateTime.Now;

            // Update participants
            var currentParticipants = ev.Participants.ToList();
            var newParticipantEmails = evDto.Participants.Select(p => p.Email).ToList();
            var currentParticipantEmails = currentParticipants.Select(p => p.User.Email).ToList();

            // Remove participants no longer in the new list
            var participantsToRemove = currentParticipants
                .Where(p => !newParticipantEmails.Contains(p.User.Email))
                .ToList();
            _context.Participant.RemoveRange(participantsToRemove);

            // Add new participants
            var participantsToAdd = evDto.Participants
                .Where(p => !currentParticipantEmails.Contains(p.Email))
                .Select(p => new Participant
                {
                    EventId = ev.Id,
                    UserId = _context.Users.FirstOrDefault(u => u.Email == p.Email).Id
                })
                .ToList();
            _context.Participant.AddRange(participantsToAdd);

            // Send emails to new participants
            foreach (var participant in participantsToAdd)
            {
                var user = await _context.Users.FindAsync(participant.UserId);
                if (user != null)
                {
                    var subject = "Invitation to Event: " + evDto.EventName;
                    var body = $"Dear {user.FullName},\n\nYou have been invited to attend the event '{evDto.EventName}' on {evDto.Date} at {evDto.Time} at {evDto.Venue}.\n\nRegards,\nSolexCode";
                    await new EmailController(_context).SendEmail(subject, body, new string[] { user.Email }, new List<IFormFile>());
                }
            }

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

        /*  [HttpPost("lead /{NewLeadId}")]
          public async Task<IActionResult> CreateEventsForLead(int NewLeadId, [FromBody] EventsDto eventsDto)
          {
              // Validate that the NewLeadId from the route matches the one in the body
              if (eventsDto.NewLeadId != NewLeadId)
              {
                  return BadRequest("Lead ID mismatch.");
              }

              // Find the lead to associate the task with
              var lead = await _context.NewLeads.FirstOrDefaultAsync(l => l.Id == NewLeadId);
              if (lead == null)
              {
                  return BadRequest("Invalid lead ID");
              }

              var eventToCreate = new Events
              {
                  EventName = eventsDto.EventName,
                  Date = eventsDto.Date,
                  Time = eventsDto.Time,
                  Venue = eventsDto.Venue,
                CreatedByName = eventsDto.CreatedByName,
                CreatedById = eventsDto.CreatedById,
                 CreatedByEmail = eventsDto.CreatedByEmail,
                  ReminderDate = eventsDto.ReminderDate,
                  ReminderTime = eventsDto.ReminderTime,
                  DateAdded = eventsDto.DateAdded,
                  DateModified = DateTime.Now,
                  IsSendViaEmail = eventsDto.IsSendViaEmail,
                  Description = eventsDto.Description,
                  IsImportant = eventsDto.IsImportant,
                   NewLeadId = NewLeadId
              };

              _context.Events.Add(eventToCreate);
              await _context.SaveChangesAsync();

              var emails = eventsDto.Participants.Select(p => p.Email).ToList();
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
                  var subject = "Invitation to Event: " + eventsDto.EventName;
                  var body = $"Dear {recipient.FullName},\n\nYou have been invited to attend the event '{eventsDto.EventName}' on {eventsDto.Date} at {eventsDto.Time} at {eventsDto.Venue}.\n\nRegards,\nSolexCode";


                  await new EmailController(_context).SendEmail(subject, body, new string[] { recipient.Email }, new List<IFormFile>());
              }

              await _context.SaveChangesAsync();

              return CreatedAtAction(nameof(GetEvent), new { id = eventToCreate.Id }, eventsDto);
          }*/
    }
}
