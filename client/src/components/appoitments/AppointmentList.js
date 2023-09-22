import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getAppoitments } from "../../dataProvider/appoitmentsData";
import { Link } from "react-router-dom";

export default function AppoitmentList() {
  const [appoitments, setAppoitments] = useState([]);

  useEffect(() => {
    getAppoitments().then(setAppoitments);
  }, []);

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Appoitments</h4>
        <Link to="/appoitments/create">Add</Link>
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
          {appoitments.map((obj) => (
            <tr key={`appoitments-${obj.id}`}>
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