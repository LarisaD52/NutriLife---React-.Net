using Microsoft.AspNetCore.Mvc;
using NutriLifeApp.Models;

namespace NutriLifeApp.Controllers
{
    [ApiController]
    [Route("api/patients")]
    public class PatientsController : ControllerBase
    {
        private static List<User> _patients = new()
        {
            new User
            {
                Id = 1,
                FullName = "Ana Maria",
                Email = "ana@test.com",
                Allergies = "Arahide",
                CurrentWeight = 65.5,
                Goal = "Slăbire",
                NextConsultationDate = DateTime.Now.AddDays(-2) // EXPIRAT
            },
            new User
            {
                Id = 2,
                FullName = "Marius Pop",
                Email = "marius@test.com",
                Allergies = "Niciuna",
                CurrentWeight = 88,
                Goal = "Masă Musculară",
                NextConsultationDate = DateTime.Now.AddDays(7) // ACTIV
            }
        };

        [HttpGet]
        public IActionResult GetAll() => Ok(_patients);

        [HttpPost]
        public IActionResult Create([FromBody] User newUser)
        {
            newUser.Id = _patients.Any() ? _patients.Max(p => p.Id) + 1 : 1;
            _patients.Add(newUser);
            return Ok(newUser);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var p = _patients.FirstOrDefault(x => x.Id == id);
            if (p == null) return NotFound();

            _patients.Remove(p);
            return Ok();
        }
    }
}
