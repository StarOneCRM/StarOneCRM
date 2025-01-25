// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
// import { AppBar, Toolbar, Typography, IconButton, Box, Container } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import ListIcon from "@mui/icons-material/List";
// import PersonIcon from "@mui/icons-material/Person"; // New icon for Profile
// import userList from "./userList";
// import Adduser from "./Adduser";
// import Updateuser from "./Updateuser";
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
//       © {new Date().getFullYear()} user Dashboard.
//     </Typography>
//   </Box>
// );

// const userDashboard = ({ token, setuserMethod, logout }) => {
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
//               user Dashboard
//             </Typography>
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/add"
//               title="Add user"
//             >
//               <PersonAddIcon />
//             </IconButton>
//             <IconButton
//               color="inherit"
//               component={Link}
//               to="/"
//               title="user List"
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
//             <Route path="/" element={<userList logout={logout} token={token} setuserMethod={setuserMethod} />} />
//             <Route path="/add" element={<Adduser logout={logout} token={token} setuserMethod={setuserMethod} />} />
//             <Route path="/update/:id" element={<Updateuser logout={logout} token={token} setuserMethod={setuserMethod} />} />
//             <Route path="/profile" element={<Profile logout={logout} token={token} setuserMethod={setuserMethod} />} />
//             <Route path="*" element={<Navigate to="/" logout={logout} token={token} setuserMethod={setuserMethod} />} />
//           </Routes>
//         </Container>

//         {/* Footer */}
//         <Footer />
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default userDashboard;






import React from "react";
import { HashRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person"; // New icon for Profile
import userList from "./userList";
import Adduser from "./Adduser";
import Updateuser from "./Updateuser";
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
      © {new Date().getFullYear()} user Dashboard.
    </Typography>
  </Box>
);

const userDashboard = ({ token, setuserMethod, logout, theme }) => {
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
              user Dashboard
            </Typography>
            <IconButton
              color="inherit"
              component={Link}
              to="/add"
              title="Add user"
            >
              <PersonAddIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/"
              title="user List"
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
              <Route path="/" element={<userList logout={logout} token={token} setuserMethod={setuserMethod} />} />
              <Route path="/add" element={<Adduser logout={logout} token={token} setuserMethod={setuserMethod} />} />
              <Route path="/update/:id" element={<Updateuser logout={logout} token={token} setuserMethod={setuserMethod} />} />
              <Route path="/profile" element={<Profile logout={logout} token={token} setuserMethod={setuserMethod} />} />
              <Route path="*" element={<Navigate to="/" logout={logout} token={token} setuserMethod={setuserMethod} />} />
            </Routes>
          {/* </Router> */}
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default userDashboard;
