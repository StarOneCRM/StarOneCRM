// Controller
const { User } = require("../models/user.model");
const sendResponse = require("../utils/sendResponse");
const bcryptjs = require('bcryptjs');

// Display All users
exports.user_index = async (req, res) => {
    try {
        const users = await User.find();
        sendResponse(res, 200, "users retrieved successfully", users);
    } catch (err) {
        sendResponse(res, 500, "Error retrieving users", null, err.message);
    }
};

// Create New user
exports.user_create_post = async (req, res) => {
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
        const user = new User({ name, age, email, major, password:hashedpassword });
        const saveduser = await User.save();
        sendResponse(res, 201, "user created successfully", saveduser);
    } catch (err) {
        if (err.code === 11000 && err.keyValue.email) {
            sendResponse(res, 422, `Email ${err.keyValue.email} is already in use`, null, err.message);
        } else {
            sendResponse(res, 500, "Error creating user", null, err.message);
        }
    }
};

// Show a particular user Detail by Id
exports.user_details = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            sendResponse(res, 404, "user not found");
        } else {
            sendResponse(res, 200, "user retrieved successfully", user);
        }
    } catch (err) {
        sendResponse(res, 400, "Error retrieving user", null, err.message);
    }
};

// Update user Detail by Id
exports.user_update = async (req, res) => {
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
        const updateduser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updateduser) {
            sendResponse(res, 404, "user not found");
        } else {
            sendResponse(res, 200, "user updated successfully", updateduser);
        }
    } catch (err) {
        if (err.code === 11000 && err.keyValue.email) {
            sendResponse(res, 422, `Email ${err.keyValue.email} is already in use`, null, err.message);
        } else {
            sendResponse(res, 500, "Error updating user", null, err.message);
        }
    }
};

// Delete user Detail by Id
exports.user_delete = async (req, res) => {
    try {
        const deleteduser = await User.findByIdAndDelete(req.params.id);
        if (!deleteduser) {
            sendResponse(res, 404, "user not found");
        } else {
            sendResponse(res, 200, "user deleted successfully");
        }
    } catch (err) {
        sendResponse(res, 500, "Error deleting user", null, err.message);
    }
};

exports.verifyuser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateduser = await User.findByIdAndUpdate(
            id,
            { isFormVerified: true },
            { new: true }
        );

        if (updateduser) {
            sendResponse(res, 200, "user updated successfully", updateduser);
        } else {
            sendResponse(res, 404, "user not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};