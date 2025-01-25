// Controllers: student.controller.js
const { student } = require("../models/student.model");
const sendResponse = require("../utils/sendResponse");

exports.getProfile = async (req, res) => {
    try {
        // Get the authenticated student's profile based on their ID from the JWT token
        const student = await student.findById(req.student.id);
        if (!student) {
            return sendResponse(res, 404, "student not found");
        }
        sendResponse(res, 200, "Profile retrieved successfully", student);
    } catch (error) {
        sendResponse(res, 500, "Error retrieving profile", null, error.message);
    }
};

exports.updateProfile = async (req, res) => {
    const { name, age, email, major } = req.body;

    // Ensure that the fields to be updated are valid
    if (!name && !age && !email && !major) {
        return sendResponse(res, 400, "At least one field is required for update");
    }

    try {
        // Update the profile of the logged-in student
        const updatedstudent = await student.findByIdAndUpdate(
            req.student.id,
            { name, age, email, major },
            { new: true, runValidators: true }
        );

        if (!updatedstudent) {
            return sendResponse(res, 404, "student not found");
        }

        sendResponse(res, 200, "Profile updated successfully", updatedstudent);
    } catch (err) {
        sendResponse(res, 500, "Error updating profile", null, err.message);
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        // Delete the profile of the logged-in student
        const deletedstudent = await student.findByIdAndDelete(req.student.id);
        if (!deletedstudent) {
            return sendResponse(res, 404, "student not found");
        }

        sendResponse(res, 200, "Profile deleted successfully");
    } catch (err) {
        sendResponse(res, 500, "Error deleting profile", null, err.message);
    }
};
