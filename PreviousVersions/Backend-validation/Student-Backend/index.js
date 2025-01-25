require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const crudRoutes = require("./routes/crudRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

// database connection
connection();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS configuration
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
}));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("/", (req, res) => {
    res.send("Welcome to the API! Use the /api/cruds endpoint to interact with CRUD operations.");
});

// routes
app.use("/api/cruds", crudRoutes);

// listening on port
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
