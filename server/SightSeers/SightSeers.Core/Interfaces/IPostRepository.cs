using SightSeers.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SightSeers.Core.Interfaces
{
    public interface IPostRepository : IRepository<Post>
    {
        Task<List<Post>> GetAllPostsAsync(int userId);

        Task<List<Post>> GetAllPostsOfUserAsync(int userId);
        Post GetPost(int id);
    }
}
