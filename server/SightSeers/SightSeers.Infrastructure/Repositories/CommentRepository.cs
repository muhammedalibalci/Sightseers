using SightSeers.Core.Interfaces;
using SightSeers.Core.Models;
using SightSeers.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace SightSeers.Infrastructure.Repositories
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        private readonly SightSeersContext _context;

        public CommentRepository(SightSeersContext context) : base(context)
        {
            _context = context;
        }

        public Comment GetComment(int id) =>
             _context.Comments.Include(x => x.User).Where(x=>x.Id == id).FirstOrDefault();

        public async Task<List<Comment>> GetAllCommentsByPostIdAsync(int postId) =>
             await _context.Comments
                    .Include(x=>x.User)
                    .Where(x => x.PostId == postId)
                    .OrderByDescending(x => x.CreatedAt)
                    .ToListAsync();


    }
}
