import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import StudentDashboard from './components/Admin/StudentDashboard';
import FillForm from './components/Auth/FillForm';
import NotVerified from './components/Auth/NotVerified';
import UpdateStudent from './components/Admin/UpdateStudent';

const AppRoutes = () => {
    const { token, user, setUser, logout, handleLogin, handleSignup } = useGlobalContext();

    if (!token) {
        return (
            <Routes>
                <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup handleSignup={handleSignup} />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    if (user && !user.isFormFilled) {
        return (
            <Routes>
                <Route path="/fill-form" element={<FillForm logout={logout} token={token} setUser={setUser} />} />
                <Route path="*" element={<Navigate to="/fill-form" />} />
            </Routes>
        );
    }

    if (user && !user.isFormVerified) {
        return (
            <Routes>
                <Route path="/verifying" element={<NotVerified logout={logout} />} />
                <Route path="*" element={<Navigate to="/verifying" />} />
            </Routes>
        );
    }

    if (user && !user.isAdmin) {
        return (
            <Routes>
                <Route path="/update/:id" element={<UpdateStudent logout={logout} token={token} setUser={setUser} />} />
                <Route path="*" element={<Navigate to={`/update/${user._id}`} />} />
            </Routes>
        );
    }

    if (user && user.isAdmin) {
        return (
            <Routes>
                <Route path="*" element={<StudentDashboard logout={logout} token={token} setUser={setUser} />} />
            </Routes>
        );
    }
};

const App = () => {
    return (
        <GlobalProvider>
            <Router>
                <AppRoutes />
            </Router>
        </GlobalProvider>
    );
};

export default App;
