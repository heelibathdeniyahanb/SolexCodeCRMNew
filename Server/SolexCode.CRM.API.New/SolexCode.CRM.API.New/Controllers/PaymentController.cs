using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SolexCode.CRM.API.New.Data;
using SolexCode.CRM.API.New.Models;
using Stripe;
using System;
using System.Threading.Tasks;

namespace SolexCode.CRM.API.New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public PaymentController(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;

            // Ensure Stripe API key is set
            StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];
        }

        [HttpPost]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentRequest paymentRequest)
        {
            Console.WriteLine($"Incoming payment request: {JsonConvert.SerializeObject(paymentRequest)}");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == paymentRequest.UserEmail);
            if (user == null)
            {
                return BadRequest(new { success = false, error = "User not found" });
            }

            var options = new PaymentIntentCreateOptions
            {
                Amount = paymentRequest.Amount,
                Currency = "usd",
                PaymentMethod = paymentRequest.PaymentMethodId,
                ConfirmationMethod = "manual",
                Confirm = true,
                ReturnUrl = "http://localhost:3000/clientPaymentView"
            };

            var service = new PaymentIntentService();
            try
            {
                var paymentIntent = await service.CreateAsync(options);

                var payment = new Payment
                {
                    Amount = paymentRequest.Amount,
                    PaymentMethodId = paymentRequest.PaymentMethodId,
                    PaymentIntentId = paymentIntent.Id,
                    Status = paymentIntent.Status,
                    CreatedAt = DateTime.UtcNow,
                    ClientName = paymentRequest.ClientName,
                    ClientCompany = paymentRequest.ClientCompany,
                    Description = paymentRequest.Description,
                    UserId = user.Id  // Use the found user's ID
                };

                _context.Payments.Add(payment);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, paymentId = payment.Id, paymentIntent });
            }
            catch (StripeException e)
            {
                Console.WriteLine($"Stripe Exception: {e.Message}");
                return BadRequest(new { success = false, error = e.Message });
            }
        }

        // GET api/payment/successful
        [HttpGet("successful")]
        public async Task<IActionResult> GetSuccessfulPayments()
        {
            try
            {
                var successfulPayments = await _context.Payments
                    .Where(p => p.Status == "succeeded")
                    .ToListAsync();

                return Ok(successfulPayments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("successful/{userId}")]
        public async Task<IActionResult> GetSuccessfulPaymentsByUserId(int userId)
        {
            try
            {
                var successfulPayments = await _context.Payments
                    .Where(p => p.Status == "succeeded" && p.UserId == userId)
                    .ToListAsync();

                if (successfulPayments == null || !successfulPayments.Any())
                {
                    return NotFound($"No successful payments found for user with ID {userId}");
                }

                return Ok(successfulPayments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // Inside your PaymentController class
        [HttpDelete("{paymentId}")]
        public async Task<IActionResult> DeletePayment(int paymentId)
        {
            try
            {
                var payment = await _context.Payments.FindAsync(paymentId);

                if (payment == null)
                {
                    return NotFound();
                }

                _context.Payments.Remove(payment);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Payment deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




    }

    public class PaymentRequest
    {
        public long Amount { get; set; }
        public string PaymentMethodId { get; set; }
        public string ClientName { get; set; }
        public string ClientCompany { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }       
        public string UserEmail { get; set; }
    }
}
