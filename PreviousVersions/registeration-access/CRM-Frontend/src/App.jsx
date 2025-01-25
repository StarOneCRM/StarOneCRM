import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import studentDashboard from './components/Admin/studentDashboard';
import FillForm from './components/Auth/FillForm';
import NotVerified from './components/Auth/NotVerified';
import Updatestudent from './components/Admin/Updatestudent';
import Profile from './components/Profile/profile';

const AppRoutes = () => {
    const { token, student, setstudent, logout, handleLogin, handleSignup } = useGlobalContext();

    if (!token) {
        return (
            <Routes>
                <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup handleSignup={handleSignup} />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    if (student && !student.isFormFilled) {
        return (
            <Routes>
                <Route path="/fill-form" element={<FillForm logout={logout} token={token} setstudent={setstudent} />} />
                <Route path="*" element={<Navigate to="/fill-form" />} />
            </Routes>
        );
    }

    if (student && !student.isFormVerified) {
        return (
            <Routes>
                <Route path="/verifying" element={<NotVerified logout={logout} />} />
                <Route path="*" element={<Navigate to="/verifying" />} />
            </Routes>
        );
    }

    if (student && !student.isAdmin) {
        return (
            <Routes>
                {/* <Route path="/profile/:id" element={<Profile logout={logout} token={token} setstudent={setstudent} />} />
                <Route path="*" element={<Navigate to={`/profile/${student._id}`} />} /> */}
                <Route path="/profile" element={<Profile logout={logout} token={token} setstudent={setstudent} />} />
                <Route path="*" element={<Navigate to={`/profile`} />} />
            </Routes>
        );
    }

    if (student && student.isAdmin) {
        return (
            <Routes>
                <Route path="*" element={<studentDashboard logout={logout} token={token} setstudent={setstudent} />} />
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
