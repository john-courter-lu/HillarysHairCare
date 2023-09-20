using System.ComponentModel.DataAnnotations;

namespace HillarysHairCare.Models;

public class Service
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public decimal Price { get; set; }
    public List<Appointment> Appointments { get; set; }
}