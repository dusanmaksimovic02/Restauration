using Microsoft.Identity.Client;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "Admin, Manager, Musterija")]
public class MusterijaController : ControllerBase
{
    private DataContext context { get; set; }
    public MusterijaController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet("GetMusterijaById/{id}")]
    public async Task<ActionResult<Musterija>> GetMusterijaById(string id)
    {
        try
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception
                ($"Musterija sa zadatim id { id } ne postoji u bazi");
                return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("Musterije")]
    public async Task<ActionResult<List<Musterija>>> GetMusterije()
    {
        try
        {
            var musterija = await context.Musterije.ToListAsync();
            return Ok(musterija);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("DodajMusteriju")]
    public async Task<ActionResult<Musterija>> DodajMusteriju([FromBody] Musterija musterija)
    {
        try
        {
            context.Musterije.Add(musterija);
            await context.SaveChangesAsync();
            return Ok(musterija);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniMusteriju")]
    public async Task<ActionResult<Musterija>> UpdateMusterija([FromBody] Musterija musterija)
    {
        try
        {
            var m = await context.Musterije.FirstOrDefaultAsync(x => x.Id == musterija.Id) ?? throw new Exception
            ($"Musterija sa zadatim id { musterija.Id } ne postoji u bazi");
            context.Musterije.Update(m);
            await context.SaveChangesAsync();
            return Ok($" Musterija sa id {m.Id} je uspesno izmenjen");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiMusteriju/{id}")]
    public async Task<ActionResult<Musterija>> DeleteMusterija(int id)
    {
        try
        {
            var musterija = await context.Musterije.FindAsync(id) ?? throw new Exception($"Nije pronadjena musterija sa id {id}");
            context.Musterije.Remove(musterija);
            await context.SaveChangesAsync();
            return Ok(musterija);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}