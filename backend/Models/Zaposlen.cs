using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public abstract class Zaposlen : Osoba
{
    public required DateOnly DatumZaposljavanja { get; set; } 
    public required DateOnly ZaposlenDo { get; set; }
    public required double Plata { get; set; }
    public List<Narudzbina>? Narudzbine {get;set;}
    public Zaposlen()
    {
    }
}