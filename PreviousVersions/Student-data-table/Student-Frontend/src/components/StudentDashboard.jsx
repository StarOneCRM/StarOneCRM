import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentList from './StudentList';
import AddStudent from './AddStudent';
import UpdateStudent from './UpdateStudent';


const StudentDashboard = () => {
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1>Student Dashboard</h1>

      <Router>
        <nav className="route-list">
          <Link className="route-link" to="/">Student List</Link>
          <Link className="route-link" to="/add">Add Student</Link>
          {/* <Link className="route-link" to="/update/">Update Student</Link> */}
        </nav>

        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
        </Routes>
      </Router>
    </div>
  );
};

export default StudentDashboard;
