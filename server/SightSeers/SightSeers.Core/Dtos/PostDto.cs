using SightSeers.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SightSeers.Core.Dtos
{
   public class PostDto : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public int UserId { get; set; }
    }
}
