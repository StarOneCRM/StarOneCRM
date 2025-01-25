// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import studentList from './studentList';
// import Addstudent from './Addstudent';
// import Updatestudent from './Updatestudent';


// const studentDashboard = () => {
//   return (
//     <div className="container" style={{ textAlign: 'center' }}>
//       <h1>student Dashboard</h1>

//       <Router>
//         <nav className="route-list">
//           <Link className="route-link" to="/">student List</Link>
//           <Link className="route-link" to="/add">Add student</Link>
//           {/* <Link className="route-link" to="/update/">Update student</Link> */}
//         </nav>

//         <Routes>
//           <Route path="/" element={<studentList />} />
//           <Route path="/add" element={<Addstudent />} />
//           <Route path="/update/:id" element={<Updatestudent />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default studentDashboard;





import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListIcon from "@mui/icons-material/List";
import studentList from "./studentList";
import Addstudent from "./Addstudent";
import Updatestudent from "./Updatestudent";

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
      © {new Date().getFullYear()} student Dashboard.
    </Typography>
  </Box>
);

const studentDashboard = () => {
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
                student Dashboard
              </Typography>
              <IconButton
                color="inherit"
                component={Link}
                to="/add"
                title="Add student"
              >
                <PersonAddIcon />
              </IconButton>
              <IconButton
                color="inherit"
                component={Link}
                to="/"
                title="student List"
              >
                <ListIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Container sx={{ my: 4 }}>
            <Routes>
              <Route path="/" element={<studentList />} />
              <Route path="/add" element={<Addstudent />} />
              <Route path="/update/:id" element={<Updatestudent />} />
            </Routes>
          </Container>

          {/* Footer */}
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default studentDashboard;
