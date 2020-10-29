using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Data;

namespace TaskManager.Web
{
    public class TasksHub : Hub
    {
        private readonly string connectionString;
        public TasksHub(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("ConStr");
        }
        public void RenderTasks()
        {
            var repo = new TaskRepository(connectionString);
            var tasks = repo.GetUncompletedTasks();
            Clients.All.SendAsync("AllTasks", tasks.Select(t => new
            {
                Id = t.Id,
                Title = t.Title,
                UndertakenBy = t.UndertakenBy,
                Responder = t.User != null ? $"{t.User.FirstName} {t.User.LastName}" : null
            }
            ));

        }
        public void GetAll()
        {
            RenderTasks();
        }
        public void NewTask(string title)
        {
            var repo = new TaskRepository(connectionString);
            var task = new UserTask { Title = title, Completed = false };
            repo.AddTask(task);
            RenderTasks();
        }
        public void MarkTaken(int taskId)
        {
            var userRepo = new UserRepository(connectionString);
            var user = userRepo.GetByEmail(Context.User.Identity.Name);
            var taskRepo = new TaskRepository(connectionString);
            taskRepo.MarkTaken(taskId, user.Id);
            RenderTasks();
        }

        public void MarkComplete(int taskId)
        {
            var repo = new TaskRepository(connectionString);
            repo.MarkComplete(taskId);
            RenderTasks();
        }
    }
}
