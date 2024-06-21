using Microsoft.EntityFrameworkCore;
using Ordering.Core.Common;
using Ordering.Core.Entities;

namespace Ordering.Infrastructure.Data;

public class OrderContext : DbContext
{
    public OrderContext(DbContextOptions<OrderContext> options) : base(options)
    { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Server=orderdb;Initial Catalog=OrderDb;Persist Security Info=False;User ID=sa;Password=@dministr@tor;MultipleActiveResultSets=True;Encrypt=false;TrustServerCertificate=True;MultiSubnetFailover=True;Connection Timeout=30");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    { }
    public DbSet<Order> Orders { get; set; }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<EntityBase>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedDate = DateTime.Now;
                    entry.Entity.CreatedBy = "Sharma"; //TODO: This will be replaced Identity Server
                    break;
                case EntityState.Modified:
                    entry.Entity.LastModifiedDate = DateTime.Now;
                    entry.Entity.LastModifiedBy = "Sharma"; //TODO: This will be replaced Identity Server
                    break;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}