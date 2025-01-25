// GlobalContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [student, setstudent] = useState(JSON.parse(localStorage.getItem('student')) || null);

    useEffect(() => {
        const checkTokenValidity = async () => {
            if (token) {
                try {
                    const response = await axiosInstance.get('/check-status', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setstudent({ ...response.data.status.student, token });
                    localStorage.setItem('student', JSON.stringify(response.data.status.student));
                } catch (error) {
                    console.error("Token expired or invalid", error?.response?.data?.message);
                    localStorage.removeItem('token');
                    localStorage.removeItem('student');
                    setToken(null);
                    setstudent(null);
                }
            }
        };

        checkTokenValidity();
    }, [token]);

    const setstudentMethod = (newstudent) => {
        // Update the state
        setstudent(newstudent);
      
        // Save to localStorage to persist the student data
        localStorage.setItem('student', JSON.stringify(newstudent));
      };
    // Handle Login
    const handleLogin = async (credentials) => {
        try {
          const response = await axiosInstance.post('/login', credentials);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('student', JSON.stringify(response.data.student));
          
          // Assuming `setToken` and `setstudent` update the global state or context
          setToken(response.data.token);
          setstudent({ ...response.data.student, token: response.data.token });
      
          return true; // Success
        } catch (error) {
          console.error("Login error:", error?.response?.data?.message);
          
          // Show error message via toast
          toast.error(error?.response?.data?.message || 'Login failed');
          
          return false; // Failure
        }
      };
    //   const handleLogin = async (credentials) => {
    //     try {
    //         const response = await axiosInstance.post('/login', credentials);
    //         localStorage.setItem('token', response.data.token);
    //         localStorage.setItem('student', JSON.stringify(response.data.student));
    //         setToken(response.data.token);
    //         setstudent({ ...response.data.student, token: response.data.token });
    //     } catch (error) {
    //         console.error("Login error:", error?.response?.data?.message);
    //     }
    // };

    // Handle Signup
    const handleSignup = async (data, isOtpValidation = false) => {
        try {
            let response;
            if (!isOtpValidation) {
                // Step 1: Request OTP
                response = await axiosInstance.post('/send-otp', { email: data.email });
                return { success: true, message: response.data.message };
            } else {
                // Step 2: Validate OTP and Complete Signup
                response = await axiosInstance.post('/register', data);
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            console.error("Signup error:", error?.response?.data?.message);
            return { success: false, message: error?.response?.data?.message || 'An error occurred' };
        }
    };
    

    // Handle Logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('student');
        setToken(null);
        setstudent(null);
    };

    return (
        <GlobalContext.Provider value={{ token, student, handleLogin, handleSignup, logout, setstudentMethod }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);