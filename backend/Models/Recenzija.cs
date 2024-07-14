
namespace backend.Models;

public class Recenzija
{
    [Key]
    public int Id {get;set;}
    
    public required int Ocena {get;set;}
    
    [ForeignKey("FKMusterija")]
    public required Musterija Musterija {get;set;}
    [MaxLength(30)]
    public required string Naslov{get;set;}
    
    public required string Tekst{get;set;}
    
    public required DateOnly DatumPostavljanja { get; set; }
}