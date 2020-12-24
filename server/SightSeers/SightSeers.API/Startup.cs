using SightSeers.Core.Interfaces;
using SightSeers.Core.Services;
using SightSeers.Infrastructure.Data;
using SightSeers.Infrastructure.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AutoMapper;
using SightSeers.API.Middlewares;
using Newtonsoft.Json;

namespace SightSeers.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                     .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                     .AddNewtonsoftJson(opt =>
                     {
                         opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                         opt.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                     });



            var databaseConfiguration = Configuration.GetConnectionString("DefaultConnection") +
                "password=" +/* Configuration["DbPassword"]*/ "OOo-0966onN5ZblAKSt30cJNj3WPomRX";

            services.AddAutoMapper(typeof(Startup));

            services.AddDbContext<SightSeersContext>(options => options.UseNpgsql(databaseConfiguration), ServiceLifetime.Scoped);
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<IPostRepository, PostRepository>();
            services.AddTransient<ICommentRepository, CommentRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IPostService, PostService>();
            services.AddTransient<ICommentService, CommentService>();
            services.AddTransient<ITokenService, TokenService>();
            services.AddTransient<IBlobStorage, BlobStorage>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseMiddleware<JwtMiddleware>();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
