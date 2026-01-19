using Microsoft.AspNetCore.Mvc;
using NutriLifeApp.Models;

namespace NutriLifeApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlansController : ControllerBase
    {
        private static List<NutritionPlan> _plans = new List<NutritionPlan>
        {
            new NutritionPlan { Id = 1, Name = "Plan Keto", Price = 250, DurationDays = 30 },
            new NutritionPlan { Id = 2, Name = "Plan Vegan", Price = 200, DurationDays = 30 },
            new NutritionPlan { Id = 3, Name = "Detox 7 Zile", Price = 100, DurationDays = 7 }
        };

        [HttpGet]
        public IActionResult GetPlans() => Ok(_plans);
    }
}