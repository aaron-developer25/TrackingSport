using System.ComponentModel.DataAnnotations;

namespace Shared.Models;

public class EstadisticaEquipos
{
    [Key]
    public int EstadisticaEquipoId { get; set; }
    public int EquipoId { get; set; }
    public int GP { get; set; }  // Juegos jugados
    public int W { get; set; }   // Ganados
    public int L { get; set; }   // Perdidos
    public float WP { get; set; } // Porcentaje de victorias
    public float PPG { get; set; } // Puntos por partido
    public float PAPG { get; set; } // Puntos permitidos por partido
    public float PD { get; set; } // Diferencia de puntos
    public int HR { get; set; }  // Récord en casa (Home Record)
    public int AR { get; set; }  // Récord de visitante (Away Record)
    public int R { get; set; }   // Racha (Streak)
    public int PC { get; set; }  // Posición en conferencia
}