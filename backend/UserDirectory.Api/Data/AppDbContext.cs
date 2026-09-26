using Microsoft.EntityFrameworkCore;
using UserDirectory.Api.Models;

namespace UserDirectory.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(x => x.Name).HasMaxLength(100).IsRequired();
            entity.Property(x => x.City).IsRequired();
            entity.Property(x => x.State).IsRequired();
            entity.Property(x => x.Pincode).HasMaxLength(10).IsRequired();
        });
    }
}
