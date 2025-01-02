using System.ComponentModel.DataAnnotations;

namespace Shared.Models;

public class Ajustes
{
    [Key]
    public int AjusteId { get; set; }
    public float PorcentajeRegular { get; set; }
    public float PorcentajeBueno { get; set; }
    public float PorcentajeMuyBueno { get; set; }
    public float PorcentajeExcelente { get; set; }
    public string? PartidoActual { get; set; }
}