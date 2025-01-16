// Routes
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/crudController");

// Route definitions
router.get("/", studentController.student_index);
router.post("/", studentController.student_create_post);
router.get("/:id", studentController.student_details);
router.patch("/:id", studentController.student_update);
router.delete("/:id", studentController.student_delete);

module.exports = router;

