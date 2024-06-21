using Microsoft.Extensions.Logging;
using Ordering.Core.Entities;

namespace Ordering.Infrastructure.Data;

public class OrderContextSeed
{
    public static void SeedAsync(OrderContext orderContext, ILogger<OrderContextSeed> logger)
    {
        try
        {
            DbInitializer.Initialize(orderContext);
            logger.LogInformation($"Ordering Database: {typeof(OrderContext).Name} seeded.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}"); ;
        }
    }
}

internal class DbInitializer
{
    internal static void Initialize(OrderContext dbContext)
    {
        ArgumentNullException.ThrowIfNull(dbContext, nameof(dbContext));
        dbContext.Database.EnsureCreated();
        if (dbContext.Orders.Any()) return;


        foreach (var order in GetOrders())
        {
            dbContext.Orders.Add(order);
        }

        dbContext.SaveChangesAsync();
    }

    private static IEnumerable<Order> GetOrders()
    {
        return new List<Order>
        {
            new()
            {
                UserName = "r",
                FirstName = "r",
                LastName = "Sharma",
                EmailAddress = "r@xxxyyy.net",
                AddressLine = "Bangalore",
                Country = "India",
                TotalPrice = 750,
                State = "KA",
                ZipCode = "560001",
                CardName = "Visa",
                CardNumber = "1234567890123456",
                CreatedBy = "r",
                Expiration = "12/25",
                Cvv = "123",
                PaymentMethod = 1,
                LastModifiedBy = "r",
                LastModifiedDate = new DateTime()
            }
        };
    }
}