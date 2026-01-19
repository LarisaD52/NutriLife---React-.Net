namespace NutriLifeApp.Models
{
    public class NutritionPlan
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; // ex: Plan slabire
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public int DurationDays { get; set; } 
    }
}