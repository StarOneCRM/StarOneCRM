// import React, { useEffect, useState } from "react";
// import axiosInstance from '../../utils/axios';
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const StudentList = ({ token, setUser, logout }) => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const navigate = useNavigate();

//   const fetchStudents = async () => {
//     try {
//       const response = await axiosInstance.get("/admin/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(response.data.data);
//       toast.success("Students fetched successfully");
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axiosInstance.delete(`/admin/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.error === null) {
//         setStudents((prevStudents) =>
//           prevStudents.filter((student) => student._id !== id)
//         );
//         toast.success("Student deleted successfully");
//       } else {
//         toast.error("Failed to delete student");
//       }
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Error deleting student");
//     }
//   };

//   const handleVerify = async (id) => {
//     try {
//       const response = await axiosInstance.patch(`/admin/verify/${id}`,{},{
//           headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.data.error) {
//         setStudents((prevStudents) =>
//           prevStudents.map((student) =>
//             student._id === id ? { ...student, isVerified: true } : student
//           )
//         );
//         toast.success("Student verified successfully");
//       } else {
//         toast.error("Failed to verify student");
//       }
//     } catch (error) {
//       console.error("Error verifying student:", error);
//       toast.error("Error verifying student");
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleMenuOpen = (event, student) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedStudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedStudent(null);
//   };

//   const filteredStudents = students.filter(
//     (student) =>
//       student.name.toLowerCase().includes(search.toLowerCase()) ||
//       student.email.toLowerCase().includes(search.toLowerCase()) ||
//       student.major.toLowerCase().includes(search.toLowerCase())
//   );

//   const columns = [
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Name</span>,
//       selector: (row) =><span style={{ fontWeight: '400', fontSize: '14px' }}>{row.name}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.name.localeCompare(b.name),
//       style: {
//         header: {
//           backgroundColor: '#E3F2FD',
//           color: '#1976d2',
//           fontWeight: 'bold',
//         },
//         cell: {
//           color: '#1976d2',
//         },
//         sortIcon: {
//           color: '#1976d2',
//         }
//       }
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Age</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px', color: row.age < 20 ? '#1976d2' : row.age < 30 ? '#1565c0' : '#0d47a1' }}>{row.age}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.age - b.age,
//       style: {
//         header: {
//           backgroundColor: '#E3F2FD',
//           color: '#1976d2',
//           fontWeight: 'bold',
//         },
//         cell: {
//           color: '#1976d2',
//         },
//         sortIcon: {
//           color: '#1976d2',
//         }
//       }
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Email</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px', color: '#0d47a1', textDecoration:"underline" }}>{row.email}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.email.localeCompare(b.email),
//       style: {
//         header: {
//           backgroundColor: '#E3F2FD',
//           color: '#1976d2',
//           fontWeight: 'bold',
//         },
//         cell: {
//           color: '#1976d2',
//         },
//         sortIcon: {
//           color: '#1976d2',
//         }
//       }
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Major</span>,
//       selector: (row) => row.major,
//       sortable: true,
//       sortFunction: (a, b) => a.major.localeCompare(b.major),
//       style: {
//         header: {
//           backgroundColor: '#E3F2FD',
//           color: '#1976d2',
//           fontWeight: 'bold',
//         },
//         cell: {
//           color: '#1976d2',
//         },
//         sortIcon: {
//           color: '#1976d2',
//         }
//       }
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Actions</span>,
//       cell: (row) => (
//         <div>
//           <IconButton
//             aria-controls="simple-menu"
//             aria-haspopup="true"
//             onClick={(e) => handleMenuOpen(e, row)}
//             style={{ color: '#1976d2' }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         </div>
//       ),
//       style: {
//         header: {
//           backgroundColor: '#E3F2FD',
//           color: '#1976d2',
//           fontWeight: 'bold',
//         },
//         cell: {
//           color: '#1976d2',
//         }
//       }
//     }
//   ];

//   const customStyles = {
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
//         <IconButton
//           color="primary"
//           onClick={() => navigate("/add")}
//           aria-label="Add Student"
//         >
//           <PersonAddIcon />
//         </IconButton>
//       </div>
//       <DataTable
//         columns={columns}
//         data={filteredStudents}
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
//             navigate(`/update/${selectedStudent._id}`);
//             handleMenuClose();
//           }}
//         >
//           Update
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleDelete(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleVerify(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Verify
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default StudentList;











// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axios";
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { IconButton, Menu, MenuItem, TextField, Button, Checkbox } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const StudentList = ({ token, setUser, logout }) => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const navigate = useNavigate();

//   const fetchStudents = async () => {
//     try {
//       const response = await axiosInstance.get("/admin/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(response.data.data);
//       toast.success("Students fetched successfully");
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axiosInstance.delete(`/admin/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.error === null) {
//         setStudents((prevStudents) =>
//           prevStudents.filter((student) => student._id !== id)
//         );
//         toast.success("Student deleted successfully");
//       } else {
//         toast.error("Failed to delete student");
//       }
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Error deleting student");
//     }
//   };

//   const handleVerify = async (id) => {
//     try {
//       const response = await axiosInstance.patch(`/admin/verify/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.data.error) {
//         setStudents((prevStudents) =>
//           prevStudents.map((student) =>
//             student._id === id ? { ...student, isVerified: true } : student
//           )
//         );
//         toast.success("Student verified successfully");
//       } else {
//         toast.error("Failed to verify student");
//       }
//     } catch (error) {
//       console.error("Error verifying student:", error);
//       toast.error("Error verifying student");
//     }
//   };

//   const handleBulkAction = async (action) => {
//     try {
//       const actionPromises = selectedStudents.map(async (id) => {
//         if (action === "delete") {
//           return await axiosInstance.delete(`/admin/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//         } else if (action === "verify") {
//           return await axiosInstance.patch(`/admin/verify/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//         }
//       });
//       await Promise.all(actionPromises);
//       if (action === "delete") {
//         setStudents((prevStudents) =>
//           prevStudents.filter((student) => !selectedStudents.includes(student._id))
//         );
//         toast.success("Selected students deleted successfully");
//       } else if (action === "verify") {
//         setStudents((prevStudents) =>
//           prevStudents.map((student) =>
//             selectedStudents.includes(student._id) ? { ...student, isVerified: true } : student
//           )
//         );
//         toast.success("Selected students verified successfully");
//       }
//     } catch (error) {
//       console.error("Error performing bulk action:", error);
//       toast.error("Error performing bulk action");
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleMenuOpen = (event, student) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedStudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedStudent(null);
//   };

//   const filteredStudents = students.filter(
//     (student) =>
//       student.name.toLowerCase().includes(search.toLowerCase()) ||
//       student.email.toLowerCase().includes(search.toLowerCase()) ||
//       student.major.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleSelect = (studentId) => {
//     setSelectedStudents((prevSelected) =>
//       prevSelected.includes(studentId)
//         ? prevSelected.filter((id) => id !== studentId)
//         : [...prevSelected, studentId]
//     );
//   };

//   const columns = [
//     {
//       name: <span style={{ fontWeight: "400", fontSize: "16px" }}>Select</span>,
//       cell: (row) => (
//         <Checkbox
//           checked={selectedStudents.includes(row._id)}
//           onChange={() => handleSelect(row._id)}
//         />
//       ),
//       style: {
//         header: {
//           backgroundColor: "#E3F2FD",
//           color: "#1976d2",
//           fontWeight: "bold",
//         },
//       },
//     },
//     {
//       name: <span style={{ fontWeight: "400", fontSize: "16px" }}>Name</span>,
//       selector: (row) => <span style={{ fontWeight: "400", fontSize: "14px" }}>{row.name}</span>,
//       sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: "400", fontSize: "16px" }}>Age</span>,
//       selector: (row) => row.age,
//       sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: "400", fontSize: "16px" }}>Email</span>,
//       selector: (row) => row.email,
//       sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: "400", fontSize: "16px" }}>Major</span>,
//       selector: (row) => row.major,
//       sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: "400", fontSize: "16px" }}>Actions</span>,
//       cell: (row) => (
//         <div>
//           <IconButton
//             aria-controls="simple-menu"
//             aria-haspopup="true"
//             onClick={(e) => handleMenuOpen(e, row)}
//             style={{ color: "#1976d2" }}
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
//         <IconButton
//           color="primary"
//           onClick={() => navigate("/add")}
//           aria-label="Add Student"
//         >
//           <PersonAddIcon />
//         </IconButton>
//       </div>
//       <div style={{ marginBottom: "10px" }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => handleBulkAction("verify")}
//           disabled={selectedStudents.length === 0}
//         >
//           Verify Selected
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() => handleBulkAction("delete")}
//           disabled={selectedStudents.length === 0}
//           style={{ marginLeft: "10px" }}
//         >
//           Delete Selected
//         </Button>
//       </div>
//       <DataTable
//         columns={columns}
//         data={filteredStudents}
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
//             navigate(`/update/${selectedStudent._id}`);
//             handleMenuClose();
//           }}
//         >
//           Update
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleDelete(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleVerify(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Verify
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default StudentList;









// import React, { useEffect, useState } from "react";
// import axiosInstance from '../../utils/axios';
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { IconButton, Menu, MenuItem, TextField, Button, FormControl, Select, InputLabel, MenuItem as MuiMenuItem } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const StudentList = ({ token, setUser, logout }) => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [filterVerified, setFilterVerified] = useState(""); // Filter by verified status
//   const [filterAdmin, setFilterAdmin] = useState(""); // Filter by admin status
//   const navigate = useNavigate();

//   const fetchStudents = async () => {
//     try {
//       const response = await axiosInstance.get("/admin/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(response.data.data);
//       toast.success("Students fetched successfully");
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axiosInstance.delete(`/admin/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.error === null) {
//         setStudents((prevStudents) =>
//           prevStudents.filter((student) => student._id !== id)
//         );
//         toast.success("Student deleted successfully");
//       } else {
//         toast.error("Failed to delete student");
//       }
//     } catch (error) {
//       console.error("Error deleting student:", error);
//       toast.error("Error deleting student");
//     }
//   };

//   const handleVerify = async (id) => {
//     try {
//       const response = await axiosInstance.patch(`/admin/verify/${id}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.data.error) {
//         setStudents((prevStudents) =>
//           prevStudents.map((student) =>
//             student._id === id ? { ...student, isVerified: true } : student
//           )
//         );
//         toast.success("Student verified successfully");
//       } else {
//         toast.error("Failed to verify student");
//       }
//     } catch (error) {
//       console.error("Error verifying student:", error);
//       toast.error("Error verifying student");
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleMenuOpen = (event, student) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedStudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedStudent(null);
//   };

//   const filteredStudents = students.filter(
//     (student) =>
//       (student.name.toLowerCase().includes(search.toLowerCase()) ||
//         student.email.toLowerCase().includes(search.toLowerCase()) ||
//         student.major.toLowerCase().includes(search.toLowerCase())) &&
//       (filterVerified ? student.isVerified.toString() === filterVerified : true) &&
//       (filterAdmin ? student.isAdmin.toString() === filterAdmin : true)
//   );

//   const columns = [
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Name</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.name}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Age</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.age}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.age - b.age,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Email</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px', color: '#0d47a1', textDecoration: "underline" }}>{row.email}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.email.localeCompare(b.email),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Major</span>,
//       selector: (row) => row.major,
//       sortable: true,
//       sortFunction: (a, b) => a.major.localeCompare(b.major),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Verified</span>,
//       selector: (row) => (
//         <span
//           style={{
//             color: row.isVerified ? 'green' : 'red',
//             fontWeight: '400',
//             fontSize: '14px',
//           }}
//         >
//           {row.isVerified ? 'Verified' : 'Not Verified'}
//         </span>
//       ),
//       sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Admin</span>,
//       selector: (row) => (
//         <span
//           style={{
//             color: row.isAdmin ? '#f57c00' : '#1976d2',
//             fontWeight: '400',
//             fontSize: '14px',
//           }}
//         >
//           {row.isAdmin ? 'Admin' : 'Not Admin'}
//         </span>
//       ),
//       sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Actions</span>,
//       cell: (row) => (
//         <div>
//           <IconButton
//             aria-controls="simple-menu"
//             aria-haspopup="true"
//             onClick={(e) => handleMenuOpen(e, row)}
//             style={{ color: '#1976d2' }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         </div>
//       ),
//     }
//   ];

//   const customStyles = {
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
//         <FormControl style={{ marginRight: "10px" }}>
//           <InputLabel>Verified</InputLabel>
//           <Select
//             value={filterVerified}
//             onChange={(e) => setFilterVerified(e.target.value)}
//           >
//             <MuiMenuItem value="">All</MuiMenuItem>
//             <MuiMenuItem value="true">Verified</MuiMenuItem>
//             <MuiMenuItem value="false">Not Verified</MuiMenuItem>
//           </Select>
//         </FormControl>
//         <FormControl style={{ marginRight: "10px" }}>
//           <InputLabel>Admin</InputLabel>
//           <Select
//             value={filterAdmin}
//             onChange={(e) => setFilterAdmin(e.target.value)}
//           >
//             <MuiMenuItem value="">All</MuiMenuItem>
//             <MuiMenuItem value="true">Admin</MuiMenuItem>
//             <MuiMenuItem value="false">Not Admin</MuiMenuItem>
//           </Select>
//         </FormControl>
//         <IconButton
//           color="primary"
//           onClick={() => navigate("/add")}
//           aria-label="Add Student"
//         >
//           <PersonAddIcon />
//         </IconButton>
//       </div>
//       <DataTable
//         columns={columns}
//         data={filteredStudents}
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
//             navigate(`/update/${selectedStudent._id}`);
//             handleMenuClose();
//           }}
//         >
//           Update
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleDelete(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleVerify(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Verify
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default StudentList;









// import React, { useEffect, useState } from "react";
// import axiosInstance from '../../utils/axios';
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { IconButton, Menu, MenuItem, TextField, Button, FormControl, Select, InputLabel, MenuItem as MuiMenuItem } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const StudentList = ({ token, setUser, logout }) => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [filterVerified, setFilterVerified] = useState(false); // Filter by isFormVerified status
//   const [filterAdmin, setFilterAdmin] = useState(false); // Filter by admin status
//   const [selectedStudents, setSelectedStudents] = useState([]); // Track selected students for mass actions
//   const navigate = useNavigate();

//   const fetchStudents = async () => {
//     try {
//       const response = await axiosInstance.get("/admin/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(response.data.data);
//       toast.success("Students fetched successfully");
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await Promise.all(
//         selectedStudents.map(async (id) => {
//           await axiosInstance.delete(`/admin/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//         })
//       );
//       setStudents((prevStudents) =>
//         prevStudents.filter((student) => !selectedStudents.includes(student._id))
//       );
//       setSelectedStudents([]);
//       toast.success("Selected students deleted successfully");
//     } catch (error) {
//       console.error("Error deleting students:", error);
//       toast.error("Error deleting students");
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       await Promise.all(
//         selectedStudents.map(async (id) => {
//           await axiosInstance.patch(`/admin/verify/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//         })
//       );
//       setStudents((prevStudents) =>
//         prevStudents.map((student) =>
//           selectedStudents.includes(student._id)
//             ? { ...student, isFormVerified: true }
//             : student
//         )
//       );
//       setSelectedStudents([]);
//       toast.success("Selected students verified successfully");
//     } catch (error) {
//       console.error("Error verifying students:", error);
//       toast.error("Error verifying students");
//     }
//   };

//   const handleSelectStudent = (studentId) => {
//     setSelectedStudents((prevSelected) =>
//       prevSelected.includes(studentId)
//         ? prevSelected.filter((id) => id !== studentId)
//         : [...prevSelected, studentId]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedStudents.length === students.length) {
//       setSelectedStudents([]); // Deselect all
//     } else {
//       setSelectedStudents(students.map((student) => student._id)); // Select all
//     }
//   };

//   const handleMenuOpen = (event, student) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedStudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedStudent(null);
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const filteredStudents = students.filter(
//     (student) =>
//       (student.name.toLowerCase().includes(search.toLowerCase()) ||
//         student.email.toLowerCase().includes(search.toLowerCase()) ||
//         student.major.toLowerCase().includes(search.toLowerCase())) &&
//       (!filterVerified || student.isFormVerified) &&
//       (!filterAdmin || student.isAdmin)
//   );

//   const columns = [
//     {
//       name: (
//         <input
//           type="checkbox"
//           checked={selectedStudents.length === students.length}
//           onChange={handleSelectAll}
//         />
//       ),
//       cell: (row) => (
//         <input
//           type="checkbox"
//           checked={selectedStudents.includes(row._id)}
//           onChange={() => handleSelectStudent(row._id)}
//         />
//       ),
//       width: "5%",
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Name</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.name}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Age</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.age}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.age - b.age,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Email</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px', color: '#0d47a1', textDecoration: "underline" }}>{row.email}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.email.localeCompare(b.email),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Major</span>,
//       selector: (row) => row.major,
//       sortable: true,
//       sortFunction: (a, b) => a.major.localeCompare(b.major),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Verified</span>,
//       selector: (row) => (
//         <span
//           style={{
//             color: row.isFormVerified ? 'green' : 'red',
//             fontWeight: '400',
//             fontSize: '14px',
//           }}
//         >
//           {row.isFormVerified ? 'Verified' : 'Not Verified'}
//         </span>
//       ),
//       sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Admin</span>,
//       selector: (row) => (
//         <span
//           style={{
//             color: row.isAdmin ? '#f57c00' : '#1976d2',
//             fontWeight: '400',
//             fontSize: '14px',
//           }}
//         >
//           {row.isAdmin ? 'Admin' : 'Not Admin'}
//         </span>
//       ),
//       sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Actions</span>,
//       cell: (row) => (
//         <div>
//           <IconButton
//             aria-controls="simple-menu"
//             aria-haspopup="true"
//             onClick={(e) => handleMenuOpen(e, row)}
//             style={{ color: '#1976d2' }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         </div>
//       ),
//     }
//   ];

//   const customStyles = {
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
//         <Button
//           variant={filterVerified ? "contained" : "outlined"}
//           color="success"
//           onClick={() => setFilterVerified(!filterVerified)}
//           style={{ marginRight: "10px" }}
//         >
//           Verified
//         </Button>
//         <Button
//           variant={filterAdmin ? "contained" : "outlined"}
//           color="warning"
//           onClick={() => setFilterAdmin(!filterAdmin)}
//           style={{ marginRight: "10px" }}
//         >
//           Admin
//         </Button>
//         <IconButton
//           color="primary"
//           onClick={() => navigate("/add")}
//           aria-label="Add Student"
//         >
//           <PersonAddIcon />
//         </IconButton>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleDelete}
//           disabled={selectedStudents.length === 0}
//         >
//           Delete Selected
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleVerify}
//           disabled={selectedStudents.length === 0}
//         >
//           Verify Selected
//         </Button>
//       </div>
//       <DataTable
//         columns={columns}
//         data={filteredStudents}
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
//             navigate(`/update/${selectedStudent._id}`);
//             handleMenuClose();
//           }}
//         >
//           Update
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleDelete(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleVerify(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Verify
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default StudentList;












// import React, { useEffect, useState } from "react";
// import axiosInstance from '../../utils/axios';
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const StudentList = ({ token, setUser, logout }) => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [filterVerified, setFilterVerified] = useState(0); // 0: No filter, 1: Verified, 2: Not Verified
//   const [filterAdmin, setFilterAdmin] = useState(0); // 0: No filter, 1: Admin, 2: Not Admin
//   const [selectedStudents, setSelectedStudents] = useState([]); // Track selected students for mass actions
//   const navigate = useNavigate();

//   const fetchStudents = async () => {
//     try {
//       const response = await axiosInstance.get("/admin/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(response.data.data);
//       toast.success("Students fetched successfully");
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await Promise.all(
//         selectedStudents.map(async (id) => {
//           await axiosInstance.delete(`/admin/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//         })
//       );
//       setStudents((prevStudents) =>
//         prevStudents.filter((student) => !selectedStudents.includes(student._id))
//       );
//       setSelectedStudents([]);
//       toast.success("Selected students deleted successfully");
//     } catch (error) {
//       console.error("Error deleting students:", error);
//       toast.error("Error deleting students");
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       await Promise.all(
//         selectedStudents.map(async (id) => {
//           await axiosInstance.patch(`/admin/verify/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//         })
//       );
//       setStudents((prevStudents) =>
//         prevStudents.map((student) =>
//           selectedStudents.includes(student._id)
//             ? { ...student, isFormVerified: true }
//             : student
//         )
//       );
//       setSelectedStudents([]);
//       toast.success("Selected students verified successfully");
//     } catch (error) {
//       console.error("Error verifying students:", error);
//       toast.error("Error verifying students");
//     }
//   };

//   const handleSelectStudent = (studentId) => {
//     setSelectedStudents((prevSelected) =>
//       prevSelected.includes(studentId)
//         ? prevSelected.filter((id) => id !== studentId)
//         : [...prevSelected, studentId]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedStudents.length === students.length) {
//       setSelectedStudents([]); // Deselect all
//     } else {
//       setSelectedStudents(students.map((student) => student._id)); // Select all
//     }
//   };

//   const handleMenuOpen = (event, student) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedStudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedStudent(null);
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const filteredStudents = students.filter((student) => {
//     // Apply Verified filter
//     if (filterVerified === 1 && !student.isFormVerified) return false; // Only verified
//     if (filterVerified === 2 && student.isFormVerified) return false; // Only not verified

//     // Apply Admin filter
//     if (filterAdmin === 1 && !student.isAdmin) return false; // Only Admin
//     if (filterAdmin === 2 && student.isAdmin) return false; // Only Not Admin

//     return (
//       student.name.toLowerCase().includes(search.toLowerCase()) ||
//       student.email.toLowerCase().includes(search.toLowerCase()) ||
//       student.major.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   const columns = [
//     {
//       name: (
//         <input
//           type="checkbox"
//           checked={selectedStudents.length === students.length}
//           onChange={handleSelectAll}
//         />
//       ),
//       cell: (row) => (
//         <input
//           type="checkbox"
//           checked={selectedStudents.includes(row._id)}
//           onChange={() => handleSelectStudent(row._id)}
//         />
//       ),
//       width: "5%",
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Name</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.name}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Age</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.age}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.age - b.age,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Email</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px', color: '#0d47a1', textDecoration: "underline" }}>{row.email}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.email.localeCompare(b.email),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Major</span>,
//       selector: (row) => row.major,
//       sortable: true,
//       sortFunction: (a, b) => a.major.localeCompare(b.major),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Verified</span>,
//       selector: (row) => (
//         <span
//           style={{
//             color: row.isFormVerified ? 'green' : 'red',
//             fontWeight: '400',
//             fontSize: '14px',
//           }}
//         >
//           {row.isFormVerified ? 'Verified' : 'Not Verified'}
//         </span>
//       ),
//       sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Admin</span>,
//       selector: (row) => (
//         <span
//           style={{
//             color: row.isAdmin ? '#f57c00' : '#1976d2',
//             fontWeight: '400',
//             fontSize: '14px',
//           }}
//         >
//           {row.isAdmin ? 'Admin' : 'Not Admin'}
//         </span>
//       ),
//       sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Actions</span>,
//       cell: (row) => (
//         <div>
//           <IconButton
//             aria-controls="simple-menu"
//             aria-haspopup="true"
//             onClick={(e) => handleMenuOpen(e, row)}
//             style={{ color: '#1976d2' }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         </div>
//       ),
//     }
//   ];

//   const customStyles = {
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
//         <Button
//           variant={filterVerified === 1 ? "contained" : "outlined"}
//           color="success"
//           onClick={() => setFilterVerified((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
//           style={{ marginRight: "10px" }}
//         >
//           Verified
//         </Button>
//         <Button
//           variant={filterAdmin === 1 ? "contained" : "outlined"}
//           color="warning"
//           onClick={() => setFilterAdmin((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
//           style={{ marginRight: "10px" }}
//         >
//           Admin
//         </Button>
//         <IconButton
//           color="primary"
//           onClick={() => navigate("/add")}
//           aria-label="Add Student"
//         >
//           <PersonAddIcon />
//         </IconButton>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleDelete}
//           disabled={selectedStudents.length === 0}
//         >
//           Delete Selected
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleVerify}
//           disabled={selectedStudents.length === 0}
//         >
//           Verify Selected
//         </Button>
//       </div>
//       <DataTable
//         columns={columns}
//         data={filteredStudents}
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
//             navigate(`/update/${selectedStudent._id}`);
//             handleMenuClose();
//           }}
//         >
//           View
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleDelete(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleVerify(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Verify
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default StudentList;










// import React, { useEffect, useState } from "react";
// import axiosInstance from '../../utils/axios';
// import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const StudentList = ({ token, setUser, logout }) => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [filterVerified, setFilterVerified] = useState(0); // 0: No filter, 1: Verified, 2: Not Verified
//   const [filterAdmin, setFilterAdmin] = useState(0); // 0: No filter, 1: Admin, 2: Not Admin
//   const [selectedStudents, setSelectedStudents] = useState([]); // Track selected students for mass actions
//   const navigate = useNavigate();

//   const fetchStudents = async () => {
//     try {
//       const response = await axiosInstance.get("/admin/", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudents(response.data.data);
//       toast.success("Students fetched successfully");
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       toast.error("Failed to fetch students");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await Promise.all(
//         selectedStudents.map(async (id) => {
//           await axiosInstance.delete(`/admin/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//         })
//       );
//       setStudents((prevStudents) =>
//         prevStudents.filter((student) => !selectedStudents.includes(student._id))
//       );
//       setSelectedStudents([]);
//       toast.success("Selected students deleted successfully");
//     } catch (error) {
//       console.error("Error deleting students:", error);
//       toast.error("Error deleting students");
//     }
//   };

//   const handleVerify = async () => {
//     try {
//       await Promise.all(
//         selectedStudents.map(async (id) => {
//           await axiosInstance.patch(`/admin/verify/${id}`, {}, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//         })
//       );
//       setStudents((prevStudents) =>
//         prevStudents.map((student) =>
//           selectedStudents.includes(student._id)
//             ? { ...student, isFormVerified: true }
//             : student
//         )
//       );
//       setSelectedStudents([]);
//       toast.success("Selected students verified successfully");
//     } catch (error) {
//       console.error("Error verifying students:", error);
//       toast.error("Error verifying students");
//     }
//   };

//   const handleSelectStudent = (studentId) => {
//     setSelectedStudents((prevSelected) =>
//       prevSelected.includes(studentId)
//         ? prevSelected.filter((id) => id !== studentId)
//         : [...prevSelected, studentId]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedStudents.length === students.length) {
//       setSelectedStudents([]); // Deselect all
//     } else {
//       setSelectedStudents(students.map((student) => student._id)); // Select all
//     }
//   };

//   const handleMenuOpen = (event, student) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedStudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedStudent(null);
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const filteredStudents = students.filter((student) => {
//     // Apply Verified filter
//     if (filterVerified === 1 && !student.isFormVerified) return false; // Only verified
//     if (filterVerified === 2 && student.isFormVerified) return false; // Only not verified

//     // Apply Admin filter
//     if (filterAdmin === 1 && !student.isAdmin) return false; // Only Admin
//     if (filterAdmin === 2 && student.isAdmin) return false; // Only Not Admin

//     return (
//       student.name.toLowerCase().includes(search.toLowerCase()) ||
//       student.email.toLowerCase().includes(search.toLowerCase()) ||
//       student.major.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   const columns = [
//     {
//       name: (
//         <input
//           type="checkbox"
//           checked={selectedStudents.length === students.length}
//           onChange={handleSelectAll}
//         />
//       ),
//       cell: (row) => (
//         <input
//           type="checkbox"
//           checked={selectedStudents.includes(row._id)}
//           onChange={() => handleSelectStudent(row._id)}
//         />
//       ),
//       width: "5%",
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Name</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.name}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Age</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.age}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.age - b.age,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Email</span>,
//       selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px', color: '#0d47a1', textDecoration: "underline" }}>{row.email}</span>,
//       sortable: true,
//       sortFunction: (a, b) => a.email.localeCompare(b.email),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Major</span>,
//       selector: (row) => row.major,
//       sortable: true,
//       sortFunction: (a, b) => a.major.localeCompare(b.major),
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Status</span>,
//       selector: (row) => (
//         <div style={{ display: 'flex', gap: '5px' }}>
//           <span
//             style={{
//               borderRadius: '50%',
//               width: '15px',
//               height: '15px',
//               backgroundColor: row.isFormVerified ? 'green' : 'red',
//             }}
//           />
//           <span
//             style={{
//               borderRadius: '50%',
//               width: '15px',
//               height: '15px',
//               backgroundColor: row.isAdmin ? '#f57c00' : '#1976d2',
//             }}
//           />
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Actions</span>,
//       cell: (row) => (
//         <div>
//           <IconButton
//             aria-controls="simple-menu"
//             aria-haspopup="true"
//             onClick={(e) => handleMenuOpen(e, row)}
//             style={{ color: '#1976d2' }}
//           >
//             <MoreVertIcon />
//           </IconButton>
//         </div>
//       ),
//     }
//   ];

//   const customStyles = {
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
//         <Button
//           variant={filterVerified === 1 ? "contained" : "outlined"}
//           color="success"
//           onClick={() => setFilterVerified((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
//           style={{ marginRight: "10px" }}
//         >
//           Verified
//         </Button>
//         <Button
//           variant={filterAdmin === 1 ? "contained" : "outlined"}
//           color="warning"
//           onClick={() => setFilterAdmin((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
//           style={{ marginRight: "10px" }}
//         >
//           Admin
//         </Button>
//         <IconButton
//           color="primary"
//           onClick={() => navigate("/add")}
//           aria-label="Add Student"
//         >
//           <PersonAddIcon />
//         </IconButton>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleDelete}
//           disabled={selectedStudents.length === 0}
//         >
//           Delete Selected
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleVerify}
//           disabled={selectedStudents.length === 0}
//         >
//           Verify Selected
//         </Button>
//       </div>
//       <DataTable
//         columns={columns}
//         data={filteredStudents}
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
//             navigate(`/update/${selectedStudent._id}`);
//             handleMenuClose();
//           }}
//         >
//           View
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleDelete(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Delete
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleVerify(selectedStudent._id);
//             handleMenuClose();
//           }}
//         >
//           Verify
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default StudentList;





















import React, { useEffect, useState } from "react";
import axiosInstance from '../../utils/axios';
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentList = ({ token, setUserMethod, logout }) => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterVerified, setFilterVerified] = useState(0); // 0: No filter, 1: Verified, 2: Not Verified
  const [filterAdmin, setFilterAdmin] = useState(0); // 0: No filter, 1: Admin, 2: Not Admin
  const [selectedStudents, setSelectedStudents] = useState([]); // Track selected students for mass actions
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get("/admin/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data.data);
      toast.success("Students fetched successfully");
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students");
      setUserMethod(null);
      logout();
      navigate("/");
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedStudents.map(async (id) => {
          await axiosInstance.delete(`/admin/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
        })
      );
      setStudents((prevStudents) =>
        prevStudents.filter((student) => !selectedStudents.includes(student._id))
      );
      setSelectedStudents([]);
      toast.success("Selected students deleted successfully");
    } catch (error) {
      console.error("Error deleting students:", error);
      toast.error("Error deleting students");
    }
  };

  const handleVerify = async () => {
    try {
      await Promise.all(
        selectedStudents.map(async (id) => {
          await axiosInstance.patch(`/admin/verify/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
        })
      );
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          selectedStudents.includes(student._id)
            ? { ...student, isFormVerified: true }
            : student
        )
      );
      setSelectedStudents([]);
      toast.success("Selected students verified successfully");
    } catch (error) {
      console.error("Error verifying students:", error);
      toast.error("Error verifying students");
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]); // Deselect all
    } else {
      setSelectedStudents(students.map((student) => student._id)); // Select all
    }
  };

  const handleMenuOpen = (event, student) => {
    setAnchorEl(event.currentTarget);
    setSelectedStudent(student);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStudent(null);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    // Apply Verified filter
    if (filterVerified === 1 && !student.isFormVerified) return false; // Only verified
    if (filterVerified === 2 && student.isFormVerified) return false; // Only not verified

    // Apply Admin filter
    if (filterAdmin === 1 && !student.isAdmin) return false; // Only Admin
    if (filterAdmin === 2 && student.isAdmin) return false; // Only Not Admin

    return (
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.major.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columns = [
    {
      name: (
        <input
          type="checkbox"
          checked={selectedStudents.length === students.length}
          onChange={handleSelectAll}
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedStudents.includes(row._id)}
          onChange={() => handleSelectStudent(row._id)}
        />
      ),
      width: "5%",
    },
    {
      name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Name</span>,
      selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.name}</span>,
      sortable: true,
      sortFunction: (a, b) => a.name.localeCompare(b.name),
    },
    {
      name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Age</span>,
      selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px' }}>{row.age}</span>,
      sortable: true,
      sortFunction: (a, b) => a.age - b.age,
    },
    {
      name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Email</span>,
      selector: (row) => <span style={{ fontWeight: '400', fontSize: '14px', color: '#0d47a1', textDecoration: "underline" }}>{row.email}</span>,
      sortable: true,
      sortFunction: (a, b) => a.email.localeCompare(b.email),
    },
    {
      name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Major</span>,
      selector: (row) => row.major,
      sortable: true,
      sortFunction: (a, b) => a.major.localeCompare(b.major),
    },
    {
      name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Status</span>,
      selector: (row) => (
        <div>
          <span
            style={{
              color: row.isFormVerified ? 'green' : 'red',
              fontWeight: '400',
              fontSize: '14px',
            }}
          >
            {row.isFormVerified ? '✔ Verified' : '✖ Not Verified'}
          </span>
          <br />
          <span
            style={{
              color: row.isAdmin ? '#f57c00' : '#1976d2',
              fontWeight: '400',
              fontSize: '14px',
            }}
          >
            {row.isAdmin ? '✔ Admin' : '✖ Not Admin'}
          </span>
        </div>
      ),
      // sortable: true,
    },
    {
      name: <span style={{ fontWeight: '400', fontSize: '16px' }}>Actions</span>,
      cell: (row) => (
        <div>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => handleMenuOpen(e, row)}
            style={{ color: '#1976d2' }}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      ),
    }
  ];

  const customStyles = {
    rows: {
      style: {
        "&:nth-of-type(odd)": {
          backgroundColor: "#ffffff",
        },
        "&:nth-of-type(even)": {
          backgroundColor: "#f0f7ff",
        },
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer />
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
          aria-label="Add Student"
        >
          <PersonAddIcon />
        </IconButton>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>

        <Button
          variant={filterVerified === 1 ? "contained" : "outlined"}
          color="success"
          onClick={() => setFilterVerified((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
          style={{ marginRight: "10px" }}
        >
          Verified
        </Button>
        <Button
          variant={filterAdmin === 1 ? "contained" : "outlined"}
          color="warning"
          onClick={() => setFilterAdmin((prev) => (prev + 1) % 3)} // Cycle through 0, 1, 2
          style={{ marginRight: "10px" }}
        >
          Admin
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          disabled={selectedStudents.length === 0}
        >
          Delete Selected
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerify}
          disabled={selectedStudents.length === 0}
        >
          Verify Selected
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={filteredStudents}
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
            navigate(`/update/${selectedStudent._id}`);
            handleMenuClose();
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(selectedStudent._id);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleVerify(selectedStudent._id);
            handleMenuClose();
          }}
        >
          Verify
        </MenuItem>
      </Menu>
    </div>
  );
};

export default StudentList;
