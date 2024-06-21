using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers;

[AllowAnonymous]
[ApiController, ApiVersion("1"), Route("api/v{version:apiVersion}/[controller]"), Authorize(Policy = "CanRead")]
public class ApiController : ControllerBase { }