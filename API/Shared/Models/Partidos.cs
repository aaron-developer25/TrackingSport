using System.ComponentModel.DataAnnotations;

namespace Shared.Models;

public class Partidos
{
    [Key]
    public int PartidoId { get; set; }
    public string? Descripcion { get; set; }
    public string? Titulo { get; set; }
}
