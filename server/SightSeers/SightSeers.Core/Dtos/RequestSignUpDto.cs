using System;
using System.Collections.Generic;
using System.Text;

namespace SightSeers.Core.Dtos
{
    public class RequestSignUpDto
    {
        public string Password { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
    }
}
