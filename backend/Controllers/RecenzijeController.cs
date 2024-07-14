namespace backend.Controllers;

[ApiController]
[Route("[controller]")]


public class RecenzijaController : ControllerBase
{
    
    private DataContext context { get; set; }

    public RecenzijaController(DataContext context)
    {
        this.context = context;
    }
    
    [HttpGet("Recenzija")]
    public async Task<ActionResult<List<Recenzija>>> GetRecenzije()
    {
        try
        {
            var r = await context.Recenzije.ToListAsync();
            
            return Ok(r);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("DodajRecenziju/{id}/{ocena}/{naslov}/{tekst}/{datumPostavljivanja}")]
    public async Task<ActionResult<Recenzija>> DodajRecenziju(string id, int ocena, string naslov, string tekst, string datumPostavljivanja)
    {
        try
        {   
            var osoba = await context.Users.FindAsync(id);
            
            var recenzija1 = new Recenzija { 
                Ocena = ocena,
                Musterija = (Musterija)osoba!,
                Naslov = naslov,
                Tekst = tekst,
                DatumPostavljanja = DateOnly.FromDateTime(DateTime.Now)
            };

            context.Recenzije.Add(recenzija1);
            await context.SaveChangesAsync();

            return Ok(recenzija1);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniRecenziju")]
    public async Task<ActionResult<Recenzija>> UpdateRecenzija([FromBody] Recenzija recenzija)
    {
        try
        {
            var r = await context.Recenzije.FirstOrDefaultAsync(x => x.Id == recenzija.Id) ?? throw new Exception
            ($"Recenzija sa zadatim id { recenzija.Id } ne postoji u bazi");
            context.Recenzije.Update(r);
            await context.SaveChangesAsync();

            return Ok($" Recenzija sa id {r.Id} je uspesno izmenjena");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiRecenziju/{id}")]
    public async Task<ActionResult<Recenzija>> DeleteRecenzija(int id)
    {
        try
        {
            var r = await context.Recenzije.FindAsync(id) ?? throw new Exception($"Nije pronadjena recenzija sa id {id}");
            context.Recenzije.Remove(r);
            await context.SaveChangesAsync();

            return Ok(r);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("ProsecnaOcena")]
    public async Task<ActionResult<double>> GetProsecnaOcena()
    {
        try
        {
            var prosecnaOcena = await context.Recenzije.AverageAsync(r => r.Ocena);

            return Ok(prosecnaOcena);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}