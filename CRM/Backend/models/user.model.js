const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,  // Use MongoDB's ObjectId
            unique: true, // Ensure uniqueness
            required: true,  // Make it required
            default: () => new mongoose.Types.ObjectId(),  // Automatically generate ObjectId
        },
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        age: {
            type: Number,
            required: [true, "Age is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            unique: [true, "Email already exists"],
        },
        major: {
            type: String,
            required: [true, "Major is required"],
        },
        isFormFilled: {
            type: Boolean,
            default: false,
        },
        isFormVerified: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        additionalInfo: {
            type: String,  // Add any fields that you want the user to fill
            required: false,
            default: '',
        },
        password: {
            type: String,
            required: [true, "Password is required"], // Make password a required field
            minlength: [1, "Password must be at least 1 characters long"], // Optional: Add validation for password length
        },
    },
    {
        timestamps: true,
    }
);



// User Model
module.exports = {
    User: mongoose.model("User", userSchema, "Users"),
};
