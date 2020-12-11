using AutoMapper;
using SightSeers.Core.Dtos;
using SightSeers.Core.Models;

namespace SightSeers.API.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AddUserDto, User>();
            CreateMap<User, AddUserDto>();
            CreateMap<User, AddUserResponseDto>();
            CreateMap<Post, PostDto>();
            CreateMap<PostDto, Post>();
            CreateMap<Comment, CommentDto>();
            CreateMap<CommentDto, Comment>();
            CreateMap<RequestSignUpDto, User>();
            CreateMap<RequestAuthDto, User>();
            CreateMap<User, ResponseAuthDto>();
            CreateMap<ResponsePostDto, Post>();
            CreateMap<Post, ResponsePostDto>();
            CreateMap<Comment, ResponseCommentDto>();
            CreateMap<ResponseCommentDto, Comment>();
        }
    }
}
