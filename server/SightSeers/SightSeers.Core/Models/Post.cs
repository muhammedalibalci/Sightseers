using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SightSeers.Core.Models
{
    [Table("Post")]
    public class Post : BaseEntity
    {
        public string Content { get; set; }

        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public string Location { get; set; }

        public long CreatedAt { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        [NotMapped]
        public int CommentCount { get; set; }
        [NotMapped]
        public int LikeCount { get; set; }

        [NotMapped]
        public bool IsLiked { get; set; }
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
