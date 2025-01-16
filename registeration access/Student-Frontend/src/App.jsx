// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import StudentDashboard from './components/StudentDashboard';
// import FillForm from './components/FillForm';

// function App() {
//     const [token, setToken] = useState(localStorage.getItem('token') || null);
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         if (token) {
//             axios.get('http://localhost:5000/api/check-form', {
//                 headers: { Authorization: `Bearer ${token}` },
//             })
//             .then((response) => {
//                 setUser(response.data.student);
//             })
//             .catch((error) => {
//                 console.error(error.response.data.message);
//             });
//         }
//     }, [token]);

//     const handleLogin = async (credentials) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/login', credentials);
//             localStorage.setItem('token', response.data.token);
//             setToken(response.data.token);
//             setUser(response.data.student);
//         } catch (error) {
//             console.error(error.response.data.message);
//         }
//     };

//     const handleSignup = async (data) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/register', data);
//             alert(response.data.message);
//         } catch (error) {
//             console.error(error.response.data.message);
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setToken(null);
//         setUser(null);
//     };

//     if (!token) {
//         return (
//             <Router>
//                 <Routes>
//                     <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                     <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
//                     <Route path="*" element={<Navigate to="/login" />} />
//                 </Routes>
//             </Router>
//         );
//     }

//     if (user && !user.isFormFilled) {
//         return <FillForm token={token} onFormSubmit={setUser} />;
//     }

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/dashboard" element={<StudentDashboard user={user} logout={logout} />} />
//                 <Route path="*" element={<Navigate to="/dashboard" />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import StudentDashboard from './components/StudentDashboard';
// import FillForm from './components/FillForm';
// import NotVerified from './components/NotVerified'; // New component for unverified users
// import UpdateStudent from './components/UpdateStudent';

// function App() {
//     const [token, setToken] = useState(localStorage.getItem('token') || null);
//     const [user, setUser] = useState(null);

//     // useEffect(() => {
//     //     if (token) {
//     //         axios.get('http://localhost:5000/api/check-status', {
//     //             headers: { Authorization: `Bearer ${token}` },
//     //         })
//     //         .then((response) => {
//     //             console.log(response.data)
//     //             setUser({ ...response.data, token });
//     //         })
//     //         .catch((error) => {
//     //             console.error(error.response.data.message);
//     //         });
//     //     }
//     // }, [token]);
//     useEffect(() => {
//         // Log user whenever it changes
//         console.log('User updated:', user);
//     }, [user]);
//     const handleLogin = async (credentials) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/login', credentials);
//             localStorage.setItem('token', response.data.token);
//             setToken(response.data.token);
//             setUser({ ...response.data.student, token: response.data.token });
//             console.log(user)
//         } catch (error) {
//             console.error(error.response.data.message);
//         }
//     };

//     const handleSignup = async (data) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/register', data);
//             alert(response.data.message);
//         } catch (error) {
//             console.error(error.response.data.message);
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setToken(null);
//         setUser(null);
//     };

//     if (!token) {
//         return (
//             <Router>
//                 <Routes>
//                     <Route path="/login" element={<Login onLogin={handleLogin} />} />
//                     <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
//                     <Route path="*" element={<Navigate to="/login" />} />
//                 </Routes>
//             </Router>
//         );
//     }

//     if (user && !user.isFormFilled) {
//         return <FillForm token={token} onFormSubmit={setUser} />;
//     }

//     if (user && !user.isFormVerified) {
//         return (
//             <Router><NotVerified /></Router>
//         );
//     }

//     return (
//         <Router>
//             <Routes>
//                 <Route
//                     path="*"
//                     element={
//                         user.isAdmin ? (
//                         <Navigate to="/dashboard" />
//                         ) : (
//                         <Navigate to={`/update/${user.id}`} />
//                         )
//                     }
//                 />
                
//                 {/* Update Student route */}
//                 {/* <Route path="/update/:id" element={<UpdateStudent />} /> */}
                
//                 {/* Student Dashboard route */}
//                 {/* <Route path="/dashboard" element={<StudentDashboard token={token} logout={logout} />} /> */}
                
//                 {/* Default route */}
//             </Routes>
//         </Router>
//     );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentDashboard from './components/StudentDashboard';
import FillForm from './components/FillForm';
import NotVerified from './components/NotVerified'; // New component for unverified users
import UpdateStudent from './components/UpdateStudent';
import AddStudent from './components/AddStudent';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    // useEffect to check token validity on initial load
    useEffect(() => {
        const checkTokenValidity = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5000/api/check-status', {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    // If token is valid, update user data
                    setUser({ ...response.data.status.user, token });
                    console.log(response.data)
                    console.log(response.data.user)
                    localStorage.setItem('user', JSON.stringify(response.data.status.user));
                } catch (error) {
                    console.error("Token expired or invalid", error.response.data.message);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setToken(null);
                    setUser(null);
                }
            }
        };

        checkTokenValidity();
    }, []);

    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', credentials);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.student));
            setToken(response.data.token);
            setUser({ ...response.data.student, token: response.data.token });
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    const handleSignup = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/register', data);
            alert(response.data.message);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    if (!token) {
        return (
            <Router>
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        );
    }

    if (user && !user.isFormFilled && !console.log(user.isFormFilled) && !console.log(user)) {
        return (
        <Router>
            <Routes>
                <Route path="/fill-form" element={<FillForm token={token} onFormSubmit={setUser} logout={logout}/>} />
                <Route path="*" element={<Navigate to="/fill-form" />} />
            </Routes>
        </Router>
        )
        
    }

    if (user && !user.isFormVerified) {
        return (
            <Router>
                <Routes>
                    <Route path="/verifying" element={<NotVerified logout={logout} />} />
                    <Route path="*" element={<Navigate to="/verifying" />} />
                </Routes>
            </Router>
        );
    }
    if (user && !user.isAdmin) {
        return(
            <Router>
                <Routes>
                    <Route path="/update/:id" element={<UpdateStudent />} />
                    <Route path="*" element={<Navigate to={`/update/${user._id}`} />} />
                </Routes>
            </Router>
       
        )
    }
    if (user && user.isAdmin) {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<StudentDashboard token={token} logout={logout} />} />
            </Routes>
        </Router>
    );
}
}

export default App;
