using Ordering.API.Extensions;
using Ordering.Infrastructure.Data;
using Serilog;

namespace Ordering.API;

public class Program
{
    //public static void Main(string[] args)
    //{
    //    CreateHostBuilder(args)
    //        .Build()
    //        .MigrateDatabase<OrderContext>((context, services) =>
    //        {
    //            var logger = services.GetService<ILogger<OrderContextSeed>>();
    //            OrderContextSeed.SeedAsync(context, logger);
    //        }).Run();
    //}

    public static void Main(string[] args)
    {
        var host = CreateHostBuilder(args)
        .Build();

        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<OrderContext>();
            var logger = services.GetRequiredService<ILogger<OrderContextSeed>>();

            OrderContextSeed.SeedAsync(context, logger);
        }

        host.Run();
    }

    //private static IHostBuilder CreateHostBuilder(string[] args) =>
    //    Host.CreateDefaultBuilder(args)
    //        .ConfigureWebHostDefaults(webBuilder =>
    //        {
    //            webBuilder.UseStartup<Startup>();
    //        }).UseSerilog(Common.Logging.Logging.ConfigureLogger);

    private static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args).ConfigureAppConfiguration((env, config) =>
        {
            var CURRENT_ENVIRONMENT = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            config.AddJsonFile($"appsettings.{CURRENT_ENVIRONMENT}.json", true, true);
            //config.AddJsonFile($"appsettings.{env.HostingEnvironment.EnvironmentName}.json", true, true);
        }).ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        }).UseSerilog(Common.Logging.Logging.ConfigureLogger);
}