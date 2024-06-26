namespace SolexCode.CRM.API.New
{
    public class UserRegisterDto
    {
        public string FullName { get; set; }
        public DateOnly BirthDate { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public string CompanyName { get; set; }
        public string Continent { get; set; }
        public string Country { get; set; }
        public string Industry { get; set; }


        public string Role { get; set; }
        public bool ChangePassword { get; set; }

        public IFormFile UserImage { get; set; }
       
        public DateTime DateAdded { get; set; } = DateTime.Now;
    }
}
