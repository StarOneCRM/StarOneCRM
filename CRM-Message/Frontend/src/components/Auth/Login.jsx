import React, { useState } from 'react';
import { Button, TextField, Paper, Box, Typography, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // New state for password
  const navigate = useNavigate(); // Hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password }); // Pass both email and password
    
    if (success) {
      // Navigate to a new page after successful login
      navigate('/fill-form');
    } else {
      // Error handling is done in the handleLogin function, so nothing extra here
    }
  };

  const handleSwitchToSignUp = () => {
    navigate('/signup'); // Navigate to the signup page
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
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </form>

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSwitchToSignUp}
        >
          Don't have an account? Sign up
        </Button>
      </Box>
    </Paper>
  );
}

export default Login;
