using Microsoft.Data.SqlClient;

namespace backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class RoleBasedController : ControllerBase
{
    private readonly UserManager<Osoba> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    private DataContext _context { get; set; }
    public RoleBasedController(
        UserManager<Osoba> userManager,
        RoleManager<IdentityRole> roleManager,
        DataContext context)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _context = context;
    }

    [HttpGet("admin")]
    [Authorize(Policy = "RequireAdminRole")]
    public IActionResult GetAdminData()
    {
        return Ok("This is protected data for Admins only.");
    }

    [HttpGet("manager")]
    [Authorize(Policy = "RequireManagerRole")]
    public IActionResult GetManagerData()
    {
        return Ok("This is protected data for Managers only.");
    }

    [HttpGet("kuvar")]
    [Authorize(Policy = "RequireKuvarRole")]
    public IActionResult GetKuvarData()
    {
        return Ok("This is protected data for Kuvar only.");
    }

    [HttpGet("konobar")]
    [Authorize(Policy = "RequireKonobarRole")]
    public IActionResult GetKonobarData()
    {
        return Ok("This is protected data for Konobar only.");
    }

    [HttpGet("sanker")]
    [Authorize(Policy = "RequiresankerRole")]
    public IActionResult GetSankerData()
    {
        return Ok("This is protected data for Sanker only.");
    }

    [HttpGet("anyrole")]
    [Authorize(Roles = "Admin, Manager, Kuvar, Konobar, Sanker, Musterija")]
    public IActionResult GetAnyRoleData()
    {
        return Ok("This is protected data for everyone");
    }

    [HttpGet]
    public IActionResult GetRoles()
    {
        string[] roleNames = { "Admin", "Manager", "Kuvar", "Konobar", "Sanker", "Musterija" };
        return Ok(roleNames);
    }
    
    [HttpPost("AddRoleToUser")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> AddRoleToUser(string userId, string role)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            if (!await _roleManager.RoleExistsAsync(role))
            {
            return BadRequest("Role does not exist");
            }

            var currentRoles = await _userManager.GetRolesAsync(user);
            var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeResult.Succeeded)
            {
                return BadRequest("Failed to remove existing roles from user");
            }

            var result = await _userManager.AddToRoleAsync(user, role);
            if (!result.Succeeded)
            {
                return BadRequest("Failed to add role to user");
            }
            
            string sqlQuery = "UPDATE AspNetUsers SET TipOsobe = @TipOsobe WHERE Id = @UserId";

            switch (role)
            {
                case "Menadzer":
                    await _context.Database.ExecuteSqlRawAsync(sqlQuery, new SqlParameter("@TipOsobe", "Menadzer"), new SqlParameter("@UserId", userId));
                    break;
                case "Konobar":
                    await _context.Database.ExecuteSqlRawAsync(sqlQuery, new SqlParameter("@TipOsobe", "Konobar"), new SqlParameter("@UserId", userId));
                    break;
                case "Kuvar":
                    await _context.Database.ExecuteSqlRawAsync(sqlQuery, new SqlParameter("@TipOsobe", "Kuvar"), new SqlParameter("@UserId", userId));
                    break;
                case "Sanker":
                    await _context.Database.ExecuteSqlRawAsync(sqlQuery, new SqlParameter("@TipOsobe", "Sanker"), new SqlParameter("@UserId", userId));
                    break;
                case "Musterija":
                    await _context.Database.ExecuteSqlRawAsync(sqlQuery, new SqlParameter("@TipOsobe", "Musterija"), new SqlParameter("@UserId", userId));
                    break;
                default:
                    return BadRequest("Invalid role");
            }
            await transaction.CommitAsync();

            return Ok("Role added to user, and user type updated");
        }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();

                return StatusCode(500, "Internal server error" + ex);
            }
    }

    [HttpPost("RemoveRoleFromUser/{userId}/{role}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> RemoveRoleFromUser(string userId, string role)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound("User not found");
        }

        if (!await _roleManager.RoleExistsAsync(role))
        {
            return BadRequest("Role does not exist");
        }

        var result = await _userManager.RemoveFromRoleAsync(user, role);
        if (result.Succeeded)
        {
            return Ok("Role removed from user");
        }

        return BadRequest("Failed to remove role from user");
    }

    [HttpPost("TransferUserAsync")]
    [Authorize(Roles ="Admin,Manager")]
    public async Task<bool> TransferUserAsync(string userId, string newRole)
    {
        var userEntity = await _context.Musterije.FindAsync(userId);
        if (userEntity == null)
        {
            return false;
        }

        switch (newRole)
        {
            case "Konobar":
                _context.Konobari.Add(new Konobar { Id = userEntity.Id, Ime = userEntity.Ime, Prezime = userEntity.Prezime,
                DatumZaposljavanja = DateOnly.FromDateTime(DateTime.Now), ZaposlenDo =  DateOnly.FromDateTime(DateTime.Now).AddYears(1),
                Plata = 50000});
                break;
            case "Kuvar":
                _context.Kuvari.Add(new Kuvar { Id = userEntity.Id, Ime = userEntity.Ime, Prezime = userEntity.Prezime,
                DatumZaposljavanja = DateOnly.FromDateTime(DateTime.Now), ZaposlenDo =  DateOnly.FromDateTime(DateTime.Now).AddYears(1),
                Plata = 50000});
                break;
            case "Sanker":
                _context.Sankeri.Add(new Sanker { Id = userEntity.Id, Ime = userEntity.Ime, Prezime = userEntity.Prezime,
                DatumZaposljavanja = DateOnly.FromDateTime(DateTime.Now), ZaposlenDo =  DateOnly.FromDateTime(DateTime.Now).AddYears(1),
                Plata = 50000});
                break;
            default:
                return false;
        }

        _context.Musterije.Remove(userEntity);
        await _context.SaveChangesAsync();

        return true;
    }
}