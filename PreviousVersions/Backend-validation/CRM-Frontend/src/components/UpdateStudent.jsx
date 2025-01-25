// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Updatestudent = () => {
//     const { id } = useParams();
//     const [student, setstudent] = useState({ name: '', age: '', email: '', major: '' });

//     useEffect(() => {
//         axios.get(`https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/${id}`)

//             .then(response => {
//                 setstudent(response.data.data);
//                 toast.success('student data loaded successfully');
//             })
//             .catch(error => {
//                 console.error('Error fetching student:', error);
//                 toast.error('Failed to load student data');
//             });
//     }, [id]);

//     const handleChange = (e) => {
//         setstudent({ ...student, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.patch(
//                 `https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/${id}`,
//                 { ...student, age: Number(student.age) }
//             );
//             const { message, data } = response.data;
//             if (data) {
//                 toast.success(`${message}, you will be redirected shortly`);
//                 setTimeout(() => {
//                     window.location.href = '/';
//                 }, 5000);
//             }
//         } catch (error) {
//             console.error('Error updating student:', error);

//             if (error.response && error.response.data) {
//                 const { error: backendError, message } = error.response.data;

//                 if (backendError && backendError.includes('duplicate key error')) {
//                     const emailMatch = backendError.match(/email: "(.*?)"/);
//                     const duplicateEmail = emailMatch ? emailMatch[1] : 'this email';
//                     toast.error(`The email ${duplicateEmail} is already associated with another student.`);
//                 } else {
//                     toast.error(message || backendError || 'An unexpected error occurred.');
//                 }
//             } else {
//                 toast.error('Failed to update student. Please try again later.');
//             }
//         }
//     };

//     return (
//         <div className="container2">
//             <ToastContainer />
//             <h2 className="heading">Update student</h2>
//             <form onSubmit={handleSubmit} className="form">
//                 <input
//                     type="text"
//                     name="name"
//                     value={student.name}
//                     onChange={handleChange}
//                     placeholder="Name"
//                     required
//                     className="input-field"
//                 />
//                 <input
//                     type="number"
//                     name="age"
//                     value={student.age}
//                     onChange={handleChange}
//                     placeholder="Age"
//                     required
//                     className="input-field"
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     value={student.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                     required
//                     className="input-field"
//                 />
//                 <input
//                     type="text"
//                     name="major"
//                     value={student.major}
//                     onChange={handleChange}
//                     placeholder="Major"
//                     required
//                     className="input-field"
//                 />
//                 <button type="submit" className="submit-button">Update student</button>
//             </form>
//         </div>
//     );
// };

// export default Updatestudent;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import SaveIcon from '@mui/icons-material/Save';

const Updatestudent = () => {
  const { id } = useParams();
  const [student, setstudent] = useState({ name: '', age: '', email: '', major: '' });

  useEffect(() => {
    axios.get(`https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/${id}`)
      .then(response => {
        setstudent(response.data.data);
        toast.success('student data loaded successfully');
      })
      .catch(error => {
        console.error('Error fetching student:', error);
        toast.error('Failed to load student data');
      });
  }, [id]);

  const handleChange = (e) => {
    setstudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/${id}`,
        { ...student, age: Number(student.age) }
      );
      const { message, data } = response.data;
      if (data) {
        toast.success(`${message}, you will be redirected shortly`);
        setTimeout(() => {
          window.location.href = '/';
        }, 5000);
      }
    } catch (error) {
      console.error('Error updating student:', error);

      if (error.response && error.response.data) {
        const { error: backendError, message } = error.response.data;

        if (backendError && backendError.includes('duplicate key error')) {
          const emailMatch = backendError.match(/email: "(.*?)"/);
          const duplicateEmail = emailMatch ? emailMatch[1] : 'this email';
          toast.error(`The email ${duplicateEmail} is already associated with another student.`);
        } else {
          toast.error(message || backendError || 'An unexpected error occurred.');
        }
      } else {
        toast.error('Failed to update student. Please try again later.');
      }
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: '30px',
        margin: '20px auto',
        maxWidth: '500px',
        textAlign: 'center',
      }}
    >
      <ToastContainer />
      {/* <Typography variant="h4" gutterBottom>
        Update student
      </Typography> */}
        {/* <Typography variant="h4" gutterBottom style={{ color: "black", fontWeight: "600", textAlign: "center" }}>
            Update student
        </Typography> */}

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
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
            value={student.age}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            value={student.email}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Major"
            name="major"
            value={student.major}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SchoolIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          fullWidth
        >
          Update student
        </Button>
      </form>
    </Paper>
  );
};

export default Updatestudent;
