using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Data;

namespace TaskManager.Web.Model
{
    public class SignupViewModel : User
    {
        public string Password { get; set; }

    }
}
