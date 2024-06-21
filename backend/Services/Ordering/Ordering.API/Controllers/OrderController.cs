using System.Net;
using Common.Logging.Correlation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ordering.Application.Commands;
using Ordering.Application.Queries;
using Ordering.Application.Responses;
using IdentityModel.Client;
using Microsoft.Extensions.Configuration;

namespace Ordering.API.Controllers;

public class OrderController : ApiController
{
    private readonly IMediator _mediator;
    private readonly ILogger<OrderController> _logger;
    private readonly ICorrelationIdGenerator _correlationIdGenerator;
    private readonly IConfiguration _configuration;

    public OrderController(IConfiguration configuration, IMediator mediator, ILogger<OrderController> logger, ICorrelationIdGenerator correlationIdGenerator)
    {
        _mediator = mediator;
        _logger = logger;
        _correlationIdGenerator = correlationIdGenerator;
        _logger.LogInformation("CorrelationId {correlationId}:", _correlationIdGenerator.Get());
        _configuration = configuration;
    }

    #region Testing
    [AllowAnonymous]
    [HttpGet]
    [Route("[action]", Name = "FetchCatalogToken")]
    public async Task<string> FetchOrderingToken()
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

    [HttpGet]
    [Route("[action]", Name = "GreetHelloFromSecuredOrdering")]
    public IActionResult GreetHelloFromSecuredOrdering()
    {
        return Ok("Hello From secured Ordering");
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("[action]", Name = "GreetHelloFromAnonymousOrdering")]
    public IActionResult GreetHelloFromAnonymousOrdering()
    {
        return Ok("Hello From Anonymous Ordering");
    }
    #endregion


    [HttpGet("{userName}", Name = "GetOrdersByUserName")]
    [ProducesResponseType(typeof(IEnumerable<OrderResponse>), (int) HttpStatusCode.OK)]
    public async Task<ActionResult<IEnumerable<OrderResponse>>> GetOrdersByUserName(string userName)
    {
        var query = new GetOrderListQuery(userName);
        var orders = await _mediator.Send(query);
        return Ok(orders);
    }

    //Just for testing locally as it will be processed in queue
    [HttpPost(Name = "CheckoutOrder")]
    [ProducesResponseType((int) HttpStatusCode.OK)]
    public async Task<ActionResult<int>> CheckoutOrder([FromBody] CheckoutOrderCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }
    
    [HttpPut(Name = "UpdateOrder")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult> UpdateOrder([FromBody] UpdateOrderCommand command)
    {
        var result = await _mediator.Send(command);
        return NoContent();
    }
    
    [HttpDelete("{id}",Name = "DeleteOrder")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult> DeleteOrder(int id)
    {
        var cmd = new DeleteOrderCommand() {Id = id};
        await _mediator.Send(cmd);
        return NoContent();
    }
    
}