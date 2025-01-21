const Student = require("../models/crudModel");

// Display All Students
const student_index = (req, res) => {
    Student.find()
        .then((students) => {
            res.json(students);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving students");
        });
};

// Create New Student
const student_create_post = (req, res) => {
    let student = new Student(req.body);
    student
        .save()
        .then((savedStudent) => {
            res.status(201).json(savedStudent);
        })
        .catch((err) => {
            res.status(422).send(err.message || "Failed to add student");
        });
};

// Show a particular Student Detail by Id
const student_details = (req, res) => {
    Student.findById(req.params.id)
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

// Update Student Detail by Id
const student_update = (req, res) => {
    Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((updatedStudent) => {
            if (!updatedStudent) {
                res.status(404).send("Student not found");
            } else {
                res.json(updatedStudent);
            }
        })
        .catch((err) => {
            res.status(422).send(err.message || "Failed to update student");
        });
};

// Delete Student Detail by Id
const student_delete = (req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then((deletedStudent) => {
            if (!deletedStudent) {
                res.status(404).send("Student not found");
            } else {
                res.status(200).json("Student deleted successfully");
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
