namespace backend.Models;

public enum Status{
    NarudzbinaPoslata,
    NarudzbinaPrimljena,
    NarudzbinaUPripremi,
    NarudzbinaSpremna,
    NarudzbinaSeDostavlja,
    NarudzbinaDostavljena,
    NarudzbinaZaplacanje,
    NarudzbinaPlacena
}

public abstract class StavkaUMeniju
{
    [Key]
    public int Id {get;set;}
    public required string Naziv {get;set;}
    public required uint Kolicina {get;set;}
    public required double Cena {get;set;}
    [MaxLength(255)]
    [Url(ErrorMessage = "Unesite validan URL.")]
    public string? SlikaUrl { get; set; }
}