import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Paper, Box, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FillForm({ token, onFormSubmit, logout }) {
  const [formData, setFormData] = useState({ additionalInfo: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/fill-form', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response) {
        // Update user form status in localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        storedUser.isFormFilled = true;
        localStorage.setItem('user', JSON.stringify(storedUser));
      }
      onFormSubmit(response.data.student);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error('Failed to submit the form');
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: '30px',
        margin: '20px auto',
        maxWidth: '500px',
        textAlign: 'center',
      }}
    >
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Complete Your Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Additional Info"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            required
            multiline
            rows={4}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </form>

      {/* Logout button */}
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Paper>
  );
}

export default FillForm;
