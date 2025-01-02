using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.Models;
using SistemaDeporteApi.DAL;

namespace SistemaDeporteApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EstadisticaJugadoresController(Contexto _context) : ControllerBase
{
    // GET: api/EstadisticaJugadores
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EstadisticaJugadores>>> GetEstadisticaJugadores()
    {
        return Ok(await _context.EstadisticaJugadores.ToListAsync());
    }

    // GET: api/EstadisticaJugadores/5
    [HttpGet("{id}")]
    public async Task<ActionResult<EstadisticaJugadores>> GetEstadisticaJugadores(int id)
    {
        var estadisticaJugadores = await _context.EstadisticaJugadores.FindAsync(id);

        if (estadisticaJugadores == null)
        {
            return NotFound();
        }

        return Ok(estadisticaJugadores);
    }

    // PUT: api/EstadisticaJugadores/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutEstadisticaJugadores(int id, EstadisticaJugadores estadisticaJugadores)
    {
        if (id != estadisticaJugadores.EstadisticaJugadorId)
        {
            return BadRequest();
        }

        _context.Entry(estadisticaJugadores).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EstadisticaJugadoresExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return Ok(NoContent());
    }

    // POST: api/EstadisticaJugadores
    [HttpPost]
    public async Task<ActionResult<EstadisticaJugadores>> PostEstadisticaJugadores(EstadisticaJugadores estadisticaJugadores)
    {
        _context.EstadisticaJugadores.Add(estadisticaJugadores);
        await _context.SaveChangesAsync();

        return Ok(CreatedAtAction("GetEstadisticaJugadores", new { id = estadisticaJugadores.EstadisticaJugadorId }, estadisticaJugadores));
    }

    // DELETE: api/EstadisticaJugadores/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEstadisticaJugadores(int id)
    {
        var estadisticaJugadores = await _context.EstadisticaJugadores.FindAsync(id);
        if (estadisticaJugadores == null)
        {
            return NotFound();
        }

        _context.EstadisticaJugadores.Remove(estadisticaJugadores);
        await _context.SaveChangesAsync();

        return Ok(NoContent());
    }

    private bool EstadisticaJugadoresExists(int id)
    {
        return _context.EstadisticaJugadores.Any(e => e.EstadisticaJugadorId == id);
    }
}