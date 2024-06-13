using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolexCode.CRM.API.New.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Threading.Tasks;
using System;
using SolexCode.CRM.API.New.Data;

namespace SolexCode.CRM.API.New.Controllers
{
    [Route("api/user/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IConfiguration _configuration;

        public UserController(DatabaseContext context, IWebHostEnvironment environment, IConfiguration configuration)
        {
            _context = context;
            _environment = environment;
            _configuration = configuration;
        }

        // Change Password
        [HttpPost("{id}/ChangePassword")]
        public async Task<IActionResult> ChangePassword(int id, [FromBody] string newPassword)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound();
                }
                user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
                user.ChangePassword = false;

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return Ok("Password changed successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Get All Users
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            try
            {
                var users = await _context.Users.ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Login method and data get according to id
        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == loginRequest.UserName);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
            {
                return NotFound();
            }

            // Create claims for the user
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Generate JWT token
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            HttpContext.Session.SetString("UserId", user.Id.ToString());
            HttpContext.Session.SetString("LoggedIn", "true");

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo,
                userId = user.Id,
                changePassword = user.ChangePassword,
                sessionId = user.Id,
                userData = new
                {
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.UserName,
                    user.ChangePassword,
                    user.Email,
                    user.Role,
                    user.MobileNumber,
                    user.CompanyName,
                    user.Continent,
                    user.Country,
                    user.Industry,
                    user.ImagePath
                }
            });
        }

        // Login request check password and username correct from database
        public class LoginRequest
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        // Add User
        [HttpPost]
        public async Task<IActionResult> UserRegister([FromForm] UserRegisterDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest("User data is null");
            }

            var user = new User
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                MobileNumber = userDto.MobileNumber,
                CompanyName = userDto.CompanyName,
                Continent = userDto.Continent,
                Country = userDto.Country,
                Industry = userDto.Industry,
                UserName = userDto.UserName,
                Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                Role = userDto.Role,
                ChangePassword = userDto.ChangePassword
            };

            if (userDto.UserImage != null)
            {
                var uploadsFolderPath = Path.Combine(_environment.WebRootPath, "upload", "image");
                Directory.CreateDirectory(uploadsFolderPath);
                var filePath = Path.Combine(uploadsFolderPath, userDto.UserImage.FileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await userDto.UserImage.CopyToAsync(fileStream);
                }

                user.ImagePath = Path.Combine("upload", "image", userDto.UserImage.FileName);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        // Get File Path
        [NonAction]
        private string GetFilePath(string productCode)
        {
            return Path.Combine(_environment.WebRootPath, "upload", "image", productCode);
        }

        // Update User
        [HttpPut]
        public async Task<IActionResult> UpdateUser(User user)
        {
            if (user == null)
            {
                return BadRequest("User is null");
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Delete User
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            if (!string.IsNullOrEmpty(user.ImagePath))
            {
                var imagePath = Path.Combine(_environment.WebRootPath, user.ImagePath);
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok("User deleted successfully");
        }

        // Method to get the image by user ID
        [HttpGet("{id}/GetUserImage")]
        public async Task<IActionResult> GetUserImage(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null || string.IsNullOrEmpty(user.ImagePath))
            {
                return NotFound("User or image not found");
            }

            var imagePath = Path.Combine(_environment.WebRootPath, user.ImagePath);
            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound("Image file not found");
            }

            var image = System.IO.File.OpenRead(imagePath);
            return File(image, "image/jpeg");
        }

        // Image Update Function
        [HttpPost("UpdateUserImage/{id}")]
        public async Task<IActionResult> UpdateUserImage(int id, [FromForm] UserImageUpdateDto imageDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            if (imageDto.UserImage != null)
            {
                var uploadsFolderPath = Path.Combine(_environment.WebRootPath, "upload", "image");
                Directory.CreateDirectory(uploadsFolderPath);

                if (!string.IsNullOrEmpty(user.ImagePath))
                {
                    var oldImagePath = Path.Combine(_environment.WebRootPath, user.ImagePath);
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                var filePath = Path.Combine(uploadsFolderPath, imageDto.UserImage.FileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await imageDto.UserImage.CopyToAsync(fileStream);
                }

                user.ImagePath = Path.Combine("upload", "image", imageDto.UserImage.FileName);
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }
    }
}
