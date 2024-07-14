namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class HranaController : ControllerBase
{

    private DataContext context { get; set; }
    private readonly GoogleCloudStorageService _storageService;

    public HranaController(DataContext context,GoogleCloudStorageService storageService)
    {
        this.context = context;
        _storageService=storageService;
    }

    [HttpGet("Hrana")]
    public async Task<ActionResult<List<Hrana>>> GetHrana()
    {
        try
        {
            var h = await context.Hrana.ToListAsync();
            return Ok(h);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetSpecificHrana")]
    public async Task<ActionResult<List<Hrana>>> GetSpecificHrana()
    {
        try
        {
            var specificnaHrana = new List<string>
            {
                "Cezar salata",
                "Krem supa od pecuraka",
                "Piletina u gorgonzola sosu",
                "Karadjordjeva šnicla",
                "Cheesecake",
                "Palacinke sa nutellom"
            };

            return await context.Hrana
                .Where(h => specificnaHrana.Contains(h.Naziv))
                .ToListAsync();
        } 
        catch(Exception e) 
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("DodajHranu")]
    public async Task<ActionResult<Hrana>> DodajHranu([FromBody] Hrana hrana)
    {
        try
        {
            context.Hrana.Add(hrana);
            await context.SaveChangesAsync();
            return Ok(hrana);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniHranu")]
    public async Task<ActionResult<Hrana>> UpdateHrana([FromBody] Hrana hrana)
    {
        try
        {
            var h = await context.Hrana.FirstOrDefaultAsync(x => x.Id == hrana.Id) ?? throw new Exception
            ($"Hrana sa zadatim id { hrana.Id } ne postoji u bazi");
            context.Hrana.Update(h);
            await context.SaveChangesAsync();
            return Ok($" Hrana sa id {h.Id} je uspesno izmenjena");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiHranu/{id}")]
    public async Task<ActionResult<Hrana>> DeleteHrana(int id)
    {
        try
        {
            var h = await context.Hrana.FindAsync(id) ?? throw new Exception($"Nije pronadjena hrana sa id {id}");
            context.Hrana.Remove(h);
            await context.SaveChangesAsync();
            return Ok(h);
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

        var hrana = await context.Hrana.FindAsync(id);
        if (hrana != null)
        {
            hrana.SlikaUrl = url;
            await context.SaveChangesAsync();
        }

        return Ok(new { Url = url });
    }
}