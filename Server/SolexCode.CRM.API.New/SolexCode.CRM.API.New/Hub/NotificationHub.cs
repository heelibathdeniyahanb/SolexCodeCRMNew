namespace SolexCode.CRM.API.New.Hub
{
   

    using Microsoft.AspNetCore.SignalR;
    using System.Threading.Tasks;

    public class NotificationHub : Hub
    {
        public async Task SendNotification(string userId,string message)
        {
            // Send the notification message to all connected clients
            await Clients.User(userId).SendAsync("ReceiveNotification", message);
        }
    }

}
