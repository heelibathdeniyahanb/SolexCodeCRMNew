namespace SolexCode.CRM.API.New.Models
{
    public class UnRegisteredUser
    {   public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public string CompanyName { get; set; }
        public string Industry { get; set;}
        public  string Country {  get; set;}
        public string Continent { get; set;}
        public DateTime RegisteredDate { get; set;}

    }
}
