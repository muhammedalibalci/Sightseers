using SightSeers.Core.Dtos;
using SightSeers.Core.Helpers;
using SightSeers.Core.Interfaces;
using SightSeers.Core.Models;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System;

namespace SightSeers.Core.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IRepository<PostLike> _postLikeRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IBlobStorage _fileManager;

        public PostService(IPostRepository postRepository, IRepository<PostLike> postLikeRepository, IUnitOfWork unitOfWork, IMapper mapper, IBlobStorage fileManager = null)
        {
            _postRepository = postRepository;
            _postLikeRepository = postLikeRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _fileManager = fileManager;
        }

        public async Task<PagedList<ResponsePostDto>> GetAllPostsAsync(PaginationParameters paginationParameters, int userId)
        {
            var posts = await _postRepository.GetAllPostsAsync(userId);
            var postsMap = _mapper.Map<List<ResponsePostDto>>(posts);
            return PagedList<ResponsePostDto>.ToPagedList(postsMap.AsQueryable(), paginationParameters.PageNumber, paginationParameters.PageSize);
        }

        public async Task<PagedList<ResponsePostDto>> GetAllPostsUserAsync(int userId, PaginationParameters paginationParameters)
        {
            var posts = await _postRepository.GetAllPostsOfUserAsync(userId);
            var postsMap = _mapper.Map<List<ResponsePostDto>>(posts);
            return PagedList<ResponsePostDto>.ToPagedList(postsMap.AsQueryable(), paginationParameters.PageNumber, paginationParameters.PageSize);
        }
        public ResponsePostDto GetPost(int id)
        {
            var post = _postRepository.GetPost(id);
            return _mapper.Map<ResponsePostDto>(post);
        }
        
        public async Task<ResponsePostDto> AddPost(PostDto post, IFormFile file)
        {
            var postMap = _mapper.Map<Post>(post);

            if (file != null)
            {
                var result = await _fileManager.UploadFileBlobAsync("postimages", file.OpenReadStream(), file.ContentType, file.FileName);
                postMap.ImageUrl = result.AbsoluteUri;
            }
            try
            {
                _postRepository.Add(postMap);
                _unitOfWork.Complete();
            }
            catch (Exception)
            {
                if (file != null)
                {
                    await _fileManager.DeleteAsync(file.FileName, "postimages");
                }
            }
            var addedPost = _postRepository.GetPost(postMap.Id);
            return _mapper.Map<ResponsePostDto>(addedPost);
        }

        public void DeletePost(int postId)
        {
            var post = _postRepository.Get(x => x.Id == postId);
            _postRepository.Delete(post);
            _unitOfWork.Complete();
        }
        
        public void UpdatePost(PostDto post)
        {
            var postMap = _mapper.Map<Post>(post);
            _postRepository.Update(postMap);
            _unitOfWork.Complete();
        }
        
        public void PostLike(int userId, int id)
        {
            var userPoint = new PostLike { UserId = userId, PostId = id };
            _postLikeRepository.Add(userPoint);
            _unitOfWork.Complete();
        }

        public void PostUnlike(int userId, int id)
        {
            var userPoint = _postLikeRepository.Get(x => x.UserId == userId && x.PostId == id);
            _postLikeRepository.Delete(userPoint);
            _unitOfWork.Complete();
        }

        public async Task<List<PostLike>> GetAllLikesByUser(int id) 
        {
            var likes = await _postLikeRepository.GetAllAsync(x => x.UserId == id);
            return likes;
        }
    }
}
