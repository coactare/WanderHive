using Serilog;

namespace Basket.API;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    private static IHostBuilder CreateHostBuilder(string[] args) => 
        Host.CreateDefaultBuilder(args).ConfigureAppConfiguration((env, config) =>
        {            var CURRENT_ENVIRONMENT = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            config.AddJsonFile($"appsettings.{CURRENT_ENVIRONMENT}.json", true, true);
            //config.AddJsonFile($"appsettings.{env.HostingEnvironment.EnvironmentName}.json", true, true);
        }).ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        }).UseSerilog(Common.Logging.Logging.ConfigureLogger);
}

