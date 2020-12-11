using SightSeers.Core.Dtos;
using SightSeers.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SightSeers.Core.Interfaces
{
    public interface IAuthService
    {
        ResponseAuthDto Login(RequestAuthDto user);
        ResponseAuthDto SignUp(RequestSignUpDto user);
        User CheckUsernameExistsAsync(string username);

    }
}
