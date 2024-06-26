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
using SolexCode.CRM.API.New.Dtos;
//using SolexCode.CRM.API.New.Hub;

namespace SolexCode.CRM.API.New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TaskController(DatabaseContext context)
        {
            _context = context;

        }

        // GET: api/Task
        [HttpGet]
        public ActionResult<IEnumerable<TaskDto>> GetTasks()
        {
            var tasks = _context.NewTasks.Select(t => new TaskDto
            {
                Id = t.Id,
                DateAdded = t.DateAdded,
                DateModified = t.DateModified,
                TaskName = t.TaskName,
                TaskDescription = t.TaskDescription,
                Status = t.Status,
                DueDate = t.DueDate,
                LeadName = t.LeadName,
                ReminderDate = t.ReminderDate,
                ReminderTime = t.ReminderTime,
                Priority = t.Priority,
                CreatedByName = t.CreatedByName,
                CreatedByEmail = t.CreatedByEmail,
                CreatedById = t.CreatedById,
                NewLeadId = t.NewLeadId
            }).ToList();

            return Ok(tasks);
        }

        // GET: api/Task/{id}
        [HttpGet("{id}")]
        public ActionResult<TaskDto> GetTask(int id)
        {
            var task = _context.NewTasks
                .Where(t => t.Id == id)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    DateAdded = t.DateAdded,
                    DateModified = t.DateModified,
                    TaskName = t.TaskName,
                    TaskDescription = t.TaskDescription,
                    Status = t.Status,
                    DueDate = t.DueDate,
                    LeadName = t.LeadName,
                    ReminderDate = t.ReminderDate,
                    ReminderTime = t.ReminderTime,
                    Priority = t.Priority,
                    CreatedByName = t.CreatedByName,
                    CreatedByEmail = t.CreatedByEmail,
                    CreatedById = t.CreatedById,
                    NewLeadId = t.NewLeadId
                })
                .FirstOrDefault();

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        // POST: api/Task
        [HttpPost]
        public ActionResult<TaskDto> CreateTask(CreateTaskDto createTaskDto)
        {
            var task = new NewTask
            {
                TaskName = createTaskDto.TaskName,
                TaskDescription = createTaskDto.TaskDescription,
                Status = createTaskDto.Status,
                DueDate = createTaskDto.DueDate,
                LeadName = createTaskDto.LeadName,
                ReminderDate = createTaskDto.ReminderDate,
                ReminderTime = createTaskDto.ReminderTime,
                Priority = createTaskDto.Priority,
                CreatedByName = createTaskDto.CreatedByName,
                CreatedByEmail = createTaskDto.CreatedByEmail,
                CreatedById = createTaskDto.CreatedById,
                NewLeadId = createTaskDto.NewLeadId,
                DateAdded = DateTime.Now,
                DateModified = DateTime.Now
            };

            _context.NewTasks.Add(task);
            _context.SaveChanges();

            var taskDto = new TaskDto
            {
                Id = task.Id,
                DateAdded = task.DateAdded,
                DateModified = task.DateModified,
                TaskName = task.TaskName,
                TaskDescription = task.TaskDescription,
                Status = task.Status,
                DueDate = task.DueDate,
                LeadName = task.LeadName,
                ReminderDate = task.ReminderDate,
                ReminderTime = task.ReminderTime,
                Priority = task.Priority,
                CreatedByName = task.CreatedByName,
                CreatedByEmail = task.CreatedByEmail,
                CreatedById = task.CreatedById,
                NewLeadId = task.NewLeadId
            };

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, taskDto);
        }

        // PUT: api/Task/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, UpdateTaskDto updateTaskDto)
        {
            var task = _context.NewTasks.Find(id);

            if (task == null)
            {
                return NotFound();
            }

            if (updateTaskDto.TaskName != null)
            {
                task.TaskName = updateTaskDto.TaskName;
            }
            if (updateTaskDto.TaskDescription != null)
            {
                task.TaskDescription = updateTaskDto.TaskDescription;
            }
            if (updateTaskDto.Status != null)
            {
                task.Status = updateTaskDto.Status;
            }
            if (updateTaskDto.DueDate != null)
            {
                task.DueDate = (DateTime)updateTaskDto.DueDate;
            }
            if (updateTaskDto.LeadName != null)
            {
                task.LeadName = updateTaskDto.LeadName;
            }
            if (updateTaskDto.ReminderDate != null)
            {
                task.ReminderDate = updateTaskDto.ReminderDate;
            }
            if (updateTaskDto.ReminderTime != null)
            {
                task.ReminderTime = updateTaskDto.ReminderTime;
            }
            if (updateTaskDto.Priority != null)
            {
                task.Priority = (bool)updateTaskDto.Priority;
            }

            task.DateModified = DateTime.Now;

            _context.NewTasks.Update(task);
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Task/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _context.NewTasks.Find(id);

            if (task == null)
            {
                return NotFound();
            }

            _context.NewTasks.Remove(task);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
