using System;
using System.Collections.Generic;
using System.Text;

namespace SightSeers.Core.Dtos
{
    public class ProfileDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public int LikeCount { get; set; }
        public int StoryCount { get; set; }
    }
}
