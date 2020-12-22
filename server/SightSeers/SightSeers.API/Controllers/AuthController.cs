using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SightSeers.Core.Dtos;
using SightSeers.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SightSeers.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _accountService;
        public AuthController(IAuthService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("signup")]
        public ActionResult SignUp([FromBody] RequestSignUpDto requestSignUpDto)
        {
            var user = _accountService.SignUp(requestSignUpDto);
            if (user == null)
            {
                return new BadRequestResult();
            }

            return new OkObjectResult(user);
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] RequestAuthDto requestAuthDto)
        {
            var user = _accountService.Login(requestAuthDto);
            if (user == null)
            {
                return new BadRequestResult();
            }
            return new OkObjectResult(user);
        }

        [HttpGet]
        public async Task<ActionResult> GetUser(int id)
        {
            var user = await _accountService.GetUser(id);
            if (user == null)
            {
                return new BadRequestResult();
            }
            return new OkObjectResult(user);
        }

    }
}
