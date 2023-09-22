import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getAppointments } from "../../dataProvider/appointmentsData";
import { Link } from "react-router-dom";

export default function AppoitmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments().then(setAppointments);
  }, []);

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Appointments</h4>
        <Link to="/appointments/create">Add</Link>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer</th>
            <th>Stylist</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((obj) => (
            <tr key={`appointments-${obj.id}`}>
              <th scope="row">{obj.id}</th>
              <td>{obj.customer?.name}</td>
              <td>{obj.stylist?.name}</td>
              <th scope="row">{obj.date}</th>
              <td>
                <Link to={`${obj.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
          }