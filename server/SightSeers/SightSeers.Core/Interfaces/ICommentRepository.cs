using SightSeers.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SightSeers.Core.Interfaces
{
    public interface ICommentRepository : IRepository<Comment>
    {
        Comment GetComment(int id);

        Task<List<Comment>> GetAllCommentsByPostIdAsync(int postId);
    }
}
