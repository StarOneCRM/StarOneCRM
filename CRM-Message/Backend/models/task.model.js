// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema(
//     {
//         title: { type: String, required: true },
//         description: { type: String, required: true },
//         customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//         employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         isEmployeeAssigned: { type: Boolean, default: false },
//         createdAt: { type: Date, default: Date.now },
//         updatedAt: { type: Date, default: Date.now },
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("Task", taskSchema);


const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isEmployeeAssigned: { type: Boolean, default: false },
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }], // Link messages to the task
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
