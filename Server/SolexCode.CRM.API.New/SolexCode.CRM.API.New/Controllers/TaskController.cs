using SolexCode.CRM.API.New.Data;
using SolexCode.CRM.API.New.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using SolexCode.CRM.API.New.DTOs;
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
//using SolexCode.CRM.API.New.Hub;

namespace SolexCode.CRM.API.New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly DatabaseContext _context;
       // private readonly IHttpContextAccessor _httpContextAccessor;
        //private readonly IHubContext<NotificationHub> _hubContext;

        public TaskController(DatabaseContext context)
        {
            _context = context;
            //_httpContextAccessor = httpContextAccessor;
          //  _hubContext = hubContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<SolexCode.CRM.API.New.Models.Task>> GetTasks()
        {
            return _context.Task.ToList();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            var taskDto = await _context.Task.FindAsync(id);

            if (taskDto == null)
            {
                return NotFound();
            }

            return Ok(taskDto);
        }

       /* [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask(TaskDto taskDto)
        {
            if (taskDto == null)
            {
                return BadRequest("TaskDto is null");
            }

            // Validate the taskDto if needed
            if (string.IsNullOrWhiteSpace(taskDto.TaskName))
            {
                return BadRequest("Task name is required");
            }

            var task = new SolexCode.CRM.API.New.Models.Task
            {
                TaskName = taskDto.TaskName,
                TaskDescription = taskDto.TaskDescription,
                Status = taskDto.Status,
                DueDate = taskDto.DueDate,
                ReminderDate = taskDto.ReminderDate,
                ReminderTime = taskDto.ReminderTime,
                Priority = taskDto.Priority,
                DateAdded = taskDto.DateAdded,
                DateModified = DateTime.Now,
                CreatedById = taskDto.CreatedById,
                CreatedByName = taskDto.CreatedByName,
                CreatedByEmail = taskDto.CreatedByEmail,
            };

            _context.Task.Add(task);
            await _context.SaveChangesAsync();

            // Update the DTO with the generated ID and other properties
            taskDto.Id = task.Id;
            taskDto.DateAdded = task.DateAdded;
            taskDto.DateModified = task.DateModified;

            // Inside CreateTask method
            DateTime NotificationDateTime = taskDto.DueDate.AddDays(-2); // Two days before due date
            string userId = taskDto.CreatedById.ToString(); // Convert CreatedById to string

            // Call SignalR hub to send reminder
           // await _hubContext.Clients.User(userId).SendAsync("ReceiveTaskReminder", "Don't forget about your task!");

            return CreatedAtAction(nameof(GetTask), new { id = taskDto.Id }, taskDto);
        }*/







        [HttpPost("CreateTaskForLead/{leadId}")]
        public async Task<ActionResult<SolexCode.CRM.API.New.Models.Task>> CreateTaskForLead(int leadId, [FromBody] TaskDto taskDto)
        {
            if (taskDto == null)
            {
                return BadRequest("Task data is required");
            }

            var lead = _context.Lead.FirstOrDefault(l => l.Id == leadId);
            if (lead == null)
            {
                return BadRequest("Invalid lead ID");
            }

            // Map TaskDto to Task entity
            var task = new SolexCode.CRM.API.New.Models.Task
            {
                TaskName = taskDto.TaskName,
                TaskDescription = taskDto.TaskDescription,
                Status = taskDto.Status,
                DueDate = taskDto.DueDate,
                ReminderDate = taskDto.ReminderDate,
                ReminderTime = taskDto.ReminderTime,
                Priority = taskDto.Priority,
                LeadId = leadId, // Associate the task with the specified lead

                DateAdded = DateTime.UtcNow,
                DateModified = DateTime.UtcNow,
                CreatedById = taskDto.CreatedById,
                CreatedByName = taskDto.CreatedByName,
                CreatedByEmail = taskDto.CreatedByEmail
            };

            // Add task to the context and save changes
            try
            {
                _context.Task.Add(task);
                await _context.SaveChangesAsync();

                // Update DTO with the generated ID
                taskDto.Id = task.Id;

                return CreatedAtAction(nameof(GetTask), new { id = taskDto.Id }, taskDto);
            }
            catch (Exception ex)
            {
                // Log the exception (not shown here) and return a generic error message
                return StatusCode(500, "An error occurred while creating the task");
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskDto taskDto)
        {
            if (id != taskDto.Id)
            {
                return BadRequest();
            }

            var existingTask = await _context.Task.FindAsync(id);
            if (existingTask == null)
            {
                return NotFound();
            }

            // Update the existing task with values from taskDto
            existingTask.TaskName = taskDto.TaskName;
            existingTask.TaskDescription = taskDto.TaskDescription;
            existingTask.Status = taskDto.Status;
            existingTask.DueDate = taskDto.DueDate;
            existingTask.ReminderDate = taskDto.ReminderDate;
            existingTask.ReminderTime = taskDto.ReminderTime;
            existingTask.Priority = taskDto.Priority;
            existingTask.DateModified = DateTime.UtcNow;

            // Optionally update taskDto with the modified date
            taskDto.DateModified = existingTask.DateModified;

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
