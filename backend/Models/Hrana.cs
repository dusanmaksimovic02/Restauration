namespace backend.Models;

public class Hrana : StavkaUMeniju
{
    public required List<string> Stastojci {get;set;}
    public required uint VremePripreme {get;set;}//vreme u minutima
}