// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
// import { AppBar, Toolbar, Typography, IconButton, Box, Container } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import ListIcon from "@mui/icons-material/List";
// import PersonIcon from "@mui/icons-material/Person"; // New icon for Profile
// import studentList from "./studentList";
// import Addstudent from "./Addstudent";
// import Updatestudent from "./Updatestudent";
// import Profile from "../Profile/profile";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#ff5722",
//     },
//   },
//   typography: {
//     fontFamily: "Arial, sans-serif",
//     fontSize: 14,
//   },
// });

// const Footer = () => (
//   <Box
//     component="footer"
//     sx={{
//       bgcolor: "primary.main",
//       color: "white",
//       p: 2,
//       textAlign: "center",
//       mt: "auto",
//     }}
//   >
//     <Typography variant="body2">
//       © {new Date().getFullYear()} student Dashboard.
//     </Typography>
//   </Box>
// );

// const studentDashboard = ({ token, setstudentMethod, logout }) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "100vh",
//         }}
//       >
//         {/* Navbar */}
//         <AppBar position="static">
//           <Toolbar>
//             <Typography variant="h6" sx={{ flexGrow: 1 }}>
//               student Dashboard
//             </Typography>
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/add"
//               title="Add student"
//             >
//               <PersonAddIcon />
//             </IconButton>
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/"
//               title="student List"
//             >
//               <ListIcon />
//             </IconButton>
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/profile"
//               title="Profile"
//             >
//               <PersonIcon /> {/* Profile Icon */}
//             </IconButton>
//           </Toolbar>
//         </AppBar>

//         {/* Main Content */}
//         <Container sx={{ my: 4 }}>
//           <Routes>
//             <Route path="/" element={<studentList logout={logout} token={token} setstudentMethod={setstudentMethod} />} />
//             <Route path="/add" element={<Addstudent logout={logout} token={token} setstudentMethod={setstudentMethod} />} />
//             <Route path="/update/:id" element={<Updatestudent logout={logout} token={token} setstudentMethod={setstudentMethod} />} />
//             <Route path="/profile" element={<Profile logout={logout} token={token} setstudentMethod={setstudentMethod} />} />
//             <Route path="*" element={<Navigate to="/" logout={logout} token={token} setstudentMethod={setstudentMethod} />} />
//           </Routes>
//         </Container>

//         {/* Footer */}
//         <Footer />
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default studentDashboard;






import React from "react";
import { HashRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person"; // New icon for Profile
import studentList from "./studentList";
import Addstudent from "./Addstudent";
import Updatestudent from "./Updatestudent";
import Profile from "../Profile/profile";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#ff5722",
//     },
//   },
//   typography: {
//     fontFamily: "Arial, sans-serif",
//     fontSize: 14,
//   },
// });

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

const studentDashboard = ({ token, setstudentMethod, logout, theme }) => {
  return (
    <ThemeProvider theme={theme}>
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
            <IconButton
              color="inherit"
              component={Link}
              to="/profile"
              title="Profile"
            >
              <PersonIcon /> {/* Profile Icon */}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container sx={{ my: 4 }}>
          {/* <Router> */}
            <Routes>
              <Route path="/" element={<studentList logout={logout} token={token} setstudentMethod={setstudentMethod} />} />
              <Route path="/add" element={<Addstudent logout={logout} token={token} setstudentMethod={setstudentMethod} />} />
              <Route path="/update/:id" element={<Updatestudent logout={logout} token={token} setstudentMethod={setstudentMethod} />} />
              <Route path="/profile" element={<Profile logout={logout} token={token} setstudentMethod={setstudentMethod} />} />
              <Route path="*" element={<Navigate to="/" logout={logout} token={token} setstudentMethod={setstudentMethod} />} />
            </Routes>
          {/* </Router> */}
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default studentDashboard;
