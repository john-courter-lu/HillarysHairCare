using HillarysHairCare.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// allows passing datetimes without time zone data 
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<HillarysHairCareDbContext>(builder.Configuration["HillarysHairCareDbConnectionString"]);

// Set the JSON serializer options
builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// endpoints 
// APPOINTMENT ENDPOINTS

// get all appointments
app.MapGet("/api/appointments", (HillarysHairCareDbContext db) =>
{
    return db.Appointments
        .Include(a => a.Stylist)
        .Include(a => a.Customer);
});

// get appointment by id
app.MapGet("api/appointments/{id}", (HillarysHairCareDbContext db, int id) =>
{

    Appointment matchedAppointment = db.Appointments
        .Include(a => a.Stylist)
        .Include(a => a.Customer)
        .Include(a => a.Services)
        .SingleOrDefault(a => a.Id == id);

    if(matchedAppointment == null)
    {
        return Results.NotFound();
    }
    
    return Results.Ok(matchedAppointment);
});

// get stylists for new appointments creating
app.MapGet("/api/stylists", (HillarysHairCareDbContext db) =>
{
    return db.Stylists
        .Where(s=> s.IsActive==true)
        .ToList();
});

// get customers for new appointments creating
app.MapGet("/api/customers", (HillarysHairCareDbContext db) =>
{
    return db.Customers;
});

// get services for new appointments creating
app.MapGet("/api/services", (HillarysHairCareDbContext db) =>
{
    return db.Services;
});

// Post a new appoitment without services
app.MapPost("/api/appointments", (HillarysHairCareDbContext db, Appointment newAppointment) =>
{

    // Id will be taken care of by EF Core;
    // Stylist, Customer will be taken care of by .Include() in other MapGet endpoints; or use SingleOrDefault
    // Services need to be added to AppointmentService database
   

    try
    {
       
        db.Appointments.Add(newAppointment);
        db.SaveChanges();
        return Results.Created($"/api/appointments/{newAppointment.Id}", newAppointment);

    }
    catch (DbUpdateException) 
    {
        return Results.BadRequest("Invalid data submitted");
    }
    
    // If the SaveChanges() method encounters any database-related issues (such as constraint violations or database connectivity problems), it can throw a DbUpdateException. 
});

/* 
 use this json to test the endpiont:
 
    {
    "date": "2023-09-25T19:48:01.023Z",
    "stylistId": 1,
    "customerId": 1
    } 
  
*/
app.Run();

