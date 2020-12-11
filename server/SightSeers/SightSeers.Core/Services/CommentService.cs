using AutoMapper;
using SightSeers.Core.Dtos;
using SightSeers.Core.Helpers;
using SightSeers.Core.Interfaces;
using SightSeers.Core.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SightSeers.Core.Services
{
    public class CommentService : ICommentService
    {
        public ICommentRepository _commentRepository { get; set; }
        public IMapper _mapper{ get; set; }
        public IUnitOfWork _unitOfWork { get; set; }

        public CommentService(ICommentRepository commentRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<PagedList<ResponseCommentDto>> GetAllCommentsByPostIdAsync(int postId, PaginationParameters paginationParameters)
        {
            var comments = await _commentRepository.GetAllCommentsByPostIdAsync(postId);
            var commentsMap = _mapper.Map<List<ResponseCommentDto>>(comments);
            return PagedList<ResponseCommentDto>.ToPagedList(commentsMap.AsQueryable(), paginationParameters.PageNumber, paginationParameters.PageSize);
        }
        public ResponseCommentDto AddComment(CommentDto comment)
        {
            var commentMap = _mapper.Map<Comment>(comment);
            _commentRepository.Add(commentMap);
            _unitOfWork.Complete();
            var addedComment = _commentRepository.GetComment(commentMap.Id);
            return _mapper.Map<ResponseCommentDto>(addedComment);
        }
        public void DeleteComment(int commentId)
        {
            var comment = _commentRepository.Get(x => x.Id == commentId);
            _commentRepository.Delete(comment);
            _unitOfWork.Complete();
        }
        public void UpdateComment(CommentDto comment)
        {
            var commentMap = _mapper.Map<Comment>(comment);
            _commentRepository.Update(commentMap);
            _unitOfWork.Complete();
        }
    }
}
