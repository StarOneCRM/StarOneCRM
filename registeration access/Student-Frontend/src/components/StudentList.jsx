import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentList = ({token}) => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/cruds/"
      );
      setStudents(response.data.data);
      toast.success("Students fetched successfully");
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cruds/${id}`
      );
      if (response.data.error === null) {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== id)
        );
        toast.success("Student deleted successfully");
      } else {
        toast.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Error deleting student");
    }
  };

  const handleVerify = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/admin/verify/${id}`,{},{
          headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.data.error) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === id ? { ...student, isVerified: true } : student
          )
        );
        toast.success("Student verified successfully");
      } else {
        toast.error("Failed to verify student");
      }
    } catch (error) {
      console.error("Error verifying student:", error);
      toast.error("Error verifying student");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleMenuOpen = (event, student) => {
    setAnchorEl(event.currentTarget);
    setSelectedStudent(student);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStudent(null);
  };

  const filteredStudents = students.filter(
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
            style={{ color: '#1976d2' }}
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
          Update
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
