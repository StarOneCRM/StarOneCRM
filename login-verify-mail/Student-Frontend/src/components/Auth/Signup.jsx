import React, { useState } from 'react';
import { Button, TextField, Paper, Box, Typography, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', age: '', major: '', password: '', otp: '' });
    const [otpSent, setOtpSent] = useState(false);
    const { handleSignup } = useGlobalContext();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOtpRequest = async () => {
      const result = await handleSignup(formData); // Call the handleSignup function
      
      if (result.success) {
          setOtpSent(true);
          toast.info('OTP sent to your email');
      } else {
          setOtpSent(false); // Prevent OTP field from showing up if the request fails
          toast.error(result.message); // Show error message from the response
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignup(formData, true);
        toast.success('Signup successful');
        navigate('/login');
    };

    return (
        <Paper elevation={3} style={{ padding: '30px', margin: '20px auto', maxWidth: '500px', textAlign: 'center' }}>
            <ToastContainer />
            <Typography variant="h4" gutterBottom>Signup</Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required={!otpSent}
                        disabled={otpSent}
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
                        disabled={otpSent}
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
                        required={!otpSent}
                        disabled={otpSent}
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
                        required={!otpSent}
                        disabled={otpSent}
                    />
                </Box>
                {/* Password field added here */}
                <Box mb={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={!otpSent}
                        disabled={otpSent}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                {otpSent ? (
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="OTP"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                ) : null}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={otpSent ? handleSubmit : handleOtpRequest}
                >
                    {otpSent ? 'Submit OTP' : 'Send OTP'}
                </Button>
            </form>
        </Paper>
    );
}

export default Signup;
