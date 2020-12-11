using SightSeers.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SightSeers.Core.Dtos
{
    public class CommentDto : BaseEntity
    {
        public string Content { get; set; }
        public int UserId { get; set; }
        public int CommentId { get; set; }
        public int PostId { get; set; }
    }
}
