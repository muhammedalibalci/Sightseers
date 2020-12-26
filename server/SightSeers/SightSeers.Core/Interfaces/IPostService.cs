using Microsoft.AspNetCore.Http;
using SightSeers.Core.Dtos;
using SightSeers.Core.Helpers;
using SightSeers.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SightSeers.Core.Interfaces
{
    public interface IPostService
    {
        Task<PagedList<ResponsePostDto>> GetAllPostsAsync(PaginationParameters paginationParameters, int userId);

        Task<PagedList<ResponsePostDto>> GetAllPostsUserAsync(int userId, PaginationParameters paginationParameters);

        ResponsePostDto GetPost(int id);
        
        void PostLike(int userId,int id);
        
        void PostUnlike(int userId, int id);
        Task<List<PostLike>> GetAllLikesByUser(int id);

        Task<ResponsePostDto> AddPost(PostDto post, IFormFile file);
        
        void DeletePost(int postId);
        
        void UpdatePost(PostDto post);
    }
}
