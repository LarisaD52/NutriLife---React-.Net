using System;

namespace NutriLifeApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Allergies { get; set; } = "None";
        public double CurrentWeight { get; set; }
        public string Goal { get; set; } = "Maintenance"; //slabire, masa musculara
        public DateTime PlanStartDate { get; set; }
        public DateTime NextConsultationDate { get; set; } // ACEASTA ESTE DATA DE EXPIRARE
        public bool IsActive { get; set; } = true;
    }
}