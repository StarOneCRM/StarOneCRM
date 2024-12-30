import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/');
      // setStudents(response.data);
      setStudents(response.data.data);
      toast.success('Students fetched successfully');
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/${id}`);
      if (response.data.error === null) {
        setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
        toast.success('Student deleted successfully');
      } else {
        toast.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Error deleting student');
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

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.major.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      sortFunction: (a, b) => a.name.localeCompare(b.name),
    },
    {
      name: 'Age',
      selector: (row) => row.age,
      sortable: true,
      sortFunction: (a, b) => a.age - b.age,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      sortFunction: (a, b) => a.email.localeCompare(b.email),
    },
    {
      name: 'Major',
      selector: (row) => row.major,
      sortable: true,
      sortFunction: (a, b) => a.major.localeCompare(b.major),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => handleMenuOpen(e, row)}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer />
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Student List</h2>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', width: '100%' }}
      />
      <DataTable
        columns={columns}
        data={filteredStudents}
        pagination
        highlightOnHover
        striped
        responsive
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
      </Menu>
    </div>
  );
};

export default StudentList;
