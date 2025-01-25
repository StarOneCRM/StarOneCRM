// Routes: authRoutes.js
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const { verifyJWT, isAdmin } = require("../utils/middleware");

// Auth Routes
router.post("/register", studentController.register);
router.post("/login", studentController.login);
router.get("/check-form", verifyJWT, studentController.checkForm);
router.post("/fill-form", verifyJWT, studentController.fillForm);
router.get("/check-status", verifyJWT, studentController.checkStatus);
router.post("/send-otp", studentController.sendOtp);

module.exports = router;