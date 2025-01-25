import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import axiosInstance from '../utils/axios';

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    // Check token validity on initial load
    useEffect(() => {
        const checkTokenValidity = async () => {
            if (token) {
                try {
                    const response = await axiosInstance.get('/check-status', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser({ ...response.data.status.user, token });
                    localStorage.setItem('user', JSON.stringify(response.data.status.user));
                } catch (error) {
                    console.error("Token expired or invalid", error?.response?.data?.message);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setToken(null);
                    setUser(null);
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
            localStorage.setItem('user', JSON.stringify(response.data.student));
            setToken(response.data.token);
            setUser({ ...response.data.student, token: response.data.token });
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
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <GlobalContext.Provider value={{ token, user, setUser, handleLogin, handleSignup, logout }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom Hook for using the GlobalContext
export const useGlobalContext = () => useContext(GlobalContext);
