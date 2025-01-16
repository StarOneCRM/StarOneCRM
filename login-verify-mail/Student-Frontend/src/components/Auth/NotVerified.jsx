import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotVerified = ({ logout }) => {
    const navigate = useNavigate();

    return (
        <Box textAlign="center" mt={5}>
            <Typography variant="h4" color="error">
                Your form has not been verified yet!
            </Typography>
            <Typography variant="body1" mt={2}>
                Please wait for admin verification. If you have any questions, contact support.
            </Typography>

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
        </Box>
    );
};

export default NotVerified;
