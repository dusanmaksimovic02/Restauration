namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class StoController : ControllerBase
{

    private DataContext context { get; set; }

    public StoController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet("Stolovi")]
    public async Task<ActionResult<List<Sto>>> GEtStolovi()
    {
        try
        {
            var s = await context.Stolovi.ToListAsync();

            return Ok(s);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("DodajSto")]
    public async Task<ActionResult<Sto>> DodajSto([FromBody] Sto sto)
    {
        try
        {
            context.Stolovi.Add(sto);
            await context.SaveChangesAsync();

            return Ok(sto);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniSto")]
    public async Task<ActionResult<Hrana>> UpdateSto([FromBody] Sto sto)
    {
        try
        {
            var s = await context.Stolovi.FirstOrDefaultAsync(x => x.Id == sto.Id) ?? throw new Exception
            ($"Sto sa zadatim id { sto.Id } ne postoji u bazi");
            context.Stolovi.Update(s);
            await context.SaveChangesAsync();

            return Ok($"Sto sa id {s.Id} je uspesno izmenjen");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("ZauzetiStolovi")]
    public async Task<ActionResult<List<Sto>>> ZauzetiStolovi()
    {
        try
        {
            var zauzetiStolovi = await context.Narudzbine
                    .Where(n => n.Status < Status.NarudzbinaPlacena && n.Sto != null)
                    .Select(n => n.Sto)
                    .Distinct()
                    .ToListAsync();

            return Ok(zauzetiStolovi);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiSto/{id}")]
    public async Task<ActionResult<Sto>> DeleteSto(int id)
    {
        try
        {
            var s = await context.Stolovi.FindAsync(id) ?? throw new Exception($"Nije pronadjen sto sa id {id}");
            context.Stolovi.Remove(s);
            await context.SaveChangesAsync();

            return Ok(s);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}