import React, { useState } from 'react';
import { Button, TextField, Paper, Box, Typography, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Signup({ handleSignup }) {
  const [formData, setFormData] = useState({ name: '', email: '', age: '', major: '', isAdmin: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(formData);
    toast.success('Signup successful');
    navigate('/login');
  };

  const handleSwitchToLogin = () => {
    navigate('/login'); // Navigate to the login page
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
        Signup
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
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
            value={formData.age}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Major"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isAdmin}
                onChange={(e) => handleChange({ target: { name: 'isAdmin', value: e.target.checked } })}
                name="isAdmin"
                color="primary"
              />
            }
            label="Signup as Admin"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Signup
        </Button>
      </form>

      <Box mt={2}>
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={handleSwitchToLogin}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Paper>
  );
}

export default Signup;
