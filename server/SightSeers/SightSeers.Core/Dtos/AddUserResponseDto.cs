using System;
using System.Collections.Generic;
using System.Text;

namespace SightSeers.Core.Dtos
{
    public class AddUserResponseDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }
    }
}
