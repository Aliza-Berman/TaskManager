using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager
{
    public class TaskHub : Hub
    {
        public void SendMessage(string message)
        {
            Clients.All.SendAsync("newMessage", new { message });
        }
    }
}
