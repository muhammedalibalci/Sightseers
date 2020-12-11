using SightSeers.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace SightSeers.Infrastructure.Data
{
    public class SightSeersContext : DbContext
    {
        public SightSeersContext(DbContextOptions<SightSeersContext> context) : base(context)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<PostLike> PostLikes { get; set; }
    }
}
