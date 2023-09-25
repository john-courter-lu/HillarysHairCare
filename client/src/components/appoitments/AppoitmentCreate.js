import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getStylists } from "../../dataProvider/stylistsData.js";
import { getCustomers } from "../../dataProvider/customersData.js";
import { useNavigate } from "react-router-dom/dist";


export default function AppointmentCreate() {
  const navigate = useNavigate();

  //const [appointmentServices, setAppointmentServices] = useState("");
  const [customerId, setCustomerId] = useState(0);
  const [stylistId, setStylistId] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    getCustomers().then(setCustomers);
    getStylists().then(setStylists);
  }, []);

  const submit = () => {
    window.alert("submit button clicked")
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
            
          <Label htmlFor="stylists">Stylists</Label>

          {stylists.map((s) => (

                <div key={s.id}>
                    <Input
                            name={`stylist-${s.id}`}
                            type="checkbox"
                            value={s.id}
                            checked={false}
                            onChange={() => {window.alert("checked")}}
                        >
                    </Input>

                    <Label htmlFor="stylist-${s.id}">{s.name}</Label>
                </div>
                
            ))}

        </FormGroup>

        <Button onClick={submit}>Submit</Button>
      </Form>
    </div>
  );
}
