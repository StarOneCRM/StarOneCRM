// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DataTable from 'react-data-table-component';
// import { useNavigate } from 'react-router-dom';
// import { IconButton, Menu, MenuItem, TextField } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const studentList = () => {
//   const [students, setstudents] = useState([]);
//   const [search, setSearch] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedstudent, setSelectedstudent] = useState(null);
//   const navigate = useNavigate();

//   const fetchstudents = async () => {
//     try {
//       const response = await axios.get('https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/');
//       // setstudents(response.data);
//       setstudents(response.data.data);
//       toast.success('students fetched successfully');
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       toast.error('Failed to fetch students');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/${id}`);
//       if (response.data.error === null) {
//         setstudents((prevstudents) => prevstudents.filter((student) => student._id !== id));
//         toast.success('student deleted successfully');
//       } else {
//         toast.error('Failed to delete student');
//       }
//     } catch (error) {
//       console.error('Error deleting student:', error);
//       toast.error('Error deleting student');
//     }
//   };
//   useEffect(() => {
//     fetchstudents();
//   }, []);

//   const handleMenuOpen = (event, student) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedstudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedstudent(null);
//   };

//   const filteredstudents = students.filter((student) =>
//     student.name.toLowerCase().includes(search.toLowerCase()) ||
//     student.email.toLowerCase().includes(search.toLowerCase()) ||
//     student.major.toLowerCase().includes(search.toLowerCase())
//   );

//   const columns = [
//     {
//       name: 'Name',
//       selector: (row) => row.name,
//       sortable: true,
//       sortFunction: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       name: 'Age',
//       selector: (row) => row.age,
//       sortable: true,
//       sortFunction: (a, b) => a.age - b.age,
//     },
//     {
//       name: 'Email',
//       selector: (row) => row.email,
//       sortable: true,
//       sortFunction: (a, b) => a.email.localeCompare(b.email),
//     },
//     {
//       name: 'Major',
//       selector: (row) => row.major,
//       sortable: true,
//       sortFunction: (a, b) => a.major.localeCompare(b.major),
//     },
//     {
//       name: 'Actions',
//       cell: (row) => (
//         <div>
//           <IconButton
//             aria-controls="simple-menu"
//             aria-haspopup="true"
//             onClick={(e) => handleMenuOpen(e, row)}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <ToastContainer />
//       <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>student List</h2>
//       <TextField
//         variant="outlined"
//         placeholder="Search..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{ marginBottom: '20px', width: '100%' }}
//       />
//       <DataTable
//         columns={columns}
//         data={filteredstudents}
//         pagination
//         highlightOnHover
//         striped
//         responsive
//       />

//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem
//           onClick={() => {
//             navigate(`/update/${selectedstudent._id}`);
//             handleMenuClose();
//           }}
//         >
//           Update
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleDelete(selectedstudent._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default studentList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DataTable from 'react-data-table-component';
// import { useNavigate } from 'react-router-dom';
// import { Box, IconButton, Menu, MenuItem, TextField, Button } from '@mui/material';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const studentList = () => {
//   const [students, setstudents] = useState([]);
//   const [search, setSearch] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedstudent, setSelectedstudent] = useState(null);
//   const navigate = useNavigate();

//   const fetchstudents = async () => {
//     try {
//       const response = await axios.get('https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/');
//       setstudents(response.data.data);
//       toast.success('students fetched successfully');
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       toast.error('Failed to fetch students');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/${id}`);
//       if (response.data.error === null) {
//         setstudents((prevstudents) => prevstudents.filter((student) => student._id !== id));
//         toast.success('student deleted successfully');
//       } else {
//         toast.error('Failed to delete student');
//       }
//     } catch (error) {
//       console.error('Error deleting student:', error);
//       toast.error('Error deleting student');
//     }
//   };

//   useEffect(() => {
//     fetchstudents();
//   }, []);

//   const handleMenuOpen = (event, student) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedstudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedstudent(null);
//   };

//   const filteredstudents = students.filter((student) =>
//     student.name.toLowerCase().includes(search.toLowerCase()) ||
//     student.email.toLowerCase().includes(search.toLowerCase()) ||
//     student.major.toLowerCase().includes(search.toLowerCase())
//   );

//   const columns = [
//     {
//       name: 'Name',
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: 'Age',
//       selector: (row) => row.age,
//       sortable: true,
//     },
//     {
//       name: 'Email',
//       selector: (row) => row.email,
//       sortable: true,
//     },
//     {
//       name: 'Major',
//       selector: (row) => row.major,
//       sortable: true,
//     },
//     {
//       name: 'Actions',
//       cell: (row) => (
//         <IconButton
//           aria-controls="simple-menu"
//           aria-haspopup="true"
//           onClick={(e) => handleMenuOpen(e, row)}
//         >
//           <MoreVertIcon />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <ToastContainer />
//       <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>student List</h2>
//       <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
//         <TextField
//           variant="outlined"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ flex: 1, borderRadius: '8px' }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<PersonAddIcon />}
//           onClick={() => navigate('/add')}
//         >
//           Add
//         </Button>
//       </Box>
//       <DataTable
//         columns={columns}
//         data={filteredstudents}
//         pagination
//         highlightOnHover
//         striped
//         responsive
//       />
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem
//           onClick={() => {
//             navigate(`/update/${selectedstudent._id}`);
//             handleMenuClose();
//           }}
//         >
//           Update
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleDelete(selectedstudent._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default studentList;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const studentList = () => {
//   const [students, setstudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedstudent, setSelectedstudent] = useState(null);
//   const navigate = useNavigate();

//   const fetchstudents = async () => {
//     try {
//       const response = await axios.get(
//         "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/"
//       );
//       setstudents(response.data.data);
//       toast.success("students fetched successfully");
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(
//         `https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/${id}`
//       );
//       if (response.data.error === null) {
//         setstudents((prevstudents) =>
//           prevstudents.filter((student) => student._id !== id)
//         );
//         toast.success("student deleted successfully");
//       } else {
//         toast.error("Failed to delete student");
//       }
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Error deleting student");
//     }
//   };

//   useEffect(() => {
//     fetchstudents();
//   }, []);

//   const handleMenuOpen = (event, student) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedstudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedstudent(null);
//   };

//   const filteredstudents = students.filter(
//     (student) =>
//       student.name.toLowerCase().includes(search.toLowerCase()) ||
//       student.email.toLowerCase().includes(search.toLowerCase()) ||
//       student.major.toLowerCase().includes(search.toLowerCase())
//   );

//   const columns = [
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//       sortFunction: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       name: "Age",
//       selector: (row) => row.age,
//       sortable: true,
//       sortFunction: (a, b) => a.age - b.age,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       sortable: true,
//       sortFunction: (a, b) => a.email.localeCompare(b.email),
//     },
//     {
//       name: "Major",
//       selector: (row) => row.major,
//       sortable: true,
//       sortFunction: (a, b) => a.major.localeCompare(b.major),
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div>
//           <IconButton
//             aria-controls="simple-menu"
//             aria-haspopup="true"
//             onClick={(e) => handleMenuOpen(e, row)}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];

//   const customStyles = {
//     rows: {
//       style: {
//         "&:nth-of-type(odd)": {
//           backgroundColor: "#ffffff",
//         },
//         "&:nth-of-type(even)": {
//           backgroundColor: "#f0f7ff", // Light shade of blue
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <ToastContainer />
//       <h2 style={{ marginBottom: "20px", textAlign: "center" }}>student List</h2>
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
//         <TextField
//           variant="outlined"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ flex: 1, marginRight: "10px" }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<MoreVertIcon />}
//           onClick={() => navigate("/add")}
//         >
//           Add student
//         </Button>
//       </div>
//       <DataTable
//         columns={columns}
//         data={filteredstudents}
//         pagination
//         highlightOnHover
//         striped
//         responsive
//         customStyles={customStyles}
//       />
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem
//           onClick={() => {
//             navigate(`/update/${selectedstudent._id}`);
//             handleMenuClose();
//           }}
//         >
//           Update
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleDelete(selectedstudent._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default studentList;






import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const studentList = () => {
  const [students, setstudents] = useState([]);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedstudent, setSelectedstudent] = useState(null);
  const navigate = useNavigate();

  const fetchstudents = async () => {
    try {
      const response = await axios.get(
        "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/"
      );
      setstudents(response.data.data);
      toast.success("students fetched successfully");
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/${id}`
      );
      if (response.data.error === null) {
        setstudents((prevstudents) =>
          prevstudents.filter((student) => student._id !== id)
        );
        toast.success("student deleted successfully");
      } else {
        toast.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Error deleting student");
    }
  };

  useEffect(() => {
    fetchstudents();
  }, []);

  const handleMenuOpen = (event, student) => {
    setAnchorEl(event.currentTarget);
    setSelectedstudent(student);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedstudent(null);
  };

  const filteredstudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.major.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Name</span>,
      selector: (row) =><span style={{ fontWeight: '400', fontSize: '14px' }}>{row.name}</span>,
      sortable: true,
      sortFunction: (a, b) => a.name.localeCompare(b.name),
      style: {
        header: {
          backgroundColor: '#E3F2FD', // Light background for better readability
          color: '#1976d2', // Header text color matching the theme
          fontWeight: 'bold',
        },
        cell: {
          color: '#1976d2', // Text color for cell values
        },
        sortIcon: {
          color: '#1976d2', // Sort icon color
        }
      }
    },
    {
      name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Age</span>,
      selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px', color: row.age < 20 ? '#1976d2' : row.age < 30 ? '#1565c0' : '#0d47a1' }}>{row.age}</span>,
      sortable: true,
      sortFunction: (a, b) => a.age - b.age,
      style: {
        header: {
          backgroundColor: '#E3F2FD',
          color: '#1976d2',
          fontWeight: 'bold',
        },
        cell: {
          color: '#1976d2',
        },
        sortIcon: {
          color: '#1976d2',
        }
      }
    },
    {
      name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Email</span>,
      selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px', color: '#0d47a1', textDecoration:"underline" }}>{row.email}</span>,
      sortable: true,
      sortFunction: (a, b) => a.email.localeCompare(b.email),
      style: {
        header: {
          backgroundColor: '#E3F2FD',
          color: '#1976d2',
          fontWeight: 'bold',
        },
        cell: {
          color: '#1976d2',
        },
        sortIcon: {
          color: '#1976d2',
        }
      }
    },
    {
      name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Major</span>,
      selector: (row) => row.major,
      sortable: true,
      sortFunction: (a, b) => a.major.localeCompare(b.major),
      style: {
        header: {
          backgroundColor: '#E3F2FD',
          color: '#1976d2',
          fontWeight: 'bold',
        },
        cell: {
          color: '#1976d2',
        },
        sortIcon: {
          color: '#1976d2',
        }
      }
    },
    {
      name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Actions</span>,
      cell: (row) => (
        <div>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => handleMenuOpen(e, row)}
            style={{ color: '#1976d2' }} // IconButton color matching the theme
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      ),
      style: {
        header: {
          backgroundColor: '#E3F2FD',
          color: '#1976d2',
          fontWeight: 'bold',
        },
        cell: {
          color: '#1976d2',
        }
      }
    }
  ];
  

  const customStyles = {
    rows: {
      style: {
        "&:nth-of-type(odd)": {
          backgroundColor: "#ffffff",
        },
        "&:nth-of-type(even)": {
          backgroundColor: "#f0f7ff", // Light shade of blue
        },
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer />
      {/* <h2 style={{ marginBottom: "20px", textAlign: "center" }}>student List</h2> */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, marginRight: "10px" }}
        />
        <IconButton
          color="primary"
          onClick={() => navigate("/add")}
          aria-label="Add student"
        >
          <PersonAddIcon />
        </IconButton>
      </div>
      <DataTable
        columns={columns}
        data={filteredstudents}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            navigate(`/update/${selectedstudent._id}`);
            handleMenuClose();
          }}
        >
          Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(selectedstudent._id);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default studentList;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { IconButton, Menu, MenuItem, TextField, Tooltip } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import MailIcon from "@mui/icons-material/Mail";
// import SchoolIcon from "@mui/icons-material/School";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import CakeIcon from "@mui/icons-material/Cake";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ActionsIcon from "@mui/icons-material/Build"; // Example icon, replace with the appropriate one if needed

// const studentList = () => {
//   const [students, setstudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedstudent, setSelectedstudent] = useState(null);
//   const navigate = useNavigate();

//   const fetchstudents = async () => {
//     try {
//       const response = await axios.get(
//         "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/"
//       );
//       setstudents(response.data.data);
//       toast.success("students fetched successfully");
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(
//         `https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/${id}`
//       );
//       if (response.data.error === null) {
//         setstudents((prevstudents) =>
//           prevstudents.filter((student) => student._id !== id)
//         );
//         toast.success("student deleted successfully");
//       } else {
//         toast.error("Failed to delete student");
//       }
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Error deleting student");
//     }
//   };

//   useEffect(() => {
//     fetchstudents();
//   }, []);

//   const handleMenuOpen = (event, student) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedstudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedstudent(null);
//   };

//   const filteredstudents = students.filter(
//     (student) =>
//       student.name.toLowerCase().includes(search.toLowerCase()) ||
//       student.email.toLowerCase().includes(search.toLowerCase()) ||
//       student.major.toLowerCase().includes(search.toLowerCase())
//   );

//   const columns = [
//     {
//       name: (
//         <span
//           style={{
//             fontWeight: "",
//             display: "flex",
//             alignItems: "center", // Aligns items vertically
//           }}
//         >
//           {/* <AccountCircleIcon style={{ marginRight: "4px" }} /> Adjust spacing if needed */}
//           <span style={{ fontSize: "15px" }}>Name</span>
//         </span>
//       ),
//       selector: (row) => row.name,
//       sortable: true,
//       cell: (row) => <span style={{ fontWeight: 500 }}>{row.name}</span>,
//     },
//     {
//       name: (
//         <span
//           style={{
//             fontWeight: "",
//             display: "flex",
//             alignItems: "center", // Aligns items vertically
//           }}
//         >
//           {/* <CakeIcon style={{ marginRight: "4px" }} /> */}
//           <span style={{ fontSize: "15px" }}>Age</span>
//         </span>
//       ),
//       selector: (row) => row.age,
//       sortable: true,
//       cell: (row) => (
//         <span
//           style={{
//             fontWeight: "bold",
//             color: row.age < 20 ? "#1976d2" : `darkblue`,
//           }}
//         >
//           {row.age}
//         </span>
//       ),
//     },
//     {
//       name: (
//         <span
//           style={{
//             fontWeight: "",
//             display: "flex",
//             alignItems: "center", // Aligns items vertically
//           }}
//         >
//           {/* <MailIcon style={{ marginRight: "4px" }} /> */}
//           <span style={{ fontSize: "15px" }}>Email</span>
//         </span>
//       ),
//       selector: (row) => row.email,
//       sortable: true,
//       cell: (row) => (
//         <span style={{ color: "darkblue", textDecoration: "underline" }}>
//           {row.email}
//         </span>
//       ),
//     },
//     {
//       name: (
//         <span
//           style={{
//             fontWeight: "",
//             display: "flex",
//             alignItems: "center", // Aligns items vertically
//           }}
//         >
//           {/* <SchoolIcon style={{ marginRight: "4px" }} /> */}
//           <span style={{ fontSize: "15px" }}>Major</span>
//         </span>
//       ),
//       selector: (row) => row.major,
//       sortable: true,
//       cell: (row) => <span style={{ fontStyle: "" }}>{row.major}</span>,
//     },
//     {
//       name: (
//         <span
//           style={{
//             fontWeight: "",
//             display: "flex",
//             alignItems: "center", // Aligns items vertically
//           }}
//         >
//           {/* <ActionsIcon style={{ marginRight: "4px" }} /> Replace ActionsIcon with an appropriate icon */}
//           <span style={{ fontSize: "15px" }}></span>
//         </span>
//       ),
//       cell: (row) => (
//         <div style={{ display: "flex", gap: "10px" }}>
//           <IconButton
//             aria-label="Edit student"
//             color="primary"
//             onClick={() => navigate(`/update/${row._id}`)}
//           >
//             <EditIcon />
//           </IconButton>
//           <IconButton
//             aria-label="Delete student"
//             color="secondary"
//             onClick={() => handleDelete(row._id)}
//           >
//             <DeleteIcon style={{ color:"#1976d2" }}/>
//           </IconButton>
//         </div>
//       ),
//     },
//   ];
  
//   const customStyles = {
//     header: {
//       style: {
//         backgroundColor: "#eaf1fc",
//         color: "#333",
//         fontWeight: "bold",
//         fontSize: "1.1rem",
//       },
//     },
//     rows: {
//       style: {
//         "&:nth-of-type(odd)": {
//           backgroundColor: "#ffffff",
//         },
//         "&:nth-of-type(even)": {
//           backgroundColor: "#f0f7ff",
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <ToastContainer />
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
//         <TextField
//           variant="outlined"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ flex: 1, marginRight: "10px" }}
//         />
//         <Tooltip title="Add student">
//           <IconButton
//             color="primary"
//             onClick={() => navigate("/add")}
//             aria-label="Add student"
//           >
//             <PersonAddIcon />
//           </IconButton>
//         </Tooltip>
//       </div>
//       <DataTable
//         columns={columns}
//         data={filteredstudents}
//         pagination
//         highlightOnHover
//         striped
//         responsive
//         customStyles={customStyles}
//       />
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem
//           onClick={() => {
//             navigate(`/update/${selectedstudent._id}`);
//             handleMenuClose();
//           }}
//         >
//           Update
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleDelete(selectedstudent._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default studentList;
