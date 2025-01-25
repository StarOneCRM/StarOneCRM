// Controllers: user.controller.js
const { User } = require("../models/user.model");
const sendResponse = require("../utils/sendResponse");

exports.getProfile = async (req, res) => {
    try {
        // Get the authenticated user's profile based on their ID from the JWT token
        const user = await User.findById(req.user.id);
        if (!user) {
            return sendResponse(res, 404, "user not found");
        }
        sendResponse(res, 200, "Profile retrieved successfully", user);
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
        // Update the profile of the logged-in user
        const updateduser = await User.findByIdAndUpdate(
            req.user.id,
            { name, age, email, major },
            { new: true, runValidators: true }
        );

        if (!updateduser) {
            return sendResponse(res, 404, "user not found");
        }

        sendResponse(res, 200, "Profile updated successfully", updateduser);
    } catch (err) {
        sendResponse(res, 500, "Error updating profile", null, err.message);
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        // Delete the profile of the logged-in user
        const deleteduser = await User.findByIdAndDelete(req.user.id);
        if (!deleteduser) {
            return sendResponse(res, 404, "user not found");
        }

        sendResponse(res, 200, "Profile deleted successfully");
    } catch (err) {
        sendResponse(res, 500, "Error deleting profile", null, err.message);
    }
};
