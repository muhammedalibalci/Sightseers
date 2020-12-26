using SightSeers.API.Attributes;
using SightSeers.Core.Dtos;
using SightSeers.Core.Helpers;
using SightSeers.Core.Interfaces;
using SightSeers.Core.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace SightSeers.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class PostsController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostsController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet("{id}")]
        public  ActionResult GetPost(int id)
        {
            var post =  _postService.GetPost(id);
            return new OkObjectResult(post);
        }

        [HttpGet]
        public async Task<ActionResult> GetAllPosts([FromQuery] PaginationParameters paginationParameters)
        {
            var userId = (int)HttpContext.Items["UserId"];
            var posts = await _postService.GetAllPostsAsync(paginationParameters, userId);

            var metadata = new
            {
                posts.TotalCount,
                posts.PageSize,
                posts.CurrentPage,
                posts.TotalPages,
                posts.HasNext,
                posts.HasPrevious
            };
            Response.Headers.Add("Pagination", JsonConvert.SerializeObject(metadata));

            return new OkObjectResult(posts);
        }

        [HttpGet("myPosts")]
        public async Task<ActionResult> GetAllPostsOfUser([FromQuery] PaginationParameters paginationParameters)
        {
            var userId = (int)HttpContext.Items["UserId"];

            var posts = await _postService.GetAllPostsUserAsync(userId, paginationParameters);


            var metadata = new
            {
                posts.TotalCount,
                posts.PageSize,
                posts.CurrentPage,
                posts.TotalPages,
                posts.HasNext,
                posts.HasPrevious
            };
            Response.Headers.Add("Pagination", JsonConvert.SerializeObject(metadata));

            return new OkObjectResult(posts);
        }

        [HttpGet("mylikes")]
        public async Task<ActionResult> GetAllLikesOfUser()
        {
            var userId = (int)HttpContext.Items["UserId"];

            var likes = await _postService.GetAllLikesByUser(userId);

            return new OkObjectResult(likes);
        }

        [HttpPost]
        public async Task<ActionResult> AddPost([FromForm] IFormFile file, [FromForm] PostDto post)
        {
            var userId = (int)HttpContext.Items["UserId"];
            post.UserId = userId;

            var addedPost = await _postService.AddPost(post, file);
            return new OkObjectResult(addedPost);
        }

        [HttpDelete("{id}")]
        public ActionResult DeletePost([FromRoute] int id)
        {
            if (string.IsNullOrEmpty(id.ToString()))
            {
                return BadRequest();
            }
            _postService.DeletePost(id);
            return new OkResult();
        }

        [HttpPut]
        public ActionResult UpdatePost([FromBody] PostDto post)
        {
            _postService.UpdatePost(post);
            return new OkResult();
        }

        [HttpPost("like")]
        public ActionResult PostLike(int id)
        {
            var userId = (int)HttpContext.Items["UserId"];

            _postService.PostLike(userId, id);
            return new OkResult();
        }
        [HttpPost("unlike")]
        public ActionResult PostUnlike(int id)
        {
            var userId = (int)HttpContext.Items["UserId"];

            _postService.PostUnlike(userId, id);
            return new OkResult();
        }
    }
}
