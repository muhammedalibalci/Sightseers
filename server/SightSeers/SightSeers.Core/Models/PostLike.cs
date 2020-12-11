using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SightSeers.Core.Models
{
    [Table("PostLike")]
    public class PostLike : BaseEntity
    {
        public int UserId { get; set; }

        public int PostId { get; set; }
    }
}
