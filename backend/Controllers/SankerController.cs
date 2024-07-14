namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Policy = "RequireSankerRole")]
public class SankerController : ControllerBase
{

    private DataContext context { get; set; }

    public SankerController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet("GetSankerById/{id}")]
    public async Task<ActionResult<Sanker>> GetSankerById(string id)
    {
        try
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception
                ($"Sanker sa zadatim id { id } ne postoji u bazi");

            return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("Sankeri")]
    public async Task<ActionResult<List<Sanker>>> GetSankeri()
    {
        try
        {
            var sankeri = await context.Sankeri.ToListAsync();

            return Ok(sankeri);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("DodajSankera")]
    public async Task<ActionResult<Sanker>> DodajSankera([FromBody] Sanker sanker)
    {
        try
        {
            context.Sankeri.Add(sanker);
            await context.SaveChangesAsync();

            return Ok(sanker);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniSankera")]
    public async Task<ActionResult<Sanker>> UpdateSanker([FromBody] Sanker sanker)
    {
        try
        {
            var sankerUpdate = await context.Sankeri.FirstOrDefaultAsync(x => x.Id == sanker.Id) ?? throw new Exception
            ($"Sanker sa zadatim id { sanker.Id } ne postoji u bazi");
            context.Sankeri.Update(sankerUpdate);
            await context.SaveChangesAsync();

            return Ok($" Sanker sa id {sanker.Id} je uspesno izmenjen");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiSankera/{id}")]
    public async Task<ActionResult<Sanker>> DeleteSanker(int id)
    {
        try
        {
            var sanker = await context.Sankeri.FindAsync(id) ?? throw new Exception($"Nije pronadjen sanker sa id {id}");
            context.Sankeri.Remove(sanker);
            await context.SaveChangesAsync();

            return Ok(sanker);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}