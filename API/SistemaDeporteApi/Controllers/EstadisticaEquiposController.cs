using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.Models;
using SistemaDeporteApi.DAL;

namespace SistemaDeporteApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EstadisticaEquiposController(Contexto _context) : ControllerBase
{
    // GET: api/EstadisticaEquipos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EstadisticaEquipos>>> GetEstadisticaEquipos()
    {
        return Ok(await _context.EstadisticaEquipos.ToListAsync());
    }

    // GET: api/EstadisticaEquipos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<EstadisticaEquipos>> GetEstadisticaEquipos(int id)
    {
        var estadisticaEquipos = await _context.EstadisticaEquipos.FindAsync(id);

        if (estadisticaEquipos == null)
        {
            return NotFound();
        }

        return Ok(estadisticaEquipos);
    }

    // PUT: api/EstadisticaEquipos/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutEstadisticaEquipos(int id, EstadisticaEquipos estadisticaEquipos)
    {
        if (id != estadisticaEquipos.EstadisticaEquipoId)
        {
            return BadRequest();
        }

        _context.Entry(estadisticaEquipos).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EstadisticaEquiposExists(id))
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

    // POST: api/EstadisticaEquipos
    [HttpPost]
    public async Task<ActionResult<EstadisticaEquipos>> PostEstadisticaEquipos(EstadisticaEquipos estadisticaEquipos)
    {
        _context.EstadisticaEquipos.Add(estadisticaEquipos);
        await _context.SaveChangesAsync();

        return Ok(CreatedAtAction("GetEstadisticaEquipos", new { id = estadisticaEquipos.EstadisticaEquipoId }, estadisticaEquipos));
    }

    // DELETE: api/EstadisticaEquipos/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEstadisticaEquipos(int id)
    {
        var estadisticaEquipos = await _context.EstadisticaEquipos.FindAsync(id);
        if (estadisticaEquipos == null)
        {
            return NotFound();
        }

        _context.EstadisticaEquipos.Remove(estadisticaEquipos);
        await _context.SaveChangesAsync();

        return Ok(NoContent());
    }

    private bool EstadisticaEquiposExists(int id)
    {
        return _context.EstadisticaEquipos.Any(e => e.EstadisticaEquipoId == id);
    }
}