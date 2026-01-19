using System;

namespace NutriLifeApp.Models
{
    public class ClientSubscription
    {
        public int Id { get; set; }
        public int UserId { get; set; } // ID-ul userului
        public int NutritionPlanId { get; set; } // ID-ul planului ales
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; } 
        public bool IsPaid { get; set; } = false;
    }
}