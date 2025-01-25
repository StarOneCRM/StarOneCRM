import React, { useState } from 'react';
import { Button, TextField, Paper, Box, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axios';

function FillForm({ token, setstudentMethod, logout }) {
  const [formData, setFormData] = useState({ tasks: '' });

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
        // Update student form status in localStorage
        const storedstudent = JSON.parse(localStorage.getItem('student'));
        storedstudent.isFormFilled = true;
        localStorage.setItem('student', JSON.stringify(storedstudent));
      }
      setstudentMethod(response.data.student);
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
            label="task"
            name="tasks"
            value={formData.tasks}
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
