using System.ComponentModel.DataAnnotations;

namespace Shared.Models;

public class Jugadores
{
    [Key]
    public int JugadorId { get; set; }
    public int EquipoId { get; set; }
    public string? Nombre { get; set; }
    public string? Apellido { get; set; }
    public string? Sexo { get; set; }
    public string? Nacionalidad { get; set; }
}