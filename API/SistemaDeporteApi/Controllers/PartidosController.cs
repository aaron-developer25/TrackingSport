using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.Models;
using SistemaDeporteApi.DAL;

namespace SistemaDeporteApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PartidosController(Contexto _context) : ControllerBase
{
    // GET: api/Partidos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Partidos>>> GetPartidos()
    {
        return Ok(await _context.Partidos.ToListAsync());
    }

    // GET: api/Partidos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Partidos>> GetPartidos(int id)
    {
        var partidos = await _context.Partidos.FindAsync(id);

        if (partidos == null)
        {
            return NotFound();
        }

        return Ok(partidos);
    }

    // PUT: api/Partidos/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPartidos(int id, Partidos partidos)
    {
        if (id != partidos.PartidoId)
        {
            return BadRequest();
        }

        _context.Entry(partidos).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PartidosExists(id))
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

    // POST: api/Partidos
    [HttpPost]
    public async Task<ActionResult<Partidos>> PostPartidos(Partidos partidos)
    {
        _context.Partidos.Add(partidos);
        await _context.SaveChangesAsync();

        return Ok(CreatedAtAction("GetPartidos", new { id = partidos.PartidoId }, partidos));
    }

    // DELETE: api/Partidos/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePartidos(int id)
    {
        var partidos = await _context.Partidos.FindAsync(id);
        if (partidos == null)
        {
            return NotFound();
        }

        _context.Partidos.Remove(partidos);
        await _context.SaveChangesAsync();

        return Ok(NoContent());
    }

    private bool PartidosExists(int id)
    {
        return _context.Partidos.Any(e => e.PartidoId == id);
    }
}
