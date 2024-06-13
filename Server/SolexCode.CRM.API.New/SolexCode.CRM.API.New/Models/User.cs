﻿namespace SolexCode.CRM.API.New.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool ChangePassword { get; set; } 
        public string Email { get; set; }
        public string Role { get; set; }
        public string MobileNumber { get; set; }
        public string CompanyName { get; set; }
        public string Continent { get; set; }
        public string Country { get; set; }
        public string Industry { get; set; }
        public string ImagePath { get; set; }
    }
}
