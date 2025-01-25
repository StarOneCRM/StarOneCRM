const mongoose = require("mongoose");

// Counter Schema
const counterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    sequence_value: {
        type: Number,
        default: 0
    }
});

// user Schema with Auto-Generated user ID
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true, // Ensure unique user ID
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        unique: [true, "Email already exists"]
    },
    major: {
        type: String,
        required: [true, "Major is required"]
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Counter model
const Counter = mongoose.model('Counter', counterSchema);

// Pre-save hook to generate userId
userSchema.pre('save', async function (next) {
    if (this.isNew && !this.userId) {
        const counter = await Counter.findOneAndUpdate(
            { name: 'userId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        this.userId = `STU${counter.sequence_value.toString().padStart(4, '0')}`;
    }
    next();
});

module.exports = mongoose.model("user", userSchema, "users");


const user = require("../models/crudModel");

// Structure
const sendResponse = (res, status, message, data = null, error = null) => {
    res.status(status).json({ 
        message, 
        data, 
        error 
    });
};

// Display All users
const user_index = (req, res) => {
    user.find()
        .then((users) => {
            sendResponse(res, 200, "users retrieved successfully", users);
        })
        .catch((err) => {
            sendResponse(res, 500, "Error retrieving users", null, err.message);
        });
};

// Create New user
const user_create_post = (req, res) => {
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
    if (typeof name !== "string" || name.trim().length === 0 || !nameRegex.test(name)) {
        return sendResponse(res, 400, "Name must be a non-empty string with no numbers or special characters");
    }

    const majorRegex = /^[A-Za-z\s]+$/;
    if (typeof major !== "string" || major.trim().length === 0 || !majorRegex.test(major)) {
        return sendResponse(res, 400, "Major must be a non-empty string with no numbers or special characters");
    }
    const user = new user({ name, age, email, major });
    user
        .save()
        .then((saveduser) => {
            sendResponse(res, 201, "user created successfully", saveduser);
        })
        .catch((err) => {
            sendResponse(res, 422, "Failed to add user", null, err.message);
        });
};

// Show a particular user Detail by Id
const user_details = (req, res) => {
    user.findById(req.params.id)
        .then((user) => {
            if (!user) {
                sendResponse(res, 404, "user not found");
            } else {
                sendResponse(res, 200, "user retrieved successfully", user);
            }
        })
        .catch((err) => {
            sendResponse(res, 400, "Error retrieving user", null, err.message);
        });
};

// Update user Detail by Id
const user_update = (req, res) => {
    const { name, age, email, major } = req.body;

    // Server-side validation
    if (!name && !age && !email && !major) {
        return sendResponse(res, 400, "At least one field is required for update");
    }

    if (name) {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (typeof name !== "string" || name.trim().length === 0 || !nameRegex.test(name)) {
            return sendResponse(res, 400, "Name must be a non-empty string with no numbers or special characters");
        }
    }

    if (age) {
        if (typeof age !== "number" || age <= 0) {
            return sendResponse(res, 400, "Age must be a positive number");
        }
    }

    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return sendResponse(res, 400, "Invalid email format");
        }
    }

    if (major) {
        const majorRegex = /^[A-Za-z\s]+$/;
        if (typeof major !== "string" || major.trim().length === 0 || !majorRegex.test(major)) {
            return sendResponse(res, 400, "Major must be a non-empty string with no numbers or special characters");
        }
    }

    user.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((updateduser) => {
            if (!updateduser) {
                sendResponse(res, 404, "user not found");
            } else {
                sendResponse(res, 200, "user updated successfully", updateduser);
            }
        })
        .catch((err) => {
            if (err.name === "MongoError" && err.code === 11000) {
                const emailMatch = err.message.match(/email: "(.*?)"/);
                const duplicateEmail = emailMatch ? emailMatch[1] : 'this email';
                sendResponse(res, 422, `The email ${duplicateEmail} is already associated with another user`, null, err.message);
            } else {
                sendResponse(res, 422, "Failed to update user", null, err.message);
            }
        });
};


// Delete user Detail by Id
const user_delete = (req, res) => {
    user.findByIdAndDelete(req.params.id)
        .then((deleteduser) => {
            if (!deleteduser) {
                sendResponse(res, 404, "user not found");
            } else {
                sendResponse(res, 200, "user deleted successfully");
            }
        })
        .catch((err) => {
            sendResponse(res, 400, "Failed to delete user", null, err.message);
        });
};

module.exports = {
    user_index,
    user_create_post,
    user_details,
    user_update,
    user_delete,
};
