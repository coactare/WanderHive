using System.Net;
using Basket.Application.Commands;
using Basket.Application.Queries;
using Basket.Application.Responses;
using Common.Logging.Correlation;
using EventBus.Messages.Events;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MassTransit;
using Discount.Grpc.Protos;
using Basket.Core.Entities;
using Basket.Application.Mappers;
using EventBus.Messages.Events;
using static Discount.Grpc.Protos.DiscountProtoService;
using Microsoft.AspNetCore.Authorization;
using IdentityModel.Client;


namespace Basket.API.Controllers;

public class BasketController : ApiController
{
    private readonly IMediator _mediator;
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly ILogger<BasketController> _logger;
    private readonly ICorrelationIdGenerator _correlationIdGenerator;
    private readonly DiscountProtoServiceClient _discountProtoServiceClient;
    private readonly IConfiguration _configuration;

    public BasketController(IConfiguration configuration, DiscountProtoServiceClient discountProtoServiceClient, IMediator mediator, ILogger<BasketController> logger, IPublishEndpoint publishEndpoint, ICorrelationIdGenerator correlationIdGenerator)
    {
        _mediator = mediator;
        _publishEndpoint = publishEndpoint;
        _logger = logger;
        _correlationIdGenerator = correlationIdGenerator;
        _logger.LogInformation("CorrelationId {correlationId}:", _correlationIdGenerator.Get());
        _discountProtoServiceClient = discountProtoServiceClient;
        _configuration = configuration;
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("[action]", Name = "FetchBasketToken")]
    public async Task<string> FetchBasketToken()
    {
        TokenResponse tokenResponse;

        var handler = new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback =
                            HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
        };

        using (var discoveryDocumentHttpClient = new HttpClient(handler))
        {
            var discoveryDocumentResponse = await discoveryDocumentHttpClient.GetDiscoveryDocumentAsync(_configuration["IdentityServer:Authority"]);
            
            tokenResponse = await discoveryDocumentHttpClient.RequestClientCredentialsTokenAsync(
                new ClientCredentialsTokenRequest
                {
                    Address = discoveryDocumentResponse.TokenEndpoint,
                    ClientId = _configuration["IdentityServer:ClientId"],
                    ClientSecret = _configuration["IdentityServer:ClientSecret"],
                    Scope = _configuration["IdentityServer:Scope"]
                });
        }

        if (!string.IsNullOrWhiteSpace(tokenResponse.AccessToken))
        {
            return tokenResponse.AccessToken;
        }
        else
        {
            return "Token is empty";
        }

        //using (var apiHttpClient = new HttpClient())
        //{
        //    apiHttpClient.SetBearerToken(tokenResponse.AccessToken);

        //    var response = await apiHttpClient.GetStringAsync($"{Environment.GetEnvironmentVariable("API_URL")}/WeatherForecast");
        //    Console.WriteLine(response);
        //}
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("[action]/{userName}", Name = "GetBasketByUserName")]
    [ProducesResponseType(typeof(ShoppingCartResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<ShoppingCartResponse>> GetBasket(string userName)
    {
        var query = new GetBasketByUserNameQuery(userName);
        var basket = await _mediator.Send(query);
        return Ok(basket);
    }

    [AllowAnonymous]
    [HttpPost("CreateBasket")]
    [ProducesResponseType(typeof(ShoppingCartResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<ShoppingCartResponse>> UpdateBasket([FromBody] CreateShoppingCartCommand createShoppingCartCommand)
    {
        var basket = await _mediator.Send(createShoppingCartCommand);
        return Ok(basket);
    }

    [HttpDelete]
    [Route("[action]/{userName}", Name = "DeleteBasketByUserName")]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<ActionResult<ShoppingCartResponse>> DeleteBasket(string userName)
    {
        var query = new DeleteBasketByUserNameCommand(userName);
        var result = await _mediator.Send(query);

        return Ok(result);
    }

    [Route("[action]")]
    [HttpPost]
    [ProducesResponseType((int)HttpStatusCode.Accepted)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public async Task<IActionResult> Checkout([FromBody] BasketCheckout basketCheckout)
    {
        var query = new GetBasketByUserNameQuery(basketCheckout.UserName);
        var basket = await _mediator.Send(query);
        if (basket == null)
        {
            return BadRequest();
        }

        var eventMesg = BasketMapper.Mapper.Map<BasketCheckoutEvent>(basketCheckout);
        eventMesg.TotalPrice = basket.TotalPrice;
        eventMesg.CorrelationId = _correlationIdGenerator.Get();
        await _publishEndpoint.Publish(eventMesg);

        var deleteQuery = new DeleteBasketByUserNameCommand(basketCheckout.UserName);
        await _mediator.Send(deleteQuery);
        return Accepted();
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("[action]", Name = "GreetHello")]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<IActionResult> GreetHello()
    {
        var reply = await _discountProtoServiceClient.SayHelloFromDiscountAsync(new HelloRequest { Name = "GreeterClient" });
        return Ok(reply.Message);
    }

    [HttpGet]
    [Route("[action]", Name = "GreetHelloXX7")]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<IActionResult> GreetHelloXX7()
    {
        var reply = await _discountProtoServiceClient.SayHelloFromDiscountAsync(new HelloRequest { Name = "GreeterClient" });
        return Ok(reply.Message);
    }
}