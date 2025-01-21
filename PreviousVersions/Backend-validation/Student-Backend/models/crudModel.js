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
