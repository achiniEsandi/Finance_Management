import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/${id}`);
        setAppointment(response.data);
      } catch (err) {
        console.error('Error fetching appointment:', err);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      navigate('/appointments');
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

  if (!appointment) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Appointment Details
      </Typography>
      <Typography variant="h6">Customer Name: {appointment.customerName}</Typography>
      <Typography variant="h6">Customer Email: {appointment.customerEmail}</Typography>
      <Typography variant="h6">Customer Phone: {appointment.customerPhone}</Typography>
      <Typography variant="h6">Vehicle Number: {appointment.vehicleNumber}</Typography>
      <Typography variant="h6">Services: {appointment.services.join(', ')}</Typography>
      <Typography variant="h6">Date: {new Date(appointment.date).toLocaleDateString()}</Typography>
      <Typography variant="h6">Time: {appointment.time}</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDelete}
        style={{ marginRight: '10px' }}
      >
        Delete Appointment
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/appointments/${id}/edit`)}
      >
        Update Appointment
      </Button>
    </Paper>
  );
};

export default AppointmentDetails;