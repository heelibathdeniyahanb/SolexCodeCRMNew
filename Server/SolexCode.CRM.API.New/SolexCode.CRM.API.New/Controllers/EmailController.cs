using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MimeKit.Text;
using SolexCode.CRM.API.New.Data;
using SolexCode.CRM.API.New.Models;

namespace SolexCode.CRM.API.New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public EmailController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SendEmail([FromForm] string subject, [FromForm] string body, [FromForm] string[] recipients, [FromForm] List<IFormFile> attachments)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("crmitfac@gmail.com"));

            foreach (var recipient in recipients)
            {
                email.To.Add(MailboxAddress.Parse(recipient));
            }

            email.Subject = subject;
            var builder = new BodyBuilder { HtmlBody = body };
            var emailModel = new Email
            {
                From = "crmitfac@gmail.com",
                To = string.Join(",", recipients),
                Subject = subject,
                Body = body,
                SentDateTime = DateTime.Now,
                Attachments = new List<Attachment>()
            };

            foreach (var attachment in attachments)
            {
                using (var ms = new MemoryStream())
                {
                    await attachment.CopyToAsync(ms);
                    var fileBytes = ms.ToArray();
                    builder.Attachments.Add(attachment.FileName, fileBytes);
                    emailModel.Attachments.Add(new Attachment
                    {
                        FileName = attachment.FileName,
                        Content = fileBytes
                    });
                }
            }

            email.Body = builder.ToMessageBody();

            using var client = new SmtpClient();
            client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            client.Authenticate("crmitfac@gmail.com", "vswp acpu deyy vrhx"); // Consider using secure storage for credentials
            _context.Email.Add(emailModel);
            await _context.SaveChangesAsync();
            client.Send(email);
            client.Disconnect(true);

            return Ok();
        }

        [HttpPost]
        [Route("SendLoginDetails")]
        public async Task<IActionResult> SendLoginDetails([FromForm] string userEmail, [FromForm] string temporaryPassword)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null)
            {
                return NotFound();
            }

            var subject = "Your Login Details for SolexCode";
            var body = $"Hello {user.FullName},\n\nYour login details for SolexCode are as follows:\n\nUser Name: {user.Email}\nPassword: {temporaryPassword}\n\nPlease keep your login details secure.";

            await SendEmail(subject, body, new string[] { userEmail }, new List<IFormFile>());

            return Ok();
        }
        [HttpPost]
        [Route("ChangePasswordNotification")]
        public async Task<IActionResult> SendPasswordChangeNotification([FromForm] string email)
        {
            var subject = "Password Changed Successfully";
            var message = "Your password has been changed successfully. If you did not make this change, please contact support immediately.";

            // Assuming you have an email sending service configured
            await SendEmail(subject, message, new string[] { email }, new List<IFormFile>());

            return Ok();
        }

        [HttpPost]
        [Route("SendOtp")]
        public async System.Threading.Tasks.Task<IActionResult> SendOtp(string email, string otpCode)
        {
            var subject = "Your OTP Code";
            var message = $"Your OTP code is {otpCode}. It will expire in 10 minutes.";

            await SendEmail(subject, message, new string[] { email }, new List<IFormFile>());
            return Ok();
        }


        [HttpPost]
        [Route("SendLeadAssignmentDetails")]
        public async System.Threading.Tasks.Task SendLeadAssignmentEmail(string email, Lead lead)
        {
            var subject = "New Lead Assignment";
            var body = $"You have been assigned a new lead.\nLead Name: {lead.LeadName}\nCompany: {lead.CompanyName}\nStart Date: {lead.StartDate}\nEnd Date: {lead.EndDate}";

            await SendEmail(subject, body, new string[] { email }, new List<IFormFile>());
        }
    }
}
