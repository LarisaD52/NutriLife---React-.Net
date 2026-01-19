using Microsoft.AspNetCore.Mvc;
using NutriLifeApp.Models;

namespace NutriLifeApp.Controllers
{
    [ApiController]
    [Route("api/nutri")]
    public class NutriController : ControllerBase
    {
        private static List<User> _pacienti = new()
        {
            new User
            {
                Id = 1,
                FullName = "Ana Maria",
                Email = "ana@test.com",
                Allergies = "Arahide",
                CurrentWeight = 65.5,
                Goal = "Slăbire",
                NextConsultationDate = DateTime.Now.AddDays(-2)
            },
            new User
            {
                Id = 2,
                FullName = "Marius Pop",
                Email = "marius@test.com",
                Allergies = "Niciuna",
                CurrentWeight = 88.0,
                Goal = "Masă Musculară",
                NextConsultationDate = DateTime.Now.AddDays(7)
            }
        };

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_pacienti);
        }

        [HttpPost]
        public IActionResult AddPatient([FromBody] User newPatient)
        {
            newPatient.Id = _pacienti.Any() ? _pacienti.Max(x => x.Id) + 1 : 1;
            _pacienti.Add(newPatient);
            return Ok(newPatient);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var p = _pacienti.FirstOrDefault(x => x.Id == id);
            if (p == null) return NotFound();

            _pacienti.Remove(p);
            return Ok();
        }
    }
}
