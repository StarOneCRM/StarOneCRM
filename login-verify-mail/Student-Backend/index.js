// Main application entry point
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes")

const app = express();
const PORT = process.env.PORT || 8080;

// Database connection
connection();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true
}));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// Root endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the API! Use the /api/cruds endpoint to interact with CRUD operations.");
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api", userRoutes);
app.use("/api/profile", profileRoutes);

// Start server
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));