using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager.Data
{
    public class UserTaskContext : DbContext
    {
        private readonly string connectionString;

        public UserTaskContext(string connectionString)
        {
            this.connectionString = connectionString;
        }
        public DbSet<User> Users { get; set; }
        public DbSet<UserTask> Tasks { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserTask>()
                .HasOne(t => t.User)
                .WithMany(u => u.UserTasks)
                .HasForeignKey(t => t.UndertakenBy);
        }
    }
}
