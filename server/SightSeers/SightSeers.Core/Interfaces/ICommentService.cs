using SightSeers.Core.Dtos;
using SightSeers.Core.Helpers;
using System.Threading.Tasks;

namespace SightSeers.Core.Interfaces
{
    public interface ICommentService
    {
        Task<PagedList<ResponseCommentDto>> GetAllCommentsByPostIdAsync(int postId,PaginationParameters paginationParameters);
        ResponseCommentDto AddComment(CommentDto comment);
        void DeleteComment(int commentId);
        void UpdateComment(CommentDto comment);
    }
}
