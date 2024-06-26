using System.Text.Json.Serialization;

namespace SolexCode.CRM.API.New.Models
{
    public class Company
    {
       
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Website { get; set; }
        public string NumberOfEmployees { get; set; }
        public string AnnualRevenue { get; set; }
        public string ClientName { get; set; }
        public string Email { get; set; }
        public string CompanyPhone { get; set; }
        public string PersonalPhone { get; set; }
        public string Address { get; set; }
        public string Industry { get; set; }
        public string Department { get; set; }
        public string Title { get; set; }
        public string AdditionalNote { get; set; }
        public string Source { get; set; }

        [JsonIgnore]
        public ICollection<User> Users { get; set; } = new List<User>();


    }
}
