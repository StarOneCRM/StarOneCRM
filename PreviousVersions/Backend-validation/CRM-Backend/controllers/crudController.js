const student = require("../models/crudModel");

// Structure
const sendResponse = (res, status, message, data = null, error = null) => {
    res.status(status).json({ 
        message, 
        data, 
        error 
    });
};

// Display All students
const student_index = (req, res) => {
    student.find()
        .then((students) => {
            sendResponse(res, 200, "students retrieved successfully", students);
        })
        .catch((err) => {
            sendResponse(res, 500, "Error retrieving students", null, err.message);
        });
};

// Create New student
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
    const student = new student({ name, age, email, major });
    student
        .save()
        .then((savedstudent) => {
            sendResponse(res, 201, "student created successfully", savedstudent);
        })
        .catch((err) => {
            sendResponse(res, 422, "Failed to add student", null, err.message);
        });
};

// Show a particular student Detail by Id
const student_details = (req, res) => {
    student.findById(req.params.id)
        .then((student) => {
            if (!student) {
                sendResponse(res, 404, "student not found");
            } else {
                sendResponse(res, 200, "student retrieved successfully", student);
            }
        })
        .catch((err) => {
            sendResponse(res, 400, "Error retrieving student", null, err.message);
        });
};

// Update student Detail by Id
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

    student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((updatedstudent) => {
            if (!updatedstudent) {
                sendResponse(res, 404, "student not found");
            } else {
                sendResponse(res, 200, "student updated successfully", updatedstudent);
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


// Delete student Detail by Id
const student_delete = (req, res) => {
    student.findByIdAndDelete(req.params.id)
        .then((deletedstudent) => {
            if (!deletedstudent) {
                sendResponse(res, 404, "student not found");
            } else {
                sendResponse(res, 200, "student deleted successfully");
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
