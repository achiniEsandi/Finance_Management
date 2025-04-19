import React from 'react';
import { Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Vehicle Service Booking System
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/book-appointment"
        style={{ margin: '10px' }}
      >
        Book Appointment
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/appointments"
        style={{ margin: '10px' }}
      >
        View Appointments
      </Button>
    </Paper>
  );
};

export default Home;