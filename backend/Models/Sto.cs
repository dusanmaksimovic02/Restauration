using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Sto
{
    [Key]
    public int Id { get; set; }
    [MaxLength(50)]
    public required string Naziv { get; set; }
    public required uint Kapacitet { get; set; }
}