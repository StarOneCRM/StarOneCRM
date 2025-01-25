// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axios';
// import { useParams } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   TextField,
//   Button,
//   Paper,
//   Box,
//   Typography,
//   InputAdornment,
// } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import SchoolIcon from '@mui/icons-material/School';
// import SaveIcon from '@mui/icons-material/Save';

// const UpdateStudent = ({ token, setUser, logout }) => {
//   const { id } = useParams();
//   const [student, setStudent] = useState({ name: '', age: '', email: '', major: '' });

//   useEffect(() => {
//     axiosInstance.get(`/admin/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(response => {
//         setStudent(response.data.data);
//         toast.success('Student data loaded successfully');
//       })
//       .catch(error => {
//         console.error('Error fetching student:', error);
//         toast.error('Failed to load student data');
//       });
//   }, [id]);

//   const handleChange = (e) => {
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.patch(
//         `/admin/${id}`,
//         { ...student, age: Number(student.age) } ,{
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       const { message, data } = response.data;
//       if (data) {
//         toast.success(`${message}, you will be redirected shortly`);
//         setTimeout(() => {
//           window.location.href = '/';
//         }, 5000);
//       }
//     } catch (error) {
//       console.error('Error updating student:', error);

//       if (error.response && error.response.data) {
//         const { error: backendError, message } = error.response.data;

//         if (backendError && backendError.includes('duplicate key error')) {
//           const emailMatch = backendError.match(/email: "(.*?)"/);
//           const duplicateEmail = emailMatch ? emailMatch[1] : 'this email';
//           toast.error(`The email ${duplicateEmail} is already associated with another student.`);
//         } else {
//           toast.error(message || backendError || 'An unexpected error occurred.');
//         }
//       } else {
//         toast.error('Failed to update student. Please try again later.');
//       }
//     }
//   };

//   return (
//     <Paper
//       elevation={3}
//       style={{
//         padding: '30px',
//         margin: '20px auto',
//         maxWidth: '500px',
//         textAlign: 'center',
//       }}
//     >
//       <ToastContainer />

//       <form onSubmit={handleSubmit}>
//         <Box mb={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Name"
//             name="name"
//             value={student.name}
//             onChange={handleChange}
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <PersonIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//         <Box mb={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Age"
//             name="age"
//             type="number"
//             value={student.age}
//             onChange={handleChange}
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <CalendarTodayIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//         <Box mb={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Email"
//             name="email"
//             type="email"
//             value={student.email}
//             onChange={handleChange}
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <EmailIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//         <Box mb={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             label="Major"
//             name="major"
//             value={student.major}
//             onChange={handleChange}
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SchoolIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           startIcon={<SaveIcon />}
//           fullWidth
//         >
//           Update Student
//         </Button>
//       </form>
//     </Paper>
//   );
// };

// export default UpdateStudent;











import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios';
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
  Switch,
  FormControlLabel,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';

const UpdateStudent = ({ token, setUserMethod, logout }) => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: '',
    age: '',
    email: '',
    major: '',
    isFormFilled: false,
    isFormVerified: false,
    isAdmin: false,
    Task: '',
  });

  useEffect(() => {
    axiosInstance.get(`/admin/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setStudent(response.data.data);
        toast.success('Student data loaded successfully');
      })
      .catch(error => {
        console.error('Error fetching student:', error);
        toast.error('Failed to load student data');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({ ...student, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(
        `/admin/${id}`,
        { ...student, age: Number(student.age) }, {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  const handleVerify = async () => {
    try {
      const response = await axiosInstance.patch(`/admin/verify/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setStudent((prevStudent) => ({
          ...prevStudent,
          isFormVerified: true,
        }));
        toast.success("Student verified successfully");
      }
    } catch (error) {
      console.error("Error verifying student:", error);
      toast.error("Error verifying student");
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
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Task"
            name="Task"
            value={student.Task}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Box>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={student.isFormFilled}
                onChange={handleChange}
                name="isFormFilled"
                color="primary"
              />
            }
            label="Form Filled"
          />
        </Box>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={student.isFormVerified}
                onChange={handleChange}
                name="isFormVerified"
                color="primary"
              />
            }
            label="Form Verified"
          />
        </Box>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={student.isAdmin}
                onChange={handleChange}
                name="isAdmin"
                color="primary"
              />
            }
            label="Admin"
          />
        </Box>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          fullWidth
        >
          Update Student
        </Button>

        {/* Verify Button */}
        {!student.isFormVerified && (
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={handleVerify}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Verify Student
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default UpdateStudent;
