using SightSeers.Core.Interfaces;
using SightSeers.Core.Models;
using SightSeers.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SightSeers.Infrastructure.Repositories
{
    public class PostRepository : Repository<Post>, IPostRepository
    {
        private readonly SightSeersContext _context;

        public PostRepository(SightSeersContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Post>> GetAllPostsAsync(int userId)
        {
            var posts = await _context.Posts.Select(x =>
                                new Post
                                {
                                    Id = x.Id,
                                    Title = x.Title,
                                    Content = x.Content,
                                    ImageUrl = x.ImageUrl,
                                    User = x.User,
                                    CreatedAt = x.CreatedAt,
                                    LikeCount = _context.PostLikes.Where(up => up.PostId == x.Id).Count(),
                                    CommentCount = _context.Comments.Where(c => c.PostId == x.Id).Count(),
                                    IsLiked = _context.PostLikes.Where(up => up.PostId == x.Id && up.UserId == userId).Any()
                                }).OrderByDescending(x=>x.CreatedAt)
                                .ToListAsync();

            return posts;
        }


        public async Task<List<Post>> GetAllPostsOfUserAsync(int userId) =>
            await _context.Posts
            .Where(x => x.UserId == userId)
            .Select(x => new Post
            {
                Id = x.Id,
                Title = x.Title,
                Content = x.Content,
                ImageUrl = x.ImageUrl,
                User = x.User,
                CreatedAt = x.CreatedAt,
                LikeCount = _context.PostLikes.Where(up => up.PostId == x.Id).Count(),
                CommentCount = _context.Comments.Where(c => c.PostId == x.Id).Count(),
                IsLiked = _context.PostLikes.Where(up => up.PostId == x.Id && up.UserId == userId).Any()

            })
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync();

        public Post GetPost(int id) =>
            _context.Posts.Where(x => x.Id == id)
             .Select(x => new Post
             {
                 Id = x.Id,
                 Title = x.Title,
                 Content = x.Content,
                 ImageUrl = x.ImageUrl,
                 User = x.User,
                 CreatedAt = x.CreatedAt,
                 LikeCount = _context.PostLikes.Where(up => up.PostId == x.Id).Count(),
             })
            .SingleOrDefault();

    }
}
