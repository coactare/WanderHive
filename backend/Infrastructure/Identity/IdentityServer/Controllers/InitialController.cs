using Microsoft.AspNetCore.Mvc;

namespace IdentityServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InitialController : ControllerBase
    {
        [HttpGet]
        public string Get() => "This is Identity Server from DuendeSoftware.";
    }
}

