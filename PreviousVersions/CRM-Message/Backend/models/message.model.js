// const mongoose = require("mongoose");

// // Message Schema
// const messageSchema = new mongoose.Schema(
//     {
//         sender: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User", // Reference to the user who sent the message
//             required: true,
//         },
//         receiver: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User", // Reference to the user who received the message
//             required: true,
//         },
//         task: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Task", // Reference to the related task
//             required: false, // Task reference is optional
//         },
//         content: {
//             type: String,
//             required: [true, "Message content is required"],
//         },
//         timestamp: {
//             type: Date,
//             default: Date.now, // Automatically store the time of the message
//         },
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("Message", messageSchema);




const mongoose = require("mongoose");

// Message Schema
const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task", // Link each message to a specific task
            required: true,
        },
        content: {
            type: String,
            required: [true, "Message content is required"],
        },
        isRead: {
            type: Boolean,
            default: false, // Track if the message has been read
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Message", messageSchema);
