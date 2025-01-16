import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import SaveIcon from '@mui/icons-material/Save';

const UpdateStudent = ({ token, setUser, logout }) => {
  const { id } = useParams();
  const [student, setStudent] = useState({ name: '', age: '', email: '', major: '' });

  useEffect(() => {
    axiosInstance.get(`/admin/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setStudent(response.data.data);
        toast.success('Student data loaded successfully');
      })
      .catch(error => {
        console.error('Error fetching student:', error);
        toast.error('Failed to load student data');
      });
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(
        `/admin/${id}`,
        { ...student, age: Number(student.age) } ,{
          headers: { Authorization: `Bearer ${token}` },
        });
      const { message, data } = response.data;
      if (data) {
        toast.success(`${message}, you will be redirected shortly`);
        setTimeout(() => {
          window.location.href = '/';
        }, 5000);
      }
    } catch (error) {
      console.error('Error updating student:', error);

      if (error.response && error.response.data) {
        const { error: backendError, message } = error.response.data;

        if (backendError && backendError.includes('duplicate key error')) {
          const emailMatch = backendError.match(/email: "(.*?)"/);
          const duplicateEmail = emailMatch ? emailMatch[1] : 'this email';
          toast.error(`The email ${duplicateEmail} is already associated with another student.`);
        } else {
          toast.error(message || backendError || 'An unexpected error occurred.');
        }
      } else {
        toast.error('Failed to update student. Please try again later.');
      }
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

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Age"
            name="age"
            type="number"
            value={student.age}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            value={student.email}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Major"
            name="major"
            value={student.major}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SchoolIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          fullWidth
        >
          Update Student
        </Button>
      </form>
    </Paper>
  );
};

export default UpdateStudent;
