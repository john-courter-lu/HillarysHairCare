import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getServices } from "../../dataProvider/servicesData.js";
import { getAppointment } from "../../dataProvider/appointmentsData";
import { useNavigate, useParams } from "react-router-dom";
import { updateAppointment } from "../../dataProvider/appointmentsData.js";

export default function AppointmentUpdate() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [appointment, setAppointment] = useState(null);
    const [serviceIds, setServiceIds] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {

        getAppointment(id).then(setAppointment);
        getServices().then(setServices);

    }, []); // Include id in the dependency array to trigger the fetch when the id changes

    useEffect(() => {

      setServiceIds(appointment?.services.map(service=>service.id));
    
    }, [appointment]); // Because chained .then() doesn't work after .then(setAppointment) in the last useEffect

    const handleCheckboxChange = (event) => {
        const checkedValue = parseInt(event.target.value, 10);
        if (event.target.checked) {
            setServiceIds((prevServiceIds) => [...prevServiceIds, checkedValue]);
        } else {
            setServiceIds((prevServiceIds) =>
                prevServiceIds.filter((id) => id !== checkedValue)
            );
        }
    };

    const handleUpdate = () => {
        const updatedAppointment = {
            id: parseInt(id), // Include the id of the appointment to be updated; 
            //id from useParams is a string, but after testing, JSON Body {"id":2} or {"id":"2"} passing into MapPost endpoint doesn't make a difference.
            date: appointment.date,
            stylistId: appointment.stylist.id,
            customerId: appointment.customer.id,
            // Can omit these 3 properties since they are not going to be changed and MapPost endpoint doesn't need them to match Appointment class definitions (not [required] properties like id)
            services: services.filter((s) => serviceIds.includes(s.id)),
            //no need for quotation marks "id" "services" because in dataProvider, it will get JSON.stringify(appointment)
        };

        console.log(updatedAppointment)

        updateAppointment(id, updatedAppointment) //id as a string will be used in string interpolation `${_apiUrl}/${id}` in dataPrivder so it's ok not to parseInt()
            .then(() => {
                navigate("/appointments");
            })
            .catch((error) => {
                console.error("Error updating appointment:", error);
            });
    };

    if (!appointment || !serviceIds) { // Make sure appointment's properties and serviceIds are ready before showing anything, otherwise error: can't read null for checked={serviceIds.includes(s.id)}
        return null;
    }

    return (
        <div className="container">
            <h4 className="sub-menu bg-light">Update Appointment No.{appointment.id}</h4>
            <Form>
                {/* Customer */}
                <FormGroup>
                    <Label htmlFor="customer">Customer</Label>
                    <Input
                        name="customer"
                        type="text"
                        value={appointment.customer.name} // Replace with the customer's name
                        disabled // Make the field disabled
                    />
                </FormGroup>

                {/* Stylist */}
                <FormGroup>
                    <Label htmlFor="stylist">Stylist</Label>
                    <Input
                        name="stylist"
                        type="text"
                        value={appointment.stylist.name} // Replace with the stylist's name
                        disabled // Make the field disabled
                    />
                </FormGroup>

                {/* Date and Time */}
                <FormGroup>
                    <Label htmlFor="appointmentDate">Date and Time</Label>
                    <Input
                        name="appointmentDate"
                        type="datetime-local"
                        value={appointment.date}
                        disabled // Make the field disabled
                    />
                </FormGroup>

                {/* Services (Editable) */}
                <FormGroup>
                    <Label htmlFor="services">Services</Label>

                    {services.map((s) => (
                        <div key={s.id}>
                            <Input
                                name={`service-${s.id}`}
                                type="checkbox"
                                value={s.id}
                                checked={serviceIds.includes(s.id)}
                                onChange={handleCheckboxChange}
                            />
                            <Label htmlFor={`service-${s.id}`}>{s.name}</Label>
                        </div>
                    ))}
                </FormGroup>

                {/* Update Button */}
                <Button outline block color="primary" onClick={handleUpdate}>Update</Button>
            </Form>
        </div>
    );
}
