import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import { cancelAppointment, getAppointments } from "../../dataProvider/appointmentsData";
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";


export default function AppoitmentList() {
  const [appointments, setAppointments] = useState([]);


  const [isConfirmationOpen, setConfirmationOpen] = useState(false); 
  // for Confirmation Modal

  const [isCancellationSuccessful, setCancellationSuccessful] = useState(false);
  // for alert window

  const [appointmentId, setAppointmentId] = useState(null);
  // for storing the e.target.value because the confirmation window stopped the flow

  useEffect(() => {
    getAppointments().then(setAppointments);
  }, []);

  const toggleConfirmation = () => {
    setConfirmationOpen(!isConfirmationOpen);
  };

  const handleCancel = (e, id) => {
    e.preventDefault();
    setAppointmentId(id); //pass the obj.id to AppointmentId to be used later 
    toggleConfirmation(); // Open the confirmation modal
  };

  const handleConfirmCancel = () => {
    // User confirmed cancellation
    toggleConfirmation(); // Close the confirmation modal
    
    cancelAppointment(appointmentId) // talking to API
      .then(getAppointments)
      .then(setAppointments);

    setCancellationSuccessful(true); // Alert Control: Set cancellation success state to true
    setTimeout(() => setCancellationSuccessful(false), 3000); // Auto-dismiss after 3 seconds
    
  };
    
  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Appointments</h4>
        <Link to="/appointments/create">Add</Link>
      </div>

      {isCancellationSuccessful && (
        <div className="alert alert-success">Cancellation Successful!</div>
      )}

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer</th>
            <th>Stylist</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((obj) => (
            <tr key={`appointments-${obj.id}`}>
              <th scope="row">{obj.id}</th>
              <td>{obj.customer?.name}</td>
              <td>{obj.stylist?.name}</td>
              <td>{new Date(obj.date).toLocaleDateString()}</td>
              <td>{new Date(obj.date).toLocaleTimeString(undefined,{hour:"2-digit", minute: "2-digit", hour12: true})}</td>

              <td>
                <Link to={`${obj.id}`}><BiDetail style={{ fontSize: '1.25rem'}}/></Link>
                <Link to={`${obj.id}`}></Link>
                <span>
                    <MdDeleteOutline 
                     value={obj.id} /* not necessary, not always reliable */
                     onClick={(e) => handleCancel(e, obj.id)}
                     /* Pass obj.id as a parameter to handleCancel, 
                        because e.target.value can act weird sometimes */
                     style={{ fontSize: '1.25rem', color: "red" }} />
                </span>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={isConfirmationOpen} toggle={toggleConfirmation}>
        <ModalHeader toggle={toggleConfirmation}>Confirmation</ModalHeader>
        <ModalBody>
          Are you sure you want to cancel this appointment?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleConfirmation}>Cancel</Button>
          <Button color="danger" onClick={handleConfirmCancel}>Confirm</Button>
        </ModalFooter>
      </Modal>


    </div>
  );
          }

          //more sytax about time format
          //new Date().toLocaleDateString(undefined, options)

            //options = {
            //     year: "numeric",
            //     month: "2-digit",
            //     day: "2-digit",
            //     hour: "2-digit",
            //     minute: "2-digit",
            //     hour12: true,
            //   };