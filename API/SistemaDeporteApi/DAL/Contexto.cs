using Microsoft.EntityFrameworkCore;
using Shared.Models;

namespace SistemaDeporteApi.DAL;

public class Contexto: DbContext
{
    public Contexto(DbContextOptions<Contexto> options): base(options) { }

    public DbSet<Jugadores> Jugadores { get; set; }
    public DbSet<Ajustes> Ajustes { get; set; }
    public DbSet<Equipos> Equipos { get; set; }
    public DbSet<Partidos> Partidos { get; set; }
    public DbSet<EstadisticaEquipos> EstadisticaEquipos { get; set; }
    public DbSet<EstadisticaJugadores> EstadisticaJugadores { get; set; }
}
