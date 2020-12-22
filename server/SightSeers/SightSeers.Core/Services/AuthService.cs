using System;
using System.Security.Policy;
using System.Threading.Tasks;
using AutoMapper;
using SightSeers.Core.Dtos;
using SightSeers.Core.Helpers;
using SightSeers.Core.Interfaces;
using SightSeers.Core.Models;

namespace SightSeers.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        public AuthService(IMapper _mapper,
            ITokenService _tokenService,
            IUnitOfWork _unitOfWork, IUserRepository userRepository)
        {
            this._mapper = _mapper;
            this._tokenService = _tokenService;
            this._unitOfWork = _unitOfWork;
            _userRepository = userRepository;
        }

        public ResponseAuthDto Login(RequestAuthDto requestUser)
        {
            var user = CheckUsernameExistsAsync(requestUser.UserName);

            if (user == null)
            {
                return null;
            }

            var checkPassword = HashOperation.VerifyPassword(requestUser.Password,
                user.PasswordHash, user.PasswordSalt);

            if (!checkPassword)
            {
                return null;
            }

            var data = _mapper.Map<ResponseAuthDto>(user);
            data.Token = _tokenService.CreateToken(user);
            return data;
        }

        public ResponseAuthDto SignUp(RequestSignUpDto requestUser)
        {

            var checkUsername = CheckUsernameExistsAsync(requestUser.UserName);
            if (checkUsername != null)
            {
                return null;
            }

            byte[] passwordHash, passwordSalt;
            var user = _mapper.Map<User>(requestUser);
            HashOperation.CreatePasswordHash(requestUser.Password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            _userRepository.Add(user);
            _unitOfWork.Complete();
            var data = _mapper.Map<ResponseAuthDto>(user);
            data.Token = _tokenService.CreateToken(user);
            return data;
        }

        public User CheckUsernameExistsAsync(string username)
        {
            return _userRepository.Get(x => x.Username == username);
        }

        public async Task<ProfileDto> GetUser(int id)
        {
            return await _userRepository.GetProfile(id);
        }
    }
}
