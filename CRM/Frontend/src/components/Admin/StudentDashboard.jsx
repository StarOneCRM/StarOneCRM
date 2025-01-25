// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
// import { AppBar, Toolbar, Typography, IconButton, Box, Container } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import ListIcon from "@mui/icons-material/List";
// import PersonIcon from "@mui/icons-material/Person"; // New icon for Profile
// import StudentList from "./StudentList";
// import AddStudent from "./AddStudent";
// import UpdateStudent from "./UpdateStudent";
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
//       © {new Date().getFullYear()} Student Dashboard.
//     </Typography>
//   </Box>
// );

// const StudentDashboard = ({ token, setUserMethod, logout }) => {
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
//               Student Dashboard
//             </Typography>
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/add"
//               title="Add Student"
//             >
//               <PersonAddIcon />
//             </IconButton>
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/"
//               title="Student List"
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
//             <Route path="/" element={<StudentList logout={logout} token={token} setUserMethod={setUserMethod} />} />
//             <Route path="/add" element={<AddStudent logout={logout} token={token} setUserMethod={setUserMethod} />} />
//             <Route path="/update/:id" element={<UpdateStudent logout={logout} token={token} setUserMethod={setUserMethod} />} />
//             <Route path="/profile" element={<Profile logout={logout} token={token} setUserMethod={setUserMethod} />} />
//             <Route path="*" element={<Navigate to="/" logout={logout} token={token} setUserMethod={setUserMethod} />} />
//           </Routes>
//         </Container>

//         {/* Footer */}
//         <Footer />
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default StudentDashboard;






import React from "react";
import { HashRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person"; // New icon for Profile
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
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
      © {new Date().getFullYear()} User Dashboard.
    </Typography>
  </Box>
);

const StudentDashboard = ({ token, setUserMethod, logout, theme }) => {
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
              CRM
            </Typography>
            <IconButton
              color="inherit"
              component={Link}
              to="/add"
              title="Add User"
            >
              <PersonAddIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/"
              title="User List"
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
              <Route path="/" element={<StudentList logout={logout} token={token} setUserMethod={setUserMethod} />} />
              <Route path="/add" element={<AddStudent logout={logout} token={token} setUserMethod={setUserMethod} />} />
              <Route path="/update/:id" element={<UpdateStudent logout={logout} token={token} setUserMethod={setUserMethod} />} />
              <Route path="/profile" element={<Profile logout={logout} token={token} setUserMethod={setUserMethod} />} />
              <Route path="*" element={<Navigate to="/" logout={logout} token={token} setUserMethod={setUserMethod} />} />
            </Routes>
          {/* </Router> */}
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default StudentDashboard;
