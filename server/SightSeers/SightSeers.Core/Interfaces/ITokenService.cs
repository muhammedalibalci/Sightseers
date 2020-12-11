using SightSeers.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SightSeers.Core.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
