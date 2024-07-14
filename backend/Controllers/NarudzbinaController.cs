using Microsoft.Data.SqlClient;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "Konobar, Musterija, Admin, Menadzer, Sanker, Kuvar")]
public class NarudzbinaController : ControllerBase
{
    private DataContext context { get; set; }

    public NarudzbinaController(DataContext context)
    {
        this.context = context;
    }

    [HttpPut("{id}/{status}")]
    public async Task<IActionResult> PromeniStatus(int id, int status)
    {
        try
        {
            var narudzbina = await context.Narudzbine.FindAsync(id);
            if (narudzbina == null)
            {
                return NotFound();
            }
    
            narudzbina.Status = (Status)status;
            await context.SaveChangesAsync();
    
            return Ok();
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("GetHranaFromNH/{id}")]
    public async Task<ActionResult<Hrana>> GetHranaFromNH(List<NarudzbinaHrana> l,int id)
    {
        List<string> hranas = new List<string>();
        try
        {
            foreach(var item in l){
                var hrana = await context.NarudzbinaHrana
                                            .Include(x=>x.Hrana)
                                            .Where(x=>x.HranaId == item.HranaId)
                                            .Where(x=>x.NarudzbinaId == id)
                                            .ToListAsync();
                hranas.Add(item.Hrana!.Naziv);
            }
            return Ok(hranas);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("GetPiceFromNP/{id}")]
    public async Task<ActionResult<Pice>> GetPiceFromNP(List<NarudzbinaPice> l,int id)
    {
        List<string> hranas = new List<string>();
        try
        {
            foreach(var item in l){
                var hrana = await context.NarudzbinaPice
                                            .Include(x=>x.Pice)
                                            .Where(x=>x.PiceId == item.PiceId)
                                            .Where(x=>x.NarudzbinaId == id)
                                            .ToListAsync();
                hranas.Add(item.Pice!.Naziv);
            }

            return Ok(hranas);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("{narudzbinaId}/Hrana")]
    public async Task<ActionResult<List<Hrana>>> GetHranaZaNarudzbinu(int narudzbinaId)
    {
        try
        {
            var hranaZaNarudzbinu = await context.NarudzbinaHrana
                .Where(nh => nh.NarudzbinaId == narudzbinaId)
                .Include(nh => nh.Hrana)
                .Select(nh => nh.Hrana)
                .ToListAsync();

            if (hranaZaNarudzbinu == null || hranaZaNarudzbinu.Count == 0)
            {
                return NotFound("Nema hrane za prosleđenu narudžbinu.");
            }
            
            return Ok(hranaZaNarudzbinu);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Server error: {ex.Message}");
        }
    }

    [HttpGet("{narudzbinaId}/Pice")]
    public async Task<ActionResult<List<Pice>>> GetPiceZaNarudzbinu(int narudzbinaId)
    {
        try
        {
            var piceZaNarudzbinu = await context.NarudzbinaPice
                .Where(np => np.NarudzbinaId == narudzbinaId)
                .Include(np => np.Pice)
                .Select(np => np.Pice)
                .ToListAsync();
                
            if (piceZaNarudzbinu == null || piceZaNarudzbinu.Count == 0)
            {
                return NotFound("Nema pića za prosleđenu narudžbinu.");
            }

            return Ok(piceZaNarudzbinu);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Server error: {ex.Message}");
        }
    }

    [HttpGet("GetPrimljeneHrana")]
    public async Task<ActionResult<Narudzbina>> GetPrimljeneHrana()
    {
        try
        {
            var narudzbine = await context.Narudzbine
                                            .Where(x => x.Status == Status.NarudzbinaPrimljena)
                                            .Include(n => n.NarudzbinaHrana)
                                            .ThenInclude(nh => nh.Hrana)
                                            .ToListAsync();

            var result = narudzbine
                            .Where(n => n.NarudzbinaHrana.Count != 0) 
                            .Select(n => new
                            {
                                n.Id,
                                n.Cena,
                                n.VremePripreme,
                                n.Status,
                                Hrana = n.NarudzbinaHrana.Select(nh => new {
                                    nh.Hrana,
                                    nh.KolicinaZaPripremu
                                }).ToList()
                            })
                            .ToList();

            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetPrimljenePica")]
    public async Task<ActionResult<List<Narudzbina>>> GetPrimljenePice()
    {
        try
        {
            var narudzbine = await context.Narudzbine
                                            .Where(x => x.Status == Status.NarudzbinaPrimljena)
                                            .Include(n => n.NarudzbinaPice)
                                            .ThenInclude(np => np.Pice)
                                            .ToListAsync();

            var result = narudzbine
                            .Where(n => n.NarudzbinaPice.Any())
                            .Select(n => new
                            {
                                n.Id,
                                n.Cena,
                                n.VremePripreme,
                                n.Status,
                                Pice = n.NarudzbinaPice.Select(np => new {
                                    np.Pice,
                                    np.KolicinaZaPripremu
                                    }).ToList()
                            })
                            .ToList();

            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetSpremne")]
    public async Task<ActionResult<Narudzbina>> GetSpremne()
    {
        try
        {
            var narudzbine = await context.Narudzbine
                                        .Where(x => x.Status == Status.NarudzbinaSpremna && x.Sto != null) 
                                        .Include(n => n.Sto) 
                                        .Include(n => n.Musterija)
                                        .ToListAsync();

            var result = narudzbine.Select(n => new
            {
                n.Id,
                n.Status,
                Sto = n.Sto != null ? new { n.Sto.Id, n.Sto.Naziv } : null, 
                n.Musterija
            });

            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetDostavljene")]
    public async Task<ActionResult<Narudzbina>> GetDostavljene()
    {
        try
        {
            var narudzbine = await context.Narudzbine
                                        .Where(x => x.Status == Status.NarudzbinaDostavljena) 
                                        .Include(n => n.Musterija)
                                        .ToListAsync();

            return Ok(narudzbine);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetZaPlacanje")]
    public async Task<ActionResult<Narudzbina>> GetZaPlacanje()
    {
        try
        {
            var narudzbine = await context.Narudzbine
                                        .Where(x => x.Status == Status.NarudzbinaZaplacanje && x.Sto != null) 
                                        .Include(n => n.Sto) 
                                        .ToListAsync();

            var result = narudzbine.Select(n => new
            {
                n.Id,
                n.Status,
                n.Cena,
                Sto = n.Sto != null ? new { n.Sto.Id, n.Sto.Naziv } : null, 
            });

            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("ListaHrane")]
    public async Task<ActionResult<List<NarudzbinaHrana>>> ListaHrane(int id)
    {
        try{
            var hrana = await context.NarudzbinaHrana
                                        .Where(x=>x.NarudzbinaId==id)
                                        .ToListAsync();
            return Ok(hrana);
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [HttpGet("ListaPica")]
    public async Task<ActionResult<List<NarudzbinaPice>>> ListaPica(int id)
    {
        try
        {
            var pice = await context.NarudzbinaPice
                                        .Where(x=>x.NarudzbinaId==id)
                                        .ToListAsync();

            return Ok(pice);
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetNarudzbinaById")]
    public async Task<ActionResult<Narudzbina>> GetNarudzbinaById([FromBody] int id)
    {
        try
        {
            var order = await context.Narudzbine.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception
                ($"Narudzbina sa zadatim id { id } ne postoji u bazi");

                return Ok(order);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("NarudbineMusterije/{id}")]
    public async Task<ActionResult<Narudzbina>> NarudzbineMusterije(string id)
    {
        try
        {
            var ordersWithSto = await context.Narudzbine
            .Where(x => x.Musterija.Id == id)
            .Include(n => n.Sto)
            .ToListAsync();

            var ordersWithHrana = await context.Narudzbine
            .Where(x => x.Musterija.Id == id)
            .Include(n => n.NarudzbinaHrana)
            .ThenInclude(nh => nh.Hrana)
            .ToListAsync();

            var resultOrderWithHrana = ordersWithHrana
                            .Where(n => n.NarudzbinaHrana.Count != 0) 
                            .Select(n => new
                            {
                                n.Id,
                                n.Cena,
                                n.VremePripreme,
                                n.Status,
                                Hrana = n.NarudzbinaHrana.Select(nh => new {
                                    nh.Hrana,
                                    nh.KolicinaZaPripremu
                                }).ToList()
                            })
                            .ToList();

            var ordersWithPica  = await context.Narudzbine
            .Where(x => x.Musterija.Id == id)
            .Include(n => n.NarudzbinaPice)
            .ThenInclude(np => np.Pice)
            .ToListAsync();

            var resultOrderWithPica = ordersWithPica
                .Where(n => n.NarudzbinaPice.Count != 0)
                .Select(n => new
                {
                    n.Id,
                    n.Cena,
                    n.VremePripreme,
                    n.Status,
                    Pice = n.NarudzbinaPice.Select(np => new {
                        np.Pice,
                        np.KolicinaZaPripremu
                        }).ToList()
                })
                .ToList();

            var combinedResult = ordersWithSto.Select(order => new
            {
                order.Id,
                order.Cena,
                order.VremePripreme,
                order.Status,
                order.Sto,
                Hrana = resultOrderWithHrana.FirstOrDefault(o => o.Id == order.Id)?.Hrana,
                Pice = resultOrderWithPica.FirstOrDefault(o => o.Id == order.Id)?.Pice
            }).ToList();

            return Ok(combinedResult);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("Narudzbine")]
    public async Task<ActionResult<List<Narudzbina>>> GetNarudbine()
    {
        try
        {
            var narudzbine = await context.Narudzbine.ToListAsync();
            foreach (var item in narudzbine)
            {
                var hranaResponse = await ListaHrane(item.Id);
                if (hranaResponse.Result is OkObjectResult okResultHrana && okResultHrana.Value is List<NarudzbinaHrana> hrana)
                {
                    item.NarudzbinaHrana.AddRange(hrana);
                }
                else
                {
                    Console.WriteLine("Failed to retrieve hrana for NarudzbinaId: " + item.Id);
                }

                var piceResponse = await ListaPica(item.Id);
                if (piceResponse.Result is OkObjectResult okResultPice && okResultPice.Value is List<NarudzbinaPice> pice)
                {
                    item.NarudzbinaPice.AddRange(pice);
                }
            }

            return Ok(narudzbine);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [HttpPost("DodajNarudzbinu")]
    public async Task<ActionResult<Narudzbina>> DodajNarudzbinu([FromBody] NarudzbinaDTO narudzbinaDTO)
    {
        try
        {
            var musterija = await context.Users.FindAsync(narudzbinaDTO.MusterijaId);
            if (musterija == null)
                return NotFound("Musterija nije pronađena");

            var sto = await context.Stolovi.FindAsync(narudzbinaDTO.Sto.Id);
            if (sto == null)
                return NotFound("Sto nije pronađen");

            var narudzbina = new Narudzbina
            {
                VremePripreme = narudzbinaDTO.VremePripreme,
                Cena = narudzbinaDTO.Cena,
                Musterija = (Musterija)musterija,
                Sto = sto,
                Status = narudzbinaDTO.Status
            };

            context.Narudzbine.Add(narudzbina);
            await context.SaveChangesAsync();

            var hranaList = new List<HranaWithKolicina>();
            foreach (var hranaItem in narudzbinaDTO.Hrana)
            {
                var hrana = await context.Hrana.FindAsync(hranaItem.Id);
                if (hrana == null)
                    return NotFound($"Hrana sa ID {hranaItem.Id} nije pronađena");

                if (hrana.Kolicina < hranaItem.Kolicina)
                    return BadRequest($"Nema dovoljno hrane: {hrana.Naziv}");

                hrana.Kolicina= (uint)(hrana.Kolicina - hranaItem.Kolicina);
                context.Hrana.Update(hrana);
                await context.SaveChangesAsync();
                hranaList.Add(new HranaWithKolicina{Hrana = hrana, KolicinaZaPripremu = hranaItem.Kolicina});
            }

            var piceList = new List<PicaWithKolicina>();
            foreach (var piceItem in narudzbinaDTO.Pice)
            {
                var pice = await context.Pica.FindAsync(piceItem.Id);
                if (pice == null)
                    return NotFound($"Pice sa ID {piceItem.Id} nije pronađeno");

                if (pice.Kolicina < piceItem.Kolicina)
                    return BadRequest($"Nema dovoljno pića: {pice.Naziv}");

                pice.Kolicina = (uint)(pice.Kolicina - piceItem.Kolicina);
                context.Pica.Update(pice);
                await context.SaveChangesAsync();
                piceList.Add(new PicaWithKolicina{Pica = pice, KolicinaZaPripremu = piceItem.Kolicina});
            }

            foreach(var hrana in hranaList)
            {
                NarudzbinaHrana nh = new NarudzbinaHrana
                {
                    Narudzbina = narudzbina,
                    Hrana = hrana.Hrana,
                    KolicinaZaPripremu = hrana.KolicinaZaPripremu
                };
                context.NarudzbinaHrana.Add(nh);
                await context.SaveChangesAsync();
            }

            foreach(var pice in piceList)
            {
                NarudzbinaPice np = new NarudzbinaPice
                {
                    Narudzbina = narudzbina,
                    Pice = pice.Pica,
                    KolicinaZaPripremu = pice.KolicinaZaPripremu
                };
                context.NarudzbinaPice.Add(np);
                await context.SaveChangesAsync();
            }

            return Ok("Narudzbina je uspesno dodata");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniNarudzbinu")]
    public async Task<ActionResult<Narudzbina>> UpdateNarudzbina([FromBody] Narudzbina narudzbina)
    {
        try
        {
            var n = await context.Narudzbine.FirstOrDefaultAsync(x => x.Id == narudzbina.Id) ?? throw new Exception
            ($"Narudzbina sa zadatim id { narudzbina.Id } ne postoji u bazi");
            context.Narudzbine.Update(n);
            await context.SaveChangesAsync();

            return Ok($" Narudzbina sa id {n.Id} je uspesno izmenjena");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("IzbrisiNArudzbinu/{id}")]
    public async Task<ActionResult<Narudzbina>> DeleteNarudzbina(int id)
    {
        try
        {
            var n = await context.Narudzbine.FindAsync(id) ?? throw new Exception($"Nije pronadjena narudzbina sa id {id}");
            context.Narudzbine.Remove(n);
            await context.SaveChangesAsync();

            return Ok(n);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}

public class NarudzbinaDTO
{
    public uint VremePripreme { get; set; }
    public double Cena { get; set; }
    public required string MusterijaId { get; set; }
    public required StoDto Sto { get; set; }
    public required List<HranaDto> Hrana { get; set; }
    public required List<PiceDto> Pice { get; set; }
    public Status Status { get; set; }
}

public class StoDto
{
    public int Id { get; set; }
}

public class HranaDto
{
    public int Id { get; set; }
    public int Kolicina { get; set; }
}

public class PiceDto
{
    public int Id { get; set; }
    public int Kolicina { get; set; }
}

public class NarudzbinaHranaDto
{
    public int NarudzbinaId { get; set; }
    public required List<Hrana?> HranaStavke { get; set; }
}

public class NarudzbinaPiceDto
{
    public int NarudzbinaId { get; set; }
    public required List<Pice?> PiceStavke { get; set; }
}

public class HranaWithKolicina
{
    public required Hrana Hrana { get; set; }
    public int KolicinaZaPripremu { get; set; }
}

public class PicaWithKolicina
{
    public required Pice Pica { get; set; }
    public int KolicinaZaPripremu { get; set; }
}