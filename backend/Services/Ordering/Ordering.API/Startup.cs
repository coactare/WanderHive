using Common.Logging.Correlation;
using EventBus.Messages.Common;
using HealthChecks.UI.Client;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.OpenApi.Models;
using Ordering.API.EventBusConsumer;
using Ordering.Application.Extensions;
using Ordering.Infrastructure.Data;
using Ordering.Infrastructure.Extensions;

namespace Ordering.API;
public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {

        services.AddApiVersioning();
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", policy =>
            {
                //TODO read the same from settings for prod deployment
                policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
            });
        }).AddVersionedApiExplorer(
          options =>
          {
              options.GroupNameFormat = "'v'VVV";
              options.SubstituteApiVersionInUrl = true;
          });
        services.AddApplicationServices();
        services.AddInfraServices(Configuration);

        services.AddScoped<BasketOrderingConsumer>();
        services.AddScoped<ICorrelationIdGenerator, CorrelationIdGenerator>();
        services.AddScoped<BasketOrderingConsumerV2>();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Ordering.API", Version = "v1" });
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "JWT Authorization header using the Bearer scheme."

            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                          new OpenApiSecurityScheme
                          {
                              Reference = new OpenApiReference
                              {
                                  Type = ReferenceType.SecurityScheme,
                                  Id = "Bearer"
                              }
                          },
                         new string[] {}
                    }
                });
        });
        services.AddAutoMapper(typeof(Startup));
        services.AddHealthChecks().Services.AddDbContext<OrderContext>();
        services.AddMassTransit(config =>
         {
             // Mark this as consumer
             config.AddConsumer<BasketOrderingConsumer>();
             config.AddConsumer<BasketOrderingConsumerV2>();
             config.UsingRabbitMq((ctx, cfg) =>
              {
                  cfg.Host(Configuration["EventBusSettings:HostAddress"]);
                  
                  cfg.ReceiveEndpoint(EventBusConstants.BasketCheckoutQueue, c =>
                  {
                      c.ConfigureConsumer<BasketOrderingConsumer>(ctx);
                  });
                  //V2 endpoint will pick items from here 
                  cfg.ReceiveEndpoint(EventBusConstants.BasketCheckoutQueueV2, c =>
                  {
                      c.ConfigureConsumer<BasketOrderingConsumerV2>(ctx);
                  });
              });
         });
        services.AddMassTransitHostedService();


        var userPolicy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();

        services.AddControllers(config =>
        {
            config.Filters.Add(new AuthorizeFilter(userPolicy));
        });


        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.Authority = Configuration["IdentityServer:Authority"];
            options.Audience = "Ordering";
            HttpClientHandler handler = new HttpClientHandler();
            handler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
            options.BackchannelHttpHandler = handler;
        });

        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ordering.API v1"));

        app.UseRouting();
        app.UseAuthentication();
        app.UseStaticFiles();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHealthChecks("/health", new HealthCheckOptions
            {
                Predicate = _ => true,
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });
        });
    }
}