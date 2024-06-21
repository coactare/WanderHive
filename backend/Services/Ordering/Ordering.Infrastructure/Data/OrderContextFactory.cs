using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Ordering.Infrastructure.Data;

//public class OrderContextFactory : IDesignTimeDbContextFactory<OrderContext>
//{
//    public OrderContext CreateDbContext(string[] args)
//    {
//        var optionsBuilder = new DbContextOptionsBuilder<OrderContext>();
//        string conn = @"Server=orderdb";
//        optionsBuilder.UseSqlServer(conn);
//        return new OrderContext(optionsBuilder.Options);
//    }
//}