using backend.Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:3000", "https://localhost:3000/", "https://localhost:5001/", "http://localhost:5001",
                                      "https://localhost:5000/", "http://localhost:5000/", "https://localhost:5002/", "http://localhost:5002/",
                                      "http://localhost:5002", "https://localhost:5002", "https://battleshippawelapp2.herokuapp.com/", "https://battleshippawelapp2.herokuapp.com",
                                      "http://battleshippawelapp2.herokuapp.com", "http://battleshippawelapp2.herokuapp.com/",
                                      "https://battleshippawel.herokuapp.com/", "https://battleshippawel.herokuapp.com",
                                      "https://battleshippawel.herokuapp.com/hubs/game/negotiate?negotiateVersion=1" )
                        .AllowCredentials();
                });
            });

            services.AddSignalR();

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "ApiDocumentation", Version = "v1" });
                options.AddSignalRSwaggerGen();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ApiDocumentation v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("ClientPermission");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapHub<GameHubController>("/hubs/game");
            });
        }
    }
}
