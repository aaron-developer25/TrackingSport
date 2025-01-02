using System.ComponentModel.DataAnnotations;

namespace Shared.Models;

public class EstadisticaJugadores
{
    [Key]
    public int EstadisticaJugadorId { get; set; }
    public int JugadorId { get; set; }
    public float PPG { get; set; }  // Puntos por juego
    public float APG { get; set; }  // Asistencias por juego
    public float RPG { get; set; }  // Rebotes por juego
    public float SPG { get; set; }  // Robos por juego
    public float BPG { get; set; }  // Bloqueos por juego
    public float FG { get; set; }  // Porcentaje de tiros de campo
    public float TRESP { get; set; }  // Porcentaje de triples
    public float FT { get; set; }  // Porcentaje de tiros libres
    public float MPG { get; set; }  // Minutos por juego
    public float TO { get; set; }  // Pérdidas de balón
}