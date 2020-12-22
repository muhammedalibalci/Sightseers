using SightSeers.Core.Dtos;
using SightSeers.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SightSeers.Core.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<ProfileDto> GetProfile(int id);
    }
}
