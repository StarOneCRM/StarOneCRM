import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Box, Typography, InputAdornment, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';

function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', age: '', role: '', password: '', otp: '' });
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isSendingOtp, setIsSendingOtp] = useState(false); // Tracks API call for sending OTP
    const { handleSignup } = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && otpSent) {
            setOtpSent(false);
            setIsSendingOtp(false); // Allow sending OTP again
        }
        return () => clearInterval(interval);
    }, [timer, otpSent]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isFormValid = () => {
        const { name, email, age, role, password } = formData;
        return name && email && age && role && password;
    };

    const handleOtpRequest = async () => {
        if (!isFormValid()) {
            toast.error('Please fill out all required fields before requesting OTP.');
            return;
        }

        setIsSendingOtp(true); // Hide the Send OTP button
        try {
            const result = await handleSignup(formData); // Call the handleSignup function
            if (result.success) {
                setOtpSent(true);
                setTimer(100); // Start the 100 seconds timer
                toast.info('OTP sent to your email');
            } else {
                setIsSendingOtp(false); // Re-show the button on failure
                toast.error(result.message); // Show error message from the response
            }
        } catch (error) {
            setIsSendingOtp(false); // Re-show the button on failure
            toast.error('Failed to send OTP. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await handleSignup(formData, true);
            if (result.success) {
                toast.success('Signup successful');
                setTimeout(() => {
                    navigate('/login');
                }, 7000); 
            } else {
                toast.error(result.message); 
            }
        } catch (error) {
            toast.error('Signup failed. Please try again.');
        }
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
                        label="Role"
                        name="role"
                        select
                        value={formData.role}
                        onChange={handleChange}
                        required={!otpSent}
                        disabled={otpSent}
                    >
                        <MenuItem value="Client">Client</MenuItem>
                        <MenuItem value="Employee">Employee</MenuItem>
                    </TextField>
                </Box>
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
                {!otpSent && (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleOtpRequest}
                        disabled={isSendingOtp || !isFormValid()}
                    >
                        {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
                    </Button>
                )}
                {otpSent && (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                    >
                        Submit OTP
                    </Button>
                )}
                {timer > 0 && (
                    <Typography variant="body2" color="textSecondary" mt={2}>
                        You can resend OTP in {timer}s
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/login')}
                    style={{ marginTop: '20px' }}
                >
                    Go to Login
                </Button>
            </form>
        </Paper>
    );
}

export default Signup;
