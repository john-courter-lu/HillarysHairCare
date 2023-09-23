import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getAppointment } from "../../dataProvider/appointmentsData";

export default function AppointmentDetail() {
  const { id } = useParams();

  const [appointment, setAppointment] = useState(null);

  //add useEffect here to get the ticket details from the API
  useEffect(() => {
    getAppointment(id).then(setAppointment);
  }, []);

  if (!appointment) {
    return null;
  }

  return (
    <div className="container">
      <h2>{appointment.id}</h2>
      <Table>
        <tbody>
          <tr>
            <th scope="row">Customer</th>
            <td>{appointment.customer.name}</td>
          </tr>
          <tr>
            <th scope="row">Stylist</th>
            <td>
                {appointment.stylist.name ? appointment.stylist.name : 'N/A'}
            </td>
          </tr>
          <tr>
            <th scope="row">Date</th>
            <td>
              {appointment.date.split("T")[0]}
            </td>
          </tr>
          <tr>
            <th scope="row">Time</th>
            <td>
            {new Date(appointment.date).toLocaleTimeString(undefined,{
                hour:"2-digit", 
                minute: "2-digit", 
                hour12: true
                })}
            </td>
          </tr>
          <tr>
            <th scope="row">Total Cost</th>
            <td> {appointment.totalCost.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2 
                    })}
             </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
