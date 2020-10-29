using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TaskManager.Data
{
    public class TaskRepository
    {
        private readonly string connectionString;

        public TaskRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }
        public void AddTask(UserTask task)
        {
            using (var context = new UserTaskContext(connectionString))
            {
                context.Tasks.Add(task);
                context.SaveChanges();
            }
        }
        public IEnumerable<UserTask> GetUncompletedTasks()
        {
            using (var context = new UserTaskContext(connectionString))
            {
                return context.Tasks.Include(t => t.User).Where(t => !t.Completed).ToList();
            }
        }
        public void MarkTaken(int taskId, int userId)
        {
            using (var context = new UserTaskContext(connectionString))
            {
                context.Database.ExecuteSqlCommand(
                   "UPDATE Tasks SET UndertakenBy = @userId WHERE Id = @taskId",
                   new SqlParameter("@userId", userId),
                   new SqlParameter("@taskId", taskId));
            }
        }
        public void MarkComplete(int taskId)
        {
            using (var context = new UserTaskContext(connectionString))
            {
                var task = context.Tasks.FirstOrDefault(t => t.Id == taskId);
                task.Completed = true;
                context.SaveChanges();

            }
        }

        public UserTask GetById(int taskId)
        {
            using (var context = new UserTaskContext(connectionString))
            {
                return context.Tasks.Include(t => t.User).FirstOrDefault(i => i.Id == taskId);
            }
        }
    }
}
