using System.ComponentModel.DataAnnotations;

namespace HillarysHairCare.Models;

public class Customer
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public List<Appointment> Appointments { get; set; }
}