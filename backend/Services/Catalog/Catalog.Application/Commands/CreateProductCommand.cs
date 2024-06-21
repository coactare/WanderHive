using Catalog.Application.Responses;
using Catalog.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Catalog.Application.Commands;

public class CreateProductCommand: IRequest<ProductResponse>
{
    public string Name { get; set; }
    public string Summary { get; set; }
    public string Description { get; set; }
    
    public IFormFile Image { get; set; }
    public string ImageFile { get; set; }
    public decimal Price { get; set; }
    public ProductBrand Brands { get; set; }
    public ProductType Types { get; set; }
}