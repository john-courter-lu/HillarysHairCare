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

// Post a new appoitment with services
app.MapPost("/api/appointments", (HillarysHairCareDbContext db, Appointment newAppointment) =>
{

    // Id will be taken care of by EF Core;
    // Stylist, Customer will be taken care of by .Include() in other MapGet endpoints; or use SingleOrDefault

    // Services need to be re-added from db.Service with correct Service Id
    // but can't just pass Service Id (don't know how to handle two Post bodies with two parameters)
    // and the front-end json body need to follow the correct Appointment class properties, otherwise will encounter "can't transfer/switch from this type to that type" compiler error.
    // but the id is the only thing needed in Service array from the front-end, other properties can be omitted, it's also ok if included, based on test.
    
   
    try
    {
        if( newAppointment.Services != null ) { // with this error handling, newAppointment would still be able to be added when the services are not chosen. 

        var serviceIds = newAppointment.Services.Select(s => s.Id).ToList();

        newAppointment.Services = db.Services
            .Where(s => serviceIds.Contains(s.Id))
            .ToList(); 

        }

        db.Appointments.Add(newAppointment);

        //test if we can construct the Service property inside this endpoint and save correctly to the database

       /*  
            newAppointment.Services = db.Services
                                        .Where(s => s.Id == 3)
                                        .ToList(); 
                                        
                                        */
        
        //test success: 201 returned the correct body
        //database check: MapGet("api/appointments/{id}") also returned the correct data and the TotalCost showed up correctly.

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

// Post services for the newly created appointment

/* 
 use this json to test the endpiont with ServiceIds, not good, it requires impossible type change for Appointment class's properties.

    {
    "date": "2023-09-29T19:48:01.023Z",
    "stylistId": 2,
    "customerId": 4,
    "services": [2,4]
    } 
  
*/

/* 
 use this json to test the endpiont with incomplete Services, not good, it returns 400; but if extracting the id and add the Service property found in the database, it works.

    {
    "date": "2023-09-29T19:48:01.023Z",
    "stylistId": 2,
    "customerId": 4,
    "services": [
        {
      "id": 1
        }
     ]
    } 
  
*/

/* 
 use this json to test the endpiont with Services, not good, it returns 400; but it works as above if reconstruct the Service part.

    {
    "date": "2023-09-29T19:48:01.023Z",
    "stylistId": 2,
    "customerId": 4,
    "services": [
   {
      "id": 1,
      "name": "Haircut",
      "price": 40
      
    }
    ]
  }

*/

// delete an appointment
app.MapDelete("/api/appointments/{id}", (HillarysHairCareDbContext db,int id) =>
{

    Appointment appointmentToRemove = db.Appointments.SingleOrDefault(appointment => appointment.Id == id);

    if (appointmentToRemove == null)
    {
        return Results.NotFound();
    }
    
    db.Appointments.Remove(appointmentToRemove);
    db.SaveChanges();
    return Results.NoContent();
});

app.Run();

// edit an appointment, only services
// edit an appointment
app.MapPut("/api/appointments/{id}", (HillarysHairCareDbContext db, int id, Appointment updatedAppointment) =>
{
    // handle error or edge cases
    if( updatedAppointment.Id != id || updatedAppointment.Services == null )
    {
        return Results.BadRequest("Unmatched or Empty data submitted");
    }
    
    // get the appointment to be updated, include the services
    var appointmentToUpdate = db.Appointments
        .Include(a => a.Services)
        .SingleOrDefault(a => a.Id == id);

    //attach the services to the context; only handle and update Services
    var serviceIds = updatedAppointment.Services.Select(s => s.Id).ToList();

    appointmentToUpdate.Services  = db.Services
        .Where(s => serviceIds.Contains(s.Id))
        .ToList();

    db.SaveChanges();

    return Results.NoContent();
});
