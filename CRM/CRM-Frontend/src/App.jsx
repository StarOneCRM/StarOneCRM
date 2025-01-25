// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { GlobalProvider, useGlobalContext } from './context/GlobalContext';
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';
// import userDashboard from './components/Admin/userDashboard';
// import FillForm from './components/Auth/FillForm';
// import NotVerified from './components/Auth/NotVerified';
// import Updateuser from './components/Admin/Updateuser';
// import Profile from './components/Profile/profile';

// const AppRoutes = () => {
//     const { token, user, setuserMethod, logout, handleLogin, handleSignup } = useGlobalContext();

//     if (!token) {
//         return (
//             <Routes>
//                 <Route path="/login" element={<Login handleLogin={handleLogin} />} />
//                 <Route path="/signup" element={<Signup handleSignup={handleSignup} />} />
//                 <Route path="*" element={<Navigate to="/login" />} />
//             </Routes>
//         );
//     }

//     if (user && !user.isFormFilled) {
//         return (
//             <Routes>
//                 <Route path="/fill-form" element={<FillForm logout={logout} token={token} setuserMethod={setuserMethod} />} />
//                 <Route path="*" element={<Navigate to="/fill-form" />} />
//             </Routes>
//         );
//     }

//     if (user && !user.isFormVerified) {
//         return (
//             <Routes>
//                 <Route path="/verifying" element={<NotVerified logout={logout} />} />
//                 <Route path="*" element={<Navigate to="/verifying" />} />
//             </Routes>
//         );
//     }

//     if (user && !user.isAdmin) {
//         return (
//             <Routes>
//                 {/* <Route path="/profile/:id" element={<Profile logout={logout} token={token} setuser={setuser} />} />
//                 <Route path="*" element={<Navigate to={`/profile/${user._id}`} />} /> */}
//                 <Route path="/profile" element={<Profile logout={logout} token={token} setuserMethod={setuserMethod} />} />
//                 <Route path="*" element={<Navigate to={`/profile`} />} />
//             </Routes>
//         );
//     }

//     if (user && user.isAdmin) {
//         return (
//             <Routes>
//                 <Route path="*" element={<userDashboard logout={logout} token={token} setuserMethod={setuserMethod} />} />
//             </Routes>
//         );
//     }
// };

// const App = () => {
//     return (
//         <GlobalProvider>
//             <Router>
//                 <AppRoutes />
//             </Router>
//         </GlobalProvider>
//     );
// };

// export default App;



import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import userDashboard from './components/Admin/userDashboard';
import FillForm from './components/Auth/FillForm';
import NotVerified from './components/Auth/NotVerified';
import Updateuser from './components/Admin/Updateuser';
import Profile from './components/Profile/profile';
import theme from './utils/theme';
import { ThemeProvider } from '@mui/material/styles';

const AppRoutes = () => {
    const { token, user, setuserMethod, logout, handleLogin, handleSignup } = useGlobalContext();

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
                <Route path="/fill-form" element={<FillForm logout={logout} token={token} setuserMethod={setuserMethod} />} />
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
                <Route path="/profile" element={<Profile logout={logout} token={token} setuserMethod={setuserMethod} />} />
                <Route path="*" element={<Navigate to={`/profile`} />} />
            </Routes>
        );
    }

    if (user && user.isAdmin) {
        return (
            <Routes>
                <Route path="*" element={<userDashboard logout={logout} token={token} setuserMethod={setuserMethod} theme={theme} />} />
            </Routes>
        );
    }
};

const App = () => {
    return (
        <GlobalProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <AppRoutes />
                </Router>
            </ThemeProvider>
        </GlobalProvider>
    );
};

export default App;
