using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserDirectory.Api.Data;
using UserDirectory.Api.DTOs;
using UserDirectory.Api.Models;

namespace UserDirectory.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers(CancellationToken cancellationToken)
    {
        return Ok(await db.Users.AsNoTracking().OrderBy(x => x.Id).ToListAsync(cancellationToken));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<User>> GetUser(int id, CancellationToken cancellationToken)
    {
        var user = await db.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        return user is null ? NotFound(new { message = "User not found." }) : Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(UserRequest request, CancellationToken cancellationToken)
    {
        var user = new User
        {
            Name = request.Name.Trim(),
            Age = request.Age,
            City = request.City.Trim(),
            State = request.State.Trim(),
            Pincode = request.Pincode.Trim()
        };

        db.Users.Add(user);
        await db.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<User>> UpdateUser(int id, UserRequest request, CancellationToken cancellationToken)
    {
        var user = await db.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (user is null)
            return NotFound(new { message = "User not found." });

        user.Name = request.Name.Trim();
        user.Age = request.Age;
        user.City = request.City.Trim();
        user.State = request.State.Trim();
        user.Pincode = request.Pincode.Trim();

        await db.SaveChangesAsync(cancellationToken);
        return Ok(user);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteUser(int id, CancellationToken cancellationToken)
    {
        var user = await db.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (user is null)
            return NotFound(new { message = "User not found." });

        db.Users.Remove(user);
        await db.SaveChangesAsync(cancellationToken);
        return NoContent();
    }
}
