import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import axiosInstance from '../utils/axios';

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [student, setstudent] = useState(JSON.parse(localStorage.getItem('student')) || null);

    // Check token validity on initial load
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

    // Handle Login
    const handleLogin = async (credentials) => {
        try {
            const response = await axiosInstance.post('/login', credentials);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('student', JSON.stringify(response.data.student));
            setToken(response.data.token);
            setstudent({ ...response.data.student, token: response.data.token });
        } catch (error) {
            console.error(error?.response?.data?.message);
        }
    };

    // Handle Signup
    const handleSignup = async (data) => {
        try {
            const response = await axiosInstance.post('/register', data);
            alert(response.data.message);
        } catch (error) {
            console.error(error?.response?.data?.message);
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
        <GlobalContext.Provider value={{ token, student, setstudent, handleLogin, handleSignup, logout }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom Hook for using the GlobalContext
export const useGlobalContext = () => useContext(GlobalContext);
