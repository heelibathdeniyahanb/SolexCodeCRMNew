using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SolexCode.CRM.API.New.Data;
using SolexCode.CRM.API.New.Models;

namespace SolexCode.CRM.API.New.Services
{
    public class ChatService
    {
        private readonly DatabaseContext _context;

        public ChatService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<int> CreateNewChat(List<int> participantIds)
        {
            // Create a new Chat entity
            var newChat = new Chat
            {
                Participants = participantIds.Select(userId => new ChatParticipant { UserId = userId }).ToList()
            };

            // Add the new chat to the database context
            _context.Chats.Add(newChat);

            // Save changes to the database to generate the ChatId
            await _context.SaveChangesAsync();

            // Return the generated ChatId
            return newChat.Id;
        }
    }
}
