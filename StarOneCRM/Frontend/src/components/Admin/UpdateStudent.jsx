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
  Switch,
  FormControlLabel,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';

const UpdateStudent = ({ token, setUserMethod, logout }) => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    age: '',
    email: '',
    role: '',
    isFormFilled: false,
    isFormVerified: false,
    isAdmin: false,
    Task: '',
  });

  useEffect(() => {
    axiosInstance.get(`/admin/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setUser(response.data.data);
        toast.success('User data loaded successfully');
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        toast.error('Failed to load user data');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(
        `/admin/${id}`,
        { ...user, age: Number(user.age) }, {
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
      console.error('Error updating user:', error);

      if (error.response && error.response.data) {
        const { error: backendError, message } = error.response.data;

        if (backendError && backendError.includes('duplicate key error')) {
          const emailMatch = backendError.match(/email: "(.*?)"/);
          const duplicateEmail = emailMatch ? emailMatch[1] : 'this email';
          toast.error(`The email ${duplicateEmail} is already associated with another user.`);
        } else {
          toast.error(message || backendError || 'An unexpected error occurred.');
        }
      } else {
        toast.error('Failed to update user. Please try again later.');
      }
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axiosInstance.patch(`/admin/verify/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setUser((prevUser) => ({
          ...prevUser,
          isFormVerified: true,
        }));
        toast.success("User verified successfully");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      toast.error("Error verifying user");
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
            value={user.name}
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
            value={user.age}
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
            value={user.email}
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
            label="Role"
            name="role"
            value={user.role}
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
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Task"
            name="Task"
            value={user.tasksAssigned}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Box>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={user.isFormFilled}
                onChange={handleChange}
                name="isFormFilled"
                color="primary"
              />
            }
            label="Form Filled"
          />
        </Box>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={user.isFormVerified}
                onChange={handleChange}
                name="isFormVerified"
                color="primary"
              />
            }
            label="Form Verified"
          />
        </Box>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={user.isAdmin}
                onChange={handleChange}
                name="isAdmin"
                color="primary"
              />
            }
            label="Admin"
          />
        </Box>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          fullWidth
        >
          Update User
        </Button>

        {/* Verify Button */}
        {!user.isFormVerified && (
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={handleVerify}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Verify User
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default UpdateStudent;
