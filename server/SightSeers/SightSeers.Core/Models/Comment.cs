using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SightSeers.Core.Models
{
    [Table("Comment")]
    public class Comment : BaseEntity
    {
        public string Content { get; set; }
        public long CreatedAt { get; set; } =  DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
        public int PostId { get; set; }

        [ForeignKey("PostId")]
        public Post Post { get; set; }
    }
}
