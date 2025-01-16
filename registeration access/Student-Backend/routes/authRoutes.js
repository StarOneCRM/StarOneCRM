const express = require("express");
const jwt = require("jsonwebtoken");
const { Student } = require("../models/crudModel");
// const { sendVerificationEmail } = require("../utils/nodemailer");
const router = express.Router();
const sendResponse = (res, status, message, data = null, error = null) => {
    res.status(status).json({ 
        message, 
        data, 
        error 
    });
};
// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token invalid" });
        req.user = decoded;
        next();
    });
};

// Student Registration
router.post("/register", async (req, res) => {
    try {
        const { name, age, email, major, isAdmin } = req.body;
        const newStudent = new Student({ name, age, email, major, isAdmin });
        await newStudent.save();

        // Send verification email
        // sendVerificationEmail(email);

        res.status(201).json({ message: "Student registered. Verification email sent." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email } = req.body;

    try {
        const student = await Student.findOne({ email });
        if (!student) return res.status(404).json({ message: "Student not found" });

        const token = jwt.sign(
            { id: student._id, isAdmin: student.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, student });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Admin Dashboard
// router.get("/admin/dashboard", verifyJWT, async (req, res) => {
//     if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });

//     const students = await Student.find();
//     res.json(students);
// });

// Verify or Update Students (Admin only)
router.patch("/admin/verify/:id", verifyJWT, async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const studentId = decoded.id;
    const student = await Student.findById(studentId);
    console.log(student)
    if (!student.isAdmin) return res.status(403).json({ message: "Access denied" });

    try {
        const { id } = req.params;
        const isFormVerified = true;
        console.log(id, isFormVerified)

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { isFormVerified },
            { new: true }
        );
        console.log(updatedStudent)
        if (updatedStudent) {
            sendResponse(res, 200, "Student updated successfully", updatedStudent);
        } else {
            sendResponse(res, 404, "Student not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Check if form is filled
router.get("/check-form", verifyJWT, async (req, res) => {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (!student.isFormFilled) {
        return res.status(403).json({ message: "Complete your form to access other APIs" });
    }

    res.json({ message: "Form is filled" });
});

// Add a new route to handle the form filling
router.post("/fill-form", verifyJWT, async (req, res) => {
    const { additionalInfo } = req.body;
    try {
        const student = await Student.findByIdAndUpdate(
            req.user.id,
            { additionalInfo, isFormFilled: true },
            { new: true }
        );

        if (!student) return res.status(404).json({ message: "Student not found" });

        res.json({ message: "Form successfully filled", student });
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message });
    }
});

// Check full status (Form Verified & Form Filled)
router.get("/check-status", verifyJWT, async (req, res) => {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const status = {
        user: student,
    };

    res.json({ status });
});



module.exports = router;

