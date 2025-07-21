using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace worldChat.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        public async Task SendMessage(string message)
        {
            var username = Context.User?.Identity?.Name ?? "Anonymous";
            await Clients.All.SendAsync("ReceiveMessage", username, message);
        }

        public override async Task OnConnectedAsync()
        {
            var username = Context.User?.Identity?.Name ?? "Anonymous";
            await Clients.All.SendAsync("UserConnected", username);
            await base.OnConnectedAsync();
        }
    }
}
