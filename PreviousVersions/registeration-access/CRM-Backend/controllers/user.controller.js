// Controllers: authController.js
const jwt = require("jsonwebtoken");
const { student } = require("../models/student.model");
const sendResponse = require("../utils/sendResponse");

exports.register = async (req, res) => {
    try {
        const { name, age, email, major, isAdmin } = req.body;
        const newstudent = new student({ name, age, email, major, isAdmin });
        await newstudent.save();
        res.status(201).json({ message: "student registered. Verification email sent." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email } = req.body;
    try {
        const student = await student.findOne({ email });
        if (!student) return res.status(404).json({ message: "student not found" });

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
        const student = await student.findById(req.student.id);
        if (!student) return res.status(404).json({ message: "student not found" });

        if (!student.isFormFilled) {
            return res.status(403).json({ message: "Complete your form to access other APIs" });
        }

        res.json({ message: "Form is filled" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.fillForm = async (req, res) => {
    const { additionalInfo } = req.body;
    try {
        const student = await student.findByIdAndUpdate(
            req.student.id,
            { additionalInfo, isFormFilled: true },
            { new: true }
        );

        if (!student) return res.status(404).json({ message: "student not found" });

        res.json({ message: "Form successfully filled", student });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.checkStatus = async (req, res) => {
    try {
        const student = await student.findById(req.student.id);
        if (!student) return res.status(404).json({ message: "student not found" });

        const status = { student: student };
        res.json({ status });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
