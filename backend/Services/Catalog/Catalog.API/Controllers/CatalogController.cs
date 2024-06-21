using System.Net;
using Catalog.Application.Commands;
using Catalog.Application.Queries;
using Catalog.Application.Responses;
using Catalog.Core.Entities;
using Catalog.Core.Specs;
using IdentityModel.Client;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers
{
    public class CatalogController : ApiController
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _iWebHostEnvironment;

        public CatalogController(IMediator mediator, IConfiguration configuration, IWebHostEnvironment iWebHostEnvironment)
        {
            _mediator = mediator;
            _configuration = configuration;
            _iWebHostEnvironment = iWebHostEnvironment;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("[action]", Name = "FetchCatalogToken")]
        public async Task<IActionResult> FetchCatalogToken()
        {
            TokenResponse tokenResponse;

            var handler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
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
                return Ok(new { data = tokenResponse.AccessToken });
            }
            else
            {
                return BadRequest(new { error = "Token is empty" });
            }

            //using (var apiHttpClient = new HttpClient())
            //{
            // apiHttpClient.SetBearerToken(tokenResponse.AccessToken);
            // var response = await apiHttpClient.GetStringAsync($"{Environment.GetEnvironmentVariable("API_URL")}/WeatherForecast");
            // Console.WriteLine(response);
            //}
        }

        [HttpGet]
        [Route("[action]", Name = "GreetHelloFromSecuredCatalog")]
        public IActionResult GreetHelloFromSecuredCatalog()
        {
            return Ok("Hello From secured Catalog");
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("[action]", Name = "GreetHelloFromAnonymousCatalog")]
        public IActionResult GreetHelloFromAnonymousCatalog()
        {
            return Ok("Hello From Anonymous Catalog");
        }

        //[AllowAnonymous]
        [HttpGet("{id}")]
        [Route("[action]/{id}", Name = "GetProductById")]
        [ProducesResponseType(typeof(ProductResponse), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ProductResponse>> GetProductById(string id)
        {
            var query = new GetProductByIdQuery(id);
            var result = await _mediator.Send(query);

            string imagePath = Path.Combine(_iWebHostEnvironment.ContentRootPath, "Images", "Nike-Footb244002611.png");

            if (System.IO.File.Exists(imagePath))
            {
                result.Image = System.IO.File.ReadAllBytes(imagePath);
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("[action]/{productName}", Name = "GetProductByProductName")]
        [ProducesResponseType(typeof(IList<ProductResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IList<ProductResponse>>> GetProductByProductName(string productName)
        {
            var query = new GetProductByNameQuery(productName);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        //[AllowAnonymous]
        //[HttpGet]
        //[Route("GetAllProductsAllowAnonymous")]
        //[ProducesResponseType(typeof(IList<ProductResponse>), (int)HttpStatusCode.OK)]
        //public async Task<ActionResult<IList<ProductResponse>>> GetAllProductsAllowAnonymous([FromQuery] CatalogSpecParams catalogSpecParams)
        //{
        //    var query = new GetAllProductsQuery(catalogSpecParams);
        //    var result = await _mediator.Send(query);
        //    foreach (var product in result.Data)
        //    {
        //        if (!string.IsNullOrWhiteSpace(product.ImageFile))
        //        {
        //            string imagePath = Path.Combine(_iWebHostEnvironment.ContentRootPath, "Images", product.ImageFile);

        //            if (System.IO.File.Exists(imagePath))
        //            {
        //                product.Image = System.IO.File.ReadAllBytes(imagePath);
        //            }
        //        }
        //    }

        //    return Ok(new { data = result });
        //}

        [HttpGet]
        [Route("GetAllProducts")]
        [ProducesResponseType(typeof(IList<ProductResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IList<ProductResponse>>> GetAllProducts([FromQuery] CatalogSpecParams catalogSpecParams)
        {
            var query = new GetAllProductsQuery(catalogSpecParams);
            var result = await _mediator.Send(query);
            #region DeleteThis
            foreach (var product in result.Data)
            {
                if (!string.IsNullOrWhiteSpace(product.ImageFile))
                {
                    string imagePath = Path.Combine(_iWebHostEnvironment.ContentRootPath, "Images", "Nike-Footb244002611.png");

                    if (System.IO.File.Exists(imagePath))
                    {
                        product.Image = System.IO.File.ReadAllBytes(imagePath);
                    }
                }
            }
            #endregion
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllBrands")]
        [ProducesResponseType(typeof(IList<BrandResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IList<BrandResponse>>> GetAllBrands()
        {
            var query = new GetAllBrandsQuery();
            var result = await _mediator.Send(query);
            return Ok(new { data = result });
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetAllTypes")]
        [ProducesResponseType(typeof(IList<TypesResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IList<TypesResponse>>> GetAllTypes()
        {
            var query = new GetAllTypesQuery();
            var result = await _mediator.Send(query);
            return Ok(new { data = result });
        }

        [HttpGet]
        [Route("[action]/{brand}", Name = "GetProductsByBrandName")]
        [ProducesResponseType(typeof(IList<ProductResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IList<ProductResponse>>> GetProductsByBrandName(string brand)
        {
            var query = new GetProductByBrandQuery(brand);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        //[AllowAnonymous]
        [HttpPost]
        [Route("CreateProduct")]
        [ProducesResponseType(typeof(ProductResponse), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<ProductResponse>> CreateProduct([FromForm] CreateProductCommand createProductCommandFormData)
 
        {
            if (createProductCommandFormData == null)
            {
                return BadRequest("Form data is null");
            }
            if (createProductCommandFormData.Image == null)
            {
                return BadRequest("Image file is required.");
            }

            var createProductCommand = new CreateProductCommand
            {
                Name = createProductCommandFormData.Name,
                Summary = createProductCommandFormData.Summary,
                Description = createProductCommandFormData.Description,
                Price = createProductCommandFormData.Price,
                ImageFile = SaveImage(createProductCommandFormData.Image),
                Brands = new ProductBrand { Name = createProductCommandFormData.Brands.Name },
                Types = new ProductType { Name = createProductCommandFormData.Types.Name }
            };

            var result = await _mediator.Send(createProductCommand);
            return Ok(new { data = result });
            // return Ok(new { data = true });
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public string SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_iWebHostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                imageFile.CopyTo(fileStream);
            }
            return imageName;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_iWebHostEnvironment.ContentRootPath, "Images", imageName);

            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }

        //[HttpPut]
        [HttpPost]
        [Route("UpdateProduct")]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateProduct([FromForm] UpdateProductCommand productCommand)
        {
            var result = await _mediator.Send(productCommand);
            return Ok(result);
            //return Ok(true);
        }

        //[AllowAnonymous]
        [HttpDelete]
        [Route("[action]/{id}", Name = "DeleteProduct")]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            var query = new DeleteProductByIdQuery(id);
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}