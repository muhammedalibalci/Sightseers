
namespace SightSeers.Core.Dtos
{
    public class ResponsePostDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public string Location { get; set; }
        public long CreatedAt { get; set; } 
        public int CommentCount { get; set; }
        public int LikeCount { get; set; }
        public bool IsLiked { get; set; }
        public AddUserDto User { get; set; }
    }
}
