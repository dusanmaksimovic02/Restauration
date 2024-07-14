using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Narudzbina
{
    [Key]
    public int Id {get;set;}
    public required uint VremePripreme {get;set;}//u minutima
    public required double Cena {get;set;}
    [ForeignKey("FKMusterija")]
    public required Musterija Musterija {get;set;}
    [ForeignKey("FKSto")]
    public Sto? Sto {get;set;}
    public List<NarudzbinaHrana> NarudzbinaHrana { get; set; } = new();
    public List<NarudzbinaPice> NarudzbinaPice { get; set; } = new();
    public List<Zaposlen>? Zaposleni {get;set;}
    public Status Status{get;set;}
    
}
public class NarudzbinaHrana
{
    [Key]
    public int Id { get; set; }
    public int NarudzbinaId { get; set; }
    [ForeignKey("NarudzbinaId")]
    public Narudzbina? Narudzbina { get; set; }
    public int HranaId { get; set; }
    [ForeignKey("HranaId")]
    public Hrana? Hrana { get; set; }
    public int KolicinaZaPripremu { get; set; } = 0;
}
public class NarudzbinaPice
{
    [Key]
    public int Id { get; set; }
    public int NarudzbinaId { get; set; }
    [ForeignKey("NarudzbinaId")]
    public Narudzbina? Narudzbina { get; set; }
    public int PiceId { get; set; }
    [ForeignKey("PiceId")]
    public Pice? Pice { get; set; }
    public int KolicinaZaPripremu { get; set; } = 0;
}