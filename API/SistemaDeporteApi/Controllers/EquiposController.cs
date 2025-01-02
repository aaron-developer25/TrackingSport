using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.Models;
using SistemaDeporteApi.DAL;

namespace SistemaDeporteApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EquiposController(Contexto _context) : ControllerBase
{
    // GET: api/Equipos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Equipos>>> GetEquipos()
    {
        return Ok(await _context.Equipos.ToListAsync());
    }

    // GET: api/Equipos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Equipos>> GetEquipos(int id)
    {
        var equipos = await _context.Equipos.FindAsync(id);

        if (equipos == null)
        {
            return NotFound();
        }

        return Ok(equipos);
    }

    // PUT: api/Equipos/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutEquipos(int id, Equipos equipos)
    {
        if (id != equipos.EquipoId)
        {
            return BadRequest();
        }

        _context.Entry(equipos).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EquiposExists(id))
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

    // POST: api/Equipos
    [HttpPost]
    public async Task<ActionResult<Equipos>> PostEquipos(Equipos equipos)
    {
        _context.Equipos.Add(equipos);
        await _context.SaveChangesAsync();

        return Ok(CreatedAtAction("GetEquipos", new { id = equipos.EquipoId }, equipos));
    }

    // DELETE: api/Equipos/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEquipos(int id)
    {
        var equipos = await _context.Equipos.FindAsync(id);
        if (equipos == null)
        {
            return NotFound();
        }

        _context.Equipos.Remove(equipos);
        await _context.SaveChangesAsync();

        return Ok(NoContent());
    }

    private bool EquiposExists(int id)
    {
        return _context.Equipos.Any(e => e.EquipoId == id);
    }
}
