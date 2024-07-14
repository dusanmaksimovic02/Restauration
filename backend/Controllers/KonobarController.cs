namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Policy = "RequireKonobarRole")]
public class KonobarController : ControllerBase
{
    private DataContext context { get; set; }

    public KonobarController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet("GetKonobarById/{id}")]
    public async Task<ActionResult<Konobar>> GetKonobarById(string id)
    {
        try
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception
                ($"Konobar sa zadatim id { id } ne postoji u bazi");
                return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("Konobari")]
    public async Task<ActionResult<List<Konobar>>> GetKonobare()
    {
        try
        {
            var konobari = await context.Konobari.ToListAsync();
            return Ok(konobari);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("DodajKonobara")]
    public async Task<ActionResult<Konobar>> DodajKonobara([FromBody] Konobar konobar)
    {
        try
        {
            context.Konobari.Add(konobar);
            await context.SaveChangesAsync();
            return Ok(konobar);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniKonobara")]
    public async Task<ActionResult<Konobar>> UpdateKonobara([FromBody] Konobar konobar)
    {
        try
        {
            var konobarUpdate = await context.Konobari.FirstOrDefaultAsync(x => x.Id == konobar.Id) ?? throw new Exception
            ($"Konobar sa zadatim id { konobar.Id } ne postoji u bazi");
            context.Konobari.Update(konobarUpdate);
            await context.SaveChangesAsync();
            return Ok($" Konobar sa id {konobar.Id} je uspesno izmenjen");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiKonobara/{id}")]
    public async Task<ActionResult<Konobar>> DeleteKonobara(int id)
    {
        try
        {
            var konobar = await context.Konobari.FindAsync(id) ?? throw new Exception($"Nije pronadjen konobar sa id {id}");
            context.Konobari.Remove(konobar!);
            await context.SaveChangesAsync();
            return Ok(konobar);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniPlatu/{id}/{plata}")]
    public async Task<ActionResult<Konobar>> UpdatePlata(int id, double plata)
    {
        try
        {
            var konobar = await context.Konobari.FindAsync(id) ?? throw new Exception($"Nije pronadjen konobar sa id {id}");
            konobar.Plata = plata;
            context.Konobari.Update(konobar);
            await context.SaveChangesAsync();
            return Ok(konobar);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}