import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import studentList from './studentList';
import Addstudent from './Addstudent';
import Updatestudent from './Updatestudent';


const studentDashboard = () => {
  return (
    <div className="container">
      <h1>student Dashboard</h1>

      <Router>
        <nav className="route-list">
          <Link className="route-link" to="/">student List</Link>
          <Link className="route-link" to="/add">Add student</Link>
          {/* <Link className="route-link" to="/update/">Update student</Link> */}
        </nav>

        <Routes>
          <Route path="/" element={<studentList />} />
          <Route path="/add" element={<Addstudent />} />
          <Route path="/update/:id" element={<Updatestudent />} />
        </Routes>
      </Router>
    </div>
  );
};

export default studentDashboard;
