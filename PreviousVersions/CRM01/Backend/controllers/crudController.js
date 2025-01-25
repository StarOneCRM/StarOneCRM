const student = require("../models/crudModel");

// Display All students
const student_index = (req, res) => {
    student.find()
        .then((students) => {
            res.json(students);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving students");
        });
};

// Create New student
const student_create_post = (req, res) => {
    let student = new student(req.body);
    student
        .save()
        .then((savedstudent) => {
            res.status(201).json(savedstudent);
        })
        .catch((err) => {
            res.status(422).send(err.message || "Failed to add student");
        });
};

// Show a particular student Detail by Id
const student_details = (req, res) => {
    student.findById(req.params.id)
        .then((student) => {
            if (!student) {
                res.status(404).send("No student found");
            } else {
                res.json(student);
            }
        })
        .catch((err) => {
            res.status(400).send("Error retrieving student");
        });
};

// Update student Detail by Id
const student_update = (req, res) => {
    student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((updatedstudent) => {
            if (!updatedstudent) {
                res.status(404).send("student not found");
            } else {
                res.json(updatedstudent);
            }
        })
        .catch((err) => {
            res.status(422).send(err.message || "Failed to update student");
        });
};

// Delete student Detail by Id
const student_delete = (req, res) => {
    student.findByIdAndDelete(req.params.id)
        .then((deletedstudent) => {
            if (!deletedstudent) {
                res.status(404).send("student not found");
            } else {
                res.status(200).json("student deleted successfully");
            }
        })
        .catch((err) => {
            res.status(400).send("Failed to delete student");
        });
};

module.exports = {
    student_index,
    student_create_post,
    student_details,
    student_update,
    student_delete,
};
