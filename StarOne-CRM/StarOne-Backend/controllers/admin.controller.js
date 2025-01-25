// Controller
const { student } = require("../models/student.model");
const sendResponse = require("../utils/sendResponse");
const bcryptjs = require('bcryptjs');

// Display All students
exports.student_index = async (req, res) => {
    try {
        const students = await student.find();
        sendResponse(res, 200, "students retrieved successfully", students);
    } catch (err) {
        sendResponse(res, 500, "Error retrieving students", null, err.message);
    }
};

// Create New student
exports.student_create_post = async (req, res) => {
    const { name, age, email, major, password } = req.body;
    const hashedpassword = await bcryptjs.hash(password, 10);
    if (!name || !age || !email || !major) {
        return sendResponse(res, 400, "All fields are required");
    }

    if (typeof age !== "number" || age <= 0) {
        return sendResponse(res, 400, "Age must be a positive number");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return sendResponse(res, 400, "Invalid email format");
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
        return sendResponse(res, 400, "Name must contain only letters and spaces");
    }

    const majorRegex = /^[A-Za-z\s]+$/;
    if (!majorRegex.test(major)) {
        return sendResponse(res, 400, "Major must contain only letters and spaces");
    }

    try {
        const student = new student({ name, age, email, major, password:hashedpassword });
        const savedstudent = await student.save();
        sendResponse(res, 201, "student created successfully", savedstudent);
    } catch (err) {
        if (err.code === 11000 && err.keyValue.email) {
            sendResponse(res, 422, `Email ${err.keyValue.email} is already in use`, null, err.message);
        } else {
            sendResponse(res, 500, "Error creating student", null, err.message);
        }
    }
};

// Show a particular student Detail by Id
exports.student_details = async (req, res) => {
    try {
        const student = await student.findById(req.params.id);
        if (!student) {
            sendResponse(res, 404, "student not found");
        } else {
            sendResponse(res, 200, "student retrieved successfully", student);
        }
    } catch (err) {
        sendResponse(res, 400, "Error retrieving student", null, err.message);
    }
};

// Update student Detail by Id
exports.student_update = async (req, res) => {
    const { name, age, email, major } = req.body;

    if (!name && !age && !email && !major) {
        return sendResponse(res, 400, "At least one field is required for update");
    }

    if (name && !/^[A-Za-z\s]+$/.test(name)) {
        return sendResponse(res, 400, "Name must contain only letters and spaces");
    }

    if (age && (typeof age !== "number" || age <= 0)) {
        return sendResponse(res, 400, "Age must be a positive number");
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return sendResponse(res, 400, "Invalid email format");
    }

    if (major && !/^[A-Za-z\s]+$/.test(major)) {
        return sendResponse(res, 400, "Major must contain only letters and spaces");
    }

    try {
        const updatedstudent = await student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedstudent) {
            sendResponse(res, 404, "student not found");
        } else {
            sendResponse(res, 200, "student updated successfully", updatedstudent);
        }
    } catch (err) {
        if (err.code === 11000 && err.keyValue.email) {
            sendResponse(res, 422, `Email ${err.keyValue.email} is already in use`, null, err.message);
        } else {
            sendResponse(res, 500, "Error updating student", null, err.message);
        }
    }
};

// Delete student Detail by Id
exports.student_delete = async (req, res) => {
    try {
        const deletedstudent = await student.findByIdAndDelete(req.params.id);
        if (!deletedstudent) {
            sendResponse(res, 404, "student not found");
        } else {
            sendResponse(res, 200, "student deleted successfully");
        }
    } catch (err) {
        sendResponse(res, 500, "Error deleting student", null, err.message);
    }
};

exports.verifystudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedstudent = await student.findByIdAndUpdate(
            id,
            { isFormVerified: true },
            { new: true }
        );

        if (updatedstudent) {
            sendResponse(res, 200, "student updated successfully", updatedstudent);
        } else {
            sendResponse(res, 404, "student not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};