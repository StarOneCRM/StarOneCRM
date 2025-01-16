const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { verifyJWT, isAdmin } = require("../utils/middleware");

// CRUD Route Definitions with Middleware
router.get("/", verifyJWT, isAdmin, adminController.student_index);
router.post("/", verifyJWT, isAdmin, adminController.student_create_post);
router.get("/:id", verifyJWT, isAdmin, adminController.student_details);
router.patch("/:id", verifyJWT, isAdmin, adminController.student_update);
router.delete("/:id", verifyJWT, isAdmin, adminController.student_delete);
router.patch("/verify/:id", verifyJWT, isAdmin, adminController.verifyStudent);
module.exports = router;
