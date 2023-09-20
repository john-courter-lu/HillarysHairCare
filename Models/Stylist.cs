using System.ComponentModel.DataAnnotations;

namespace HillarysHairCare.Models;

public class Stylist
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public bool isActive { get; set; }
    public List<Appointment> Appointments { get; set; }
}