// Routes: authRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyJWT, isAdmin } = require("../utils/middleware");

// Auth Routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/check-form", verifyJWT, userController.checkForm);
router.post("/fill-form", verifyJWT, userController.fillForm);
router.get("/check-status", verifyJWT, userController.checkStatus);

module.exports = router;