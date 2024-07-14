namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Policy = "RequireManagerRole")]
public class MenadzerController : ControllerBase
{
    private DataContext context { get; set; }
    public MenadzerController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet("Menadzeri")]
    public async Task<ActionResult<List<Menadzer>>> GetMenadzeri()
    {
        try
        {
            var menadzer = await context.Menadzeri.ToListAsync();
            return Ok(menadzer);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetMenadzerById/{id}")]
    public async Task<ActionResult<Kuvar>> GetMenadzerById(string id)
    {
        try
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception
                ($"Menadzer sa zadatim id { id } ne postoji u bazi");
                return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("DodajMenadzera")]
    public async Task<ActionResult<Menadzer>> DodajMenadzera([FromBody] Menadzer menadzer)
    {
        try
        {
            context.Menadzeri.Add(menadzer);
            await context.SaveChangesAsync();
            return Ok(menadzer);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniMenadzera")]
    public async Task<ActionResult<Menadzer>> UpdateMenadzer([FromBody] Menadzer menadzer)
    {
        try
        {
            var m = await context.Menadzeri.FirstOrDefaultAsync(x => x.Id == menadzer.Id) ?? throw new Exception
            ($"Menadzer sa zadatim id { menadzer.Id } ne postoji u bazi");
            context.Menadzeri.Update(m);
            await context.SaveChangesAsync();
            return Ok($" Menadzer sa id {m.Id} je uspesno izmenjen");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiMenadzera/{id}")]
    public async Task<ActionResult<Menadzer>> DeleteMenadzer(int id)
    {
        try
        {
            var menadzer = await context.Menadzeri.FindAsync(id) ?? throw new Exception($"Nije pronadjen menadzer sa id {id}");
            context.Menadzeri.Remove(menadzer);
            await context.SaveChangesAsync();
            return Ok(menadzer);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}