using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shared.Models;
using SistemaDeporteApi.DAL;

namespace SistemaDeporteApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AjustesController(Contexto _context) : ControllerBase
{

    // GET: api/Ajustes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ajustes>>> GetAjustes()
    {
        return Ok(await _context.Ajustes.ToListAsync());
    }

    // GET: api/Ajustes/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Ajustes>> GetAjustes(int id)
    {
        var ajustes = await _context.Ajustes.FindAsync(id);

        if (ajustes == null)
        {
            return NotFound();
        }

        return Ok(ajustes);
    }

    // PUT: api/Ajustes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAjustes(int id, Ajustes ajustes)
    {
        if (id != ajustes.AjusteId)
        {
            return BadRequest();
        }

        _context.Entry(ajustes).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AjustesExists(id))
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

    // POST: api/Ajustes
    [HttpPost]
    public async Task<ActionResult<Ajustes>> PostAjustes(Ajustes ajustes)
    {
        _context.Ajustes.Add(ajustes);
        await _context.SaveChangesAsync();

        return Ok(CreatedAtAction("GetAjustes", new { id = ajustes.AjusteId }, ajustes));
    }

    // DELETE: api/Ajustes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAjustes(int id)
    {
        var ajustes = await _context.Ajustes.FindAsync(id);
        if (ajustes == null)
        {
            return NotFound();
        }

        _context.Ajustes.Remove(ajustes);
        await _context.SaveChangesAsync();

        return Ok(NoContent());
    }

    private bool AjustesExists(int id)
    {
        return _context.Ajustes.Any(e => e.AjusteId == id);
    }
}
