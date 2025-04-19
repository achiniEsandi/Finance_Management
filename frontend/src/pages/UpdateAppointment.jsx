import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleNumber: "",
    appointmentDate: "",
    service: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/appointments/${id}`)
      .then((res) => res.json())
      .then((data) => setAppointment(data))
      .catch((error) => console.error("Error fetching appointment:", error));
  }, [id]);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    })
      .then(() => navigate("/admin-appointments"))
      .catch((error) => console.error("Error updating appointment:", error));
  };

  return (
    <div>
      <h2>Update Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={appointment.name} onChange={handleChange} required />
        <input type="email" name="email" value={appointment.email} onChange={handleChange} required />
        <input type="text" name="phone" value={appointment.phone} onChange={handleChange} required />
        <input type="text" name="vehicleNumber" value={appointment.vehicleNumber} onChange={handleChange} required />
        <input type="date" name="appointmentDate" value={appointment.appointmentDate} onChange={handleChange} required />
        <input type="text" name="service" value={appointment.service} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateAppointment;
