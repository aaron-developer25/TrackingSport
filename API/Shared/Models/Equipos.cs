using System.ComponentModel.DataAnnotations;

namespace Shared.Models;

public class Equipos
{
    [Key]
    public int EquipoId { get; set; }
    public int PartidoId { get; set; }
    public string? Descripcion { get; set; }
    public string? Titulo { get; set; }
    public string? Pais { get; set; }
}