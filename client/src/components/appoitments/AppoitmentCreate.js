import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getStylists } from "../../dataProvider/stylistsData.js";
import { getCustomers } from "../../dataProvider/customersData.js";
import { getServices } from "../../dataProvider/servicesData.js";
import { useNavigate } from "react-router-dom/dist";
import { createAppointment } from "../../dataProvider/appointmentsData.js";

export default function AppointmentCreate() {
  const navigate = useNavigate();

  const [serviceIds, setServiceIds] = useState([]);
  const [customerId, setCustomerId] = useState(0);
  const [stylistId, setStylistId] = useState(0);
  
  const [dateTime, setDateTime] = useState('');
  const [customers, setCustomers] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    getCustomers().then(setCustomers);
    getStylists().then(setStylists);
    getServices().then(setServices);
    
  }, []);

  const handleCheckboxChange = (event) => {

    //to ensure that the checkedValue variable contains an integer value instead of a string. 
    // because checkbox values are typically stored as strings in the HTML value attribute
    //the second argument is the radix or base for parsing. In this case, 10 is used as the radix, indicating base-10 (decimal). Otherwise, it may interpret as octal: "010" as 8.
    const checkedValue = parseInt(event.target.value, 10);

    if (event.target.checked) {
      // If the checkbox is checked, add the value to the array
      setServiceIds((prevServiceIds) => [...prevServiceIds, checkedValue]);
    } else {
      // If the checkbox is unchecked, remove the value from the array
      setServiceIds((prevServiceIds) =>
        prevServiceIds.filter((id) => id !== checkedValue)
      );
    }
  };

  const submit = () => {
    const newAppointment = {
        "date": dateTime,
        stylistId,
        customerId,
        "services": services.filter( s => serviceIds.includes(s.id))
    }

    // stylistId and customerId are controlled/value-given with UseState
    // as long as the property's name matches the jsonToSend's, the name is the only thing needed in an object, because the value is updated with UseState
    // but if the name doesn't match the json body's, like the date and service, the name and value of the property need to be specified.

      console.log(newAppointment)
  
      createAppointment(newAppointment).then(() => {
        navigate("/appointments");
      });
  };

  return (
    <div className="container">
      <h4 className="sub-menu bg-light">Add a New Appointment</h4>
      <Form>
        
        <FormGroup>
          <Label htmlFor="customer">Customer</Label>
          <Input
            name="customer"
            type="select"
            value={customerId}
            onChange={(e) => {
              setCustomerId(parseInt(e.target.value));
            }}
          >
            <option key="0" value="0">Choose a Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="stylist">Stylist</Label>
          <Input
            name="stylist"
            type="select"
            value={stylistId}
            onChange={(e) => {
              setStylistId(parseInt(e.target.value));
            }}
          >
            <option key="0" value="0">Choose a Stylist</option>
            {stylists.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </Input>
        </FormGroup>
      
        <FormGroup>
            <Label htmlFor="appointmentDate">Date and Time</Label>
            <Input
              name="appointmentDate"
              type="datetime-local"
              id="appointmentDate"
              value={dateTime}
              onChange={(e) => {
                setDateTime(e.target.value)
                }}
            />
        </FormGroup>
        
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
                        >
                    </Input>

                    <Label htmlFor={`service-${s.id}`}>
                             {s.name}
                    </Label>
                </div>
                
            ))}

        </FormGroup>

        <Button outline color="primary" block onClick={submit}>Submit</Button>
      </Form>
    </div>
  );
}
