import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const studentList = () => {
  const [students, setstudents] = useState([]);
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedstudent, setSelectedstudent] = useState(null);
  const navigate = useNavigate();

  const fetchstudents = async () => {
    try {
      const response = await axios.get(
        // 'http://localhost:5000/api/cruds/'
        'https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/'  
      );
      setstudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        // `http://localhost:5000/api/cruds/${id}`
        `https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/${id}`  
      );
      fetchstudents();
    } catch (error) {
      console.error('Error deleting student:', error);
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

  const filteredstudents = students.filter((student) =>
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
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>student List</h2>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px', width: '100%' }}
      />
      <DataTable
        columns={columns}
        data={filteredstudents}
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
