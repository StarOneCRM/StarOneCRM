import React, { useState } from 'react';
import { Button, TextField, Paper, Box, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axios';

function FillForm({ token, setUser, logout }) {
  const [formData, setFormData] = useState({ Task: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(token)
      const response = await axiosInstance.post('/fill-form', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response) {
        // Update user form status in localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        storedUser.isFormFilled = true;
        localStorage.setItem('user', JSON.stringify(storedUser));
      }
      setUser(response.data.student);
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
            label="Task"
            name="Task"
            value={formData.Task}
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
