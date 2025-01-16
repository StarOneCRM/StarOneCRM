// Controller
const { Student } = require("../models/crudModel");  // Assuming export is using destructuring

// Utility function for sending structured responses
const sendResponse = (res, status, message, data = null, error = null) => {
    res.status(status).json({ 
        message, 
        data, 
        error 
    });
};

// Display All Students
const student_index = async (req, res) => {
    try {
        const students = await Student.find();
        sendResponse(res, 200, "Students retrieved successfully", students);
    } catch (err) {
        sendResponse(res, 500, "Error retrieving students", null, err.message);
    }
};

// Create New Student
const student_create_post = async (req, res) => {
    const { name, age, email, major } = req.body;

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
        const student = new Student({ name, age, email, major });
        const savedStudent = await student.save();
        sendResponse(res, 201, "Student created successfully", savedStudent);
    } catch (err) {
        if (err.code === 11000 && err.keyValue.email) {
            sendResponse(res, 422, `Email ${err.keyValue.email} is already in use`, null, err.message);
        } else {
            sendResponse(res, 500, "Error creating student", null, err.message);
        }
    }
};

// Show a particular Student Detail by Id
const student_details = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            sendResponse(res, 404, "Student not found");
        } else {
            sendResponse(res, 200, "Student retrieved successfully", student);
        }
    } catch (err) {
        sendResponse(res, 400, "Error retrieving student", null, err.message);
    }
};

// Update Student Detail by Id
const student_update = async (req, res) => {
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
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            sendResponse(res, 404, "Student not found");
        } else {
            sendResponse(res, 200, "Student updated successfully", updatedStudent);
        }
    } catch (err) {
        if (err.code === 11000 && err.keyValue.email) {
            sendResponse(res, 422, `Email ${err.keyValue.email} is already in use`, null, err.message);
        } else {
            sendResponse(res, 500, "Error updating student", null, err.message);
        }
    }
};

// Delete Student Detail by Id
const student_delete = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            sendResponse(res, 404, "Student not found");
        } else {
            sendResponse(res, 200, "Student deleted successfully");
        }
    } catch (err) {
        sendResponse(res, 500, "Error deleting student", null, err.message);
    }
};

module.exports = {
    student_index,
    student_create_post,
    student_details,
    student_update,
    student_delete,
};