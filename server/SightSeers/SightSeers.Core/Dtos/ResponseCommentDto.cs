
namespace SightSeers.Core.Dtos
{
    public class ResponseCommentDto
    {
        public string Content { get; set; }
        public long CreatedAt { get; set; } 
        public AddUserDto User { get; set; }
    }
}
