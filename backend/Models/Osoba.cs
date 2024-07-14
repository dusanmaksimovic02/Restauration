using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public abstract class Osoba : IdentityUser
{
    [MaxLength(30)]
    public required string Ime { get; set; }
    [MaxLength(50)]
    public required string Prezime { get; set; }
    [RegularExpression("^(m|z|o)$", ErrorMessage = "Pol može biti 'm', 'z' ili 'o'.")]
    [MaxLength(1)]
    public string? Pol { get; set; }
    public DateOnly DatumRodjenja { get; set; }
    [MaxLength(100)]
    public string? Adresa { get; set; }
    [MaxLength(100)]
    public string? Grad { get; set; }
    [MaxLength(255)]
    [Url(ErrorMessage = "Unesite validan URL.")]
    public string? SlikaUrl { get; set; }
    public string? TokenForgotPassword { get; internal set; }
    public DateTime ForgotPasswordExp { get; internal set; }
    public string? TipOsobe { get; set; }
}