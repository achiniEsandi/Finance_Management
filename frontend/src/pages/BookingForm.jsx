import React, { useEffect, useState } from "react";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  useEffect(() => {
    fetch("http://localhost:5000/api/appointments")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  // Delete appointment
  const deleteAppointment = (id) => {
    fetch(`http://localhost:5000/api/appointments/${id}`, { method: "DELETE" })
      .then(() => setAppointments(appointments.filter((appt) => appt._id !== id)))
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  return (
    <div>
      <h2>Service Appointments</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Vehicle</th>
            <th>Date</th>
            <th>Service</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id}>
              <td>{appt.name}</td>
              <td>{appt.email}</td>
              <td>{appt.phone}</td>
              <td>{appt.vehicleNumber}</td>
              <td>{appt.appointmentDate}</td>
              <td>{appt.service}</td>
              <td>
                <button onClick={() => deleteAppointment(appt._id)}>Delete</button>
                <button onClick={() => alert("Update functionality coming soon!")}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointments;
