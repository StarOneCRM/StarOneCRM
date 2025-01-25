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

// Student Schema with Auto-Generated Student ID
const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        unique: true, // Ensure unique student ID
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

// Pre-save hook to generate studentId
studentSchema.pre('save', async function (next) {
    if (this.isNew && !this.studentId) {
        const counter = await Counter.findOneAndUpdate(
            { name: 'studentId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        this.studentId = `STU${counter.sequence_value.toString().padStart(4, '0')}`;
    }
    next();
});

module.exports = mongoose.model("Student", studentSchema, "Students");


const Student = require("../models/crudModel");

// Structure
const sendResponse = (res, status, message, data = null, error = null) => {
    res.status(status).json({ 
        message, 
        data, 
        error 
    });
};

// Display All Students
const student_index = (req, res) => {
    Student.find()
        .then((students) => {
            sendResponse(res, 200, "Students retrieved successfully", students);
        })
        .catch((err) => {
            sendResponse(res, 500, "Error retrieving students", null, err.message);
        });
};

// Create New Student
const student_create_post = (req, res) => {
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
    const student = new Student({ name, age, email, major });
    student
        .save()
        .then((savedStudent) => {
            sendResponse(res, 201, "Student created successfully", savedStudent);
        })
        .catch((err) => {
            sendResponse(res, 422, "Failed to add student", null, err.message);
        });
};

// Show a particular Student Detail by Id
const student_details = (req, res) => {
    Student.findById(req.params.id)
        .then((student) => {
            if (!student) {
                sendResponse(res, 404, "Student not found");
            } else {
                sendResponse(res, 200, "Student retrieved successfully", student);
            }
        })
        .catch((err) => {
            sendResponse(res, 400, "Error retrieving student", null, err.message);
        });
};

// Update Student Detail by Id
const student_update = (req, res) => {
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

    Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((updatedStudent) => {
            if (!updatedStudent) {
                sendResponse(res, 404, "Student not found");
            } else {
                sendResponse(res, 200, "Student updated successfully", updatedStudent);
            }
        })
        .catch((err) => {
            if (err.name === "MongoError" && err.code === 11000) {
                const emailMatch = err.message.match(/email: "(.*?)"/);
                const duplicateEmail = emailMatch ? emailMatch[1] : 'this email';
                sendResponse(res, 422, `The email ${duplicateEmail} is already associated with another student`, null, err.message);
            } else {
                sendResponse(res, 422, "Failed to update student", null, err.message);
            }
        });
};


// Delete Student Detail by Id
const student_delete = (req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then((deletedStudent) => {
            if (!deletedStudent) {
                sendResponse(res, 404, "Student not found");
            } else {
                sendResponse(res, 200, "Student deleted successfully");
            }
        })
        .catch((err) => {
            sendResponse(res, 400, "Failed to delete student", null, err.message);
        });
};

module.exports = {
    student_index,
    student_create_post,
    student_details,
    student_update,
    student_delete,
};
