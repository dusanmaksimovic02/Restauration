using Microsoft.Identity.Client;

namespace backend.Controllers;

public class UpdateOsoba
{
    public string? Ime { get; set; }
    public string? Prezime { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Pol { get; set; }
    
    public DateOnly? DatumRodjenja { get; set; }
    public string? Adresa { get; set; }
    public string? Grad { get; set; }
    public string? SlikaUrl { get; set; }
}

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "Admin,Manager,Kuvar,Konobar,Sanker,Musterija")]
public class UserController : ControllerBase
{
    private DataContext context { get; set; }

    public UserController(DataContext context)
    {
        this.context = context;
    }

    [HttpPut("IzmeniKorisnika/{id}")]
    public async Task<ActionResult<Osoba>> IzmeniKorisnika(string id, [FromBody] UpdateOsoba AzuriraniPodaci)
    {
        try
        {
            var osoba = await context.Users.FindAsync(id);
            if (osoba is null)
            {
                return NotFound($"User sa zadatim ID-jem ne postoji u bazi");
            }

            osoba.Ime = AzuriraniPodaci.Ime ?? osoba.Ime;
            osoba.Prezime = AzuriraniPodaci.Prezime?? osoba.Prezime;
            osoba.UserName = AzuriraniPodaci.Username?? osoba.UserName;
            osoba.Email = AzuriraniPodaci.Email?? osoba.Email;
            osoba.PhoneNumber = AzuriraniPodaci.Phone?? osoba.PhoneNumber;
            osoba.Pol = AzuriraniPodaci.Pol?? osoba.Pol;
            osoba.DatumRodjenja = AzuriraniPodaci.DatumRodjenja?? osoba.DatumRodjenja;
            osoba.Adresa = AzuriraniPodaci.Adresa?? osoba.Adresa;
            osoba.Grad = AzuriraniPodaci.Grad?? osoba.Grad;

            context.Users.Update(osoba);
            await context.SaveChangesAsync();

            return Ok($" Osoba sa username {osoba.UserName} je uspesno izmenjena");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("NonCustomerAndAdminUsers")]
    public async Task<ActionResult<List<Osoba>>> GetNonCustomerAndAdminUsers()
    {
        try
        {
            var users = await context.Users
                .Where(u => !(u is Musterija) && !(u is Admin))
                .ToListAsync();

            return Ok(users);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("ObrisiOsobu/{id}")]
    [Authorize(Roles ="Admin")]
    public async Task<ActionResult<Osoba>> ObrisiOsobu(string id)
    {
        try
        {
            var x = await context.Users.FirstOrDefaultAsync(x=>x.Id==id) ?? throw new Exception();
            context.Users.Remove(x);
            await context.SaveChangesAsync();

            return Ok(x);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}