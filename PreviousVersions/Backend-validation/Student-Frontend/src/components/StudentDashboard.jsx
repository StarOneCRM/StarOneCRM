// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import StudentList from './StudentList';
// import AddStudent from './AddStudent';
// import UpdateStudent from './UpdateStudent';


// const StudentDashboard = () => {
//   return (
//     <div className="container" style={{ textAlign: 'center' }}>
//       <h1>Student Dashboard</h1>

//       <Router>
//         <nav className="route-list">
//           <Link className="route-link" to="/">Student List</Link>
//           <Link className="route-link" to="/add">Add Student</Link>
//           {/* <Link className="route-link" to="/update/">Update Student</Link> */}
//         </nav>

//         <Routes>
//           <Route path="/" element={<StudentList />} />
//           <Route path="/add" element={<AddStudent />} />
//           <Route path="/update/:id" element={<UpdateStudent />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default StudentDashboard;





import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListIcon from "@mui/icons-material/List";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff5722",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
  },
});

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: "primary.main",
      color: "white",
      p: 2,
      textAlign: "center",
      mt: "auto",
    }}
  >
    <Typography variant="body2">
      © {new Date().getFullYear()} Student Dashboard.
    </Typography>
  </Box>
);

const StudentDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* Navbar */}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Student Dashboard
              </Typography>
              <IconButton
                color="inherit"
                component={Link}
                to="/add"
                title="Add Student"
              >
                <PersonAddIcon />
              </IconButton>
              <IconButton
                color="inherit"
                component={Link}
                to="/"
                title="Student List"
              >
                <ListIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Container sx={{ my: 4 }}>
            <Routes>
              <Route path="/" element={<StudentList />} />
              <Route path="/add" element={<AddStudent />} />
              <Route path="/update/:id" element={<UpdateStudent />} />
            </Routes>
          </Container>

          {/* Footer */}
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default StudentDashboard;
