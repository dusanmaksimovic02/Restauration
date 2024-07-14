namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class PiceController : ControllerBase
{
    private readonly GoogleCloudStorageService _storageService;
    private DataContext context { get; set; }

    public PiceController(DataContext context,GoogleCloudStorageService storageService)
    {
        this.context = context;
        _storageService=storageService;
    }

    [HttpGet("Pice")]
    public async Task<ActionResult<List<Pice>>> GetPice()
    {
        try
        {
            var p = await context.Pica.ToListAsync();
            return Ok(p);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetSpecificPice")]
    public async Task<ActionResult<List<Pice>>> GetSpecificPice()
    {
        try
        {
            var specificnaPica = new List<string>
            {
                "Mojito",
                "Martini",
                "Pivo",
                "Espresso",
                "Coca Cola"
            };

            return await context.Pica
                .Where(h => specificnaPica.Contains(h.Naziv))
                .ToListAsync();
        } 
        catch(Exception e) 
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("DodajPice")]
    public async Task<ActionResult<Pice>> DodajPice([FromBody] Pice pice)
    {
        try
        {
            context.Pica.Add(pice);
            await context.SaveChangesAsync();

            return Ok(pice);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniPice")]
    public async Task<ActionResult<Pice>> UpdateHrana([FromBody] Pice pice)
    {
        try
        {
            var p = await context.Pica.FirstOrDefaultAsync(x => x.Id == pice.Id) ?? throw new Exception
            ($"Pice sa zadatim id { pice.Id } ne postoji u bazi");
            context.Pica.Update(p);
            await context.SaveChangesAsync();

            return Ok($" Pice sa id {p.Id} je uspesno izmenjeno");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiPice/{id}")]
    public async Task<ActionResult<Pice>> DeletePice(int id)
    {
        try
        {
            var p = await context.Pica.FindAsync(id) ?? throw new Exception($"Nije pronadjeno pice sa id {id}");
            context.Pica.Remove(p);
            await context.SaveChangesAsync();

            return Ok(p);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("uploadimagehrana")]
    [Authorize(Roles ="Admin,Manager")]
    public async Task<IActionResult> UploadImageHrana(IFormFile file,[FromBody] int id)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        var fileName = Path.GetFileName(file.FileName);
        using var stream = file.OpenReadStream();
        
        var url = await _storageService.UploadFileAsync(stream, fileName);

        var p = await context.Hrana.FindAsync(id);
        if (p != null)
        {
            p.SlikaUrl = url;
            await context.SaveChangesAsync();
        }

        return Ok(new { Url = url });
    }
}