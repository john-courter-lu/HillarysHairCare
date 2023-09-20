using Microsoft.EntityFrameworkCore;
using HillarysHairCare.Models;

public class HillarysHairCareDbContext : DbContext
{
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Stylist> Stylists { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Service> Services { get; set; }
 

    public HillarysHairCareDbContext(DbContextOptions<HillarysHairCareDbContext> context) : base(context)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Stylist>().HasData(new Stylist[]
        {
            new Stylist { Id = 1, Name = "Stylist One", IsActive = true },
            new Stylist { Id = 2, Name = "Stylist Two", IsActive = true },
            new Stylist { Id = 3, Name = "Stylist Three", IsActive = true },
            new Stylist { Id = 4, Name = "Stylist Four", IsActive = false }
        });


        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer { Id = 1, Name = "Customer One"},
            new Customer { Id = 2, Name = "Customer Two" },
            new Customer { Id = 3, Name = "Customer Three" },
            new Customer { Id = 4, Name = "Customer Four"},
            new Customer { Id = 5, Name = "Customer Five"}
        });


        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {  
            new Appointment { Id = 1, Date = new DateTime(2023, 9, 20, 16, 0, 0), StylistId = 1, CustomerId = 1 },
            new Appointment { Id = 2, Date = new DateTime(2023, 9, 19, 13, 0, 0), StylistId = 2, CustomerId = 2 },
            new Appointment { Id = 3, Date = new DateTime(2023, 9, 16, 10, 0, 0), StylistId = 3, CustomerId = 3},
            new Appointment { Id = 4, Date = new DateTime(2023, 9, 10, 13, 0, 0), StylistId = 1, CustomerId = 4 },
            new Appointment { Id = 5, Date = new DateTime(2023, 9, 9, 11, 0, 0), StylistId = 2, CustomerId = 5 }
        });


        modelBuilder.Entity<Service>().HasData(new Service[]
        {  
            new Service { Id = 1, Name = "Haircut", Price = 40.00M },
            new Service { Id = 2, Name = "Beard Trim", Price = 20.00M },
            new Service { Id = 3, Name = "Color", Price = 65.00M },
            new Service { Id = 4, Name = "Hair Transplant", Price = 2350.00M },
            new Service { Id = 5, Name = "Blowout", Price = 30.00M }
        });


        modelBuilder.Entity("AppointmentService").HasData(new Object[]
        {  
            new { AppointmentId = 1, ServiceId = 1 },
            new { AppointmentId = 1, ServiceId = 2 },
            new { AppointmentId = 2, ServiceId = 1 },
            new { AppointmentId = 3, ServiceId = 3 },
            new { AppointmentId = 3, ServiceId = 1 },
            new { AppointmentId = 3, ServiceId = 5 },
            new { AppointmentId = 4, ServiceId = 1 },
            new { AppointmentId = 4, ServiceId = 4 },
            new { AppointmentId = 5, ServiceId = 3 },
            new { AppointmentId = 5, ServiceId = 2 }
        });
    }
}