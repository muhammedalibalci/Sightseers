using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SightSeers.Core.Models
{
    [Table("User")]
    public class User : BaseEntity
    {
        public string Name { get; set; }

        public string Lastname { get; set; }

        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public long CreatedAt { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

    }
}
