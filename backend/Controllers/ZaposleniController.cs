namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
//[Authorize(Policy = "RequireKonobarRole")]
public class ZaposleniController : ControllerBase
{
    private DataContext context { get; set; }

    public ZaposleniController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet("GetZaposleniById/{id}")]
    public async Task<ActionResult<Zaposlen>> GetZaposleniById(string id)
    {
        try
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception
                ($"Zaposleni sa zadatim id { id } ne postoji u bazi");

            return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("Zaposleni")]
    public async Task<ActionResult<List<Zaposlen>>> Zaposleni()
    {
        try
        {
            var konobari = await context.Konobari.ToListAsync();
            var kuvari = await context.Kuvari.ToListAsync();
            var sankeri = await context.Sankeri.ToListAsync();
            var zaposleni = new List<Zaposlen>();

            foreach (var k in konobari)
            {
                zaposleni.Add(k);
            }

            foreach (var k in kuvari)
            {
                zaposleni.Add(k);
            }

            foreach (var k in sankeri)
            {
                zaposleni.Add(k);
            }

            return Ok(zaposleni);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("IzmeniZaposlenog")]
    public async Task<ActionResult<Zaposlen>> IzmeniZaposlenog([FromBody] Zaposlen zap)
    {
        try
        {
            var a = await context.Users.FirstOrDefaultAsync(x => x.Id == zap.Id) ?? throw new Exception
            ($"Zaposleni sa zadatim id { zap.Id } ne postoji u bazi");

            var user = (Zaposlen)a;
            user.Ime=zap.Ime;
            user.Prezime=zap.Prezime;
            user.Pol=zap.Pol;
            user.DatumRodjenja=zap.DatumRodjenja;
            user.Adresa=zap.Adresa;
            user.Grad=zap.Grad;
            user.DatumZaposljavanja=zap.DatumZaposljavanja;
            user.ZaposlenDo=zap.ZaposlenDo;
            user.Plata=zap.Plata;

            switch (user.TipOsobe)
            {
                case "Konobar":{
                    var ab=(Konobar)user;
                    context.Konobari.Update(ab);
                    await context.SaveChangesAsync();

                    return Ok($" Zaposleni sa id {user.Id} je uspesno izmenjen");
                }
                case "Kuvar":{
                    var ab=(Kuvar)user;
                    context.Kuvari.Update(ab);
                    await context.SaveChangesAsync();

                    return Ok($" Zaposleni sa id {user.Id} je uspesno izmenjen");
                }
                case "Sanker":{
                    var ab=(Sanker)user;
                    context.Sankeri.Update(ab);
                    await context.SaveChangesAsync();

                    return Ok($" Zaposleni sa id {user.Id} je uspesno izmenjen");
                }
                default:{
                    return BadRequest("Greska");
                }
            }     
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}