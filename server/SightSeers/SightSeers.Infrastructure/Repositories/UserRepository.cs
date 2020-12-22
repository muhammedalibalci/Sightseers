using Microsoft.EntityFrameworkCore;
using SightSeers.Core.Dtos;
using SightSeers.Core.Interfaces;
using SightSeers.Core.Models;
using SightSeers.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SightSeers.Infrastructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly SightSeersContext _context;

        public UserRepository(SightSeersContext context) : base(context)
        {
            _context = context;
        }

        public async Task<ProfileDto> GetProfile(int id)
        {
            var data = await _context.Users.Where(u => u.Id == id)
                            .Select(u => new ProfileDto
                            {
                                Id = u.Id,
                                Name = u.Name,
                                LastName = u.Lastname,
                                UserName = u.Username,
                                LikeCount = _context.PostLikes.Where(x => x.UserId == id).Count(),
                                StoryCount = _context.Posts.Where(x => x.UserId == id).Count()
                            }).SingleOrDefaultAsync();

            return data;
        }
    }
}
