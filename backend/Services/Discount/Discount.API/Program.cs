using Common.Logging.Correlation;
using Discount.API.Services;
using Discount.Application.Handlers;
using Discount.Core.Repositories;
using Discount.Infrastructure.Repositories;
using Microsoft.AspNetCore.ResponseCompression;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddScoped<IDiscountRepository, DiscountRepository>();
builder.Services.AddScoped<ICorrelationIdGenerator, CorrelationIdGenerator>();
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateDiscountCommandHandler).Assembly));

builder.Services.AddGrpc();

builder.Services.AddResponseCompression(opts =>
{
    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
        new[] { "application/octet-stream" });
});


var app = builder.Build();
app.UseResponseCompression();
app.UseHttpsRedirection();
app.UseGrpcWeb();
//app.UseAuthorization();
app.MapControllers();
app.MapGrpcService<DiscountService>().EnableGrpcWeb();

app.MapGet("/", () => "This gRPC service is gRPC-Web enabled and is callable from browser apps uisng the gRPC-Web protocal");

app.Run();
