using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager.Data
{
    public class UserTask
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public int? UndertakenBy { get; set; }
        public bool Completed { get; set; }

        public User User { get; set; }
    }
}
