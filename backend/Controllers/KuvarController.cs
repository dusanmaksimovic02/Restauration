namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Policy = "RequireKuvarRole")]
public class KuvarController : ControllerBase
{
    private DataContext context { get; set; }
    public KuvarController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet("GetKuvarById/{id}")]
    public async Task<ActionResult<Kuvar>> GetKuvarById(string id)
    {
        try
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception
                ($"Kuvar sa zadatim id { id } ne postoji u bazi");
                return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("Kuvari")]
    public async Task<ActionResult<List<Kuvar>>> GetKuvari()
    {
        try
        {
            var kuvari = await context.Kuvari.ToListAsync();
            return Ok(kuvari);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("DodajKuvara")]
    public async Task<ActionResult<Kuvar>> DodajKuvara([FromBody] Kuvar kuvar)
    {
        try
        {
            context.Kuvari.Add(kuvar);
            await context.SaveChangesAsync();
            return Ok(kuvar);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniKuvara")]
    public async Task<ActionResult<Kuvar>> UpdateKuvar([FromBody] Kuvar kuvar)
    {
        try
        {
            var kuvarUpdate = await context.Kuvari.FirstOrDefaultAsync(x => x.Id == kuvar.Id) ?? throw new Exception
            ($"Kuvar sa zadatim id { kuvar.Id } ne postoji u bazi");
            context.Kuvari.Update(kuvarUpdate);
            await context.SaveChangesAsync();
            return Ok($" Kuvar sa id {kuvar.Id} je uspesno izmenjen");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiKuvara/{id}")]
    public async Task<ActionResult<Kuvar>> DeleteKuvar(int id)
    {
        try
        {
            var kuvar = await context.Kuvari.FindAsync(id) ?? throw new Exception($"Nije pronadjen kuvar sa id {id}");
            context.Kuvari.Remove(kuvar);
            await context.SaveChangesAsync();
            return Ok(kuvar);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}