using Microsoft.EntityFrameworkCore;
using UserDirectory.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuredDbPath = builder.Configuration["Database:Path"];
var dbPath = string.IsNullOrWhiteSpace(configuredDbPath)
    ? Path.Combine(builder.Environment.ContentRootPath, "data", "app.db")
    : configuredDbPath;

var fullDbPath = Path.GetFullPath(dbPath);
Directory.CreateDirectory(Path.GetDirectoryName(fullDbPath)!);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source={fullDbPath}"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy => policy
        .WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.EnsureCreatedAsync();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("frontend");
app.MapControllers();

app.Run();

public partial class Program { }
