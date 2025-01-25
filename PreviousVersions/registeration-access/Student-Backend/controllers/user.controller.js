// Controllers: authController.js
const jwt = require("jsonwebtoken");
const { Student } = require("../models/user.model");
const sendResponse = require("../utils/sendResponse");

exports.register = async (req, res) => {
    try {
        const { name, age, email, major, isAdmin } = req.body;
        const newStudent = new Student({ name, age, email, major, isAdmin });
        await newStudent.save();
        res.status(201).json({ message: "Student registered. Verification email sent." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
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
};

exports.checkForm = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        if (!student.isFormFilled) {
            return res.status(403).json({ message: "Complete your form to access other APIs" });
        }

        res.json({ message: "Form is filled" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.fillForm = async (req, res) => {
    const { Task } = req.body;
    try {
        const student = await Student.findByIdAndUpdate(
            req.user.id,
            { Task, isFormFilled: true },
            { new: true }
        );

        if (!student) return res.status(404).json({ message: "Student not found" });

        res.json({ message: "Form successfully filled", student });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.checkStatus = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const status = { user: student };
        res.json({ status });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
