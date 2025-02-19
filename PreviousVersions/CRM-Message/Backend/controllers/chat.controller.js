const Message = require("../models/message.model");
const User = require("../models/user.model").User;
const Task = require("../models/task.model");

// exports.sendMessage = async (req, res) => {
//     try {
//         const { receiverId, content, taskId } = req.body;

//         // Validate sender, receiver, and content
//         if (!req.user._id || !receiverId || !content) {
//             return res.status(400).json({ error: "Invalid message data" });
//         }

//         // Check if the sender and receiver exist
//         const sender = await User.findById(req.user._id);
//         const receiver = await User.findById(receiverId);

//         if (!sender || !receiver) {
//             return res.status(404).json({ error: "Sender or Receiver not found" });
//         }

//         // Create and save the message
//         const message = new Message({
//             sender: req.user._id,
//             receiver: receiverId,
//             task: taskId || null, // Associate with task if provided
//             content,
//         });

//         await message.save();

//         res.status(201).json({ success: true, message: "Message sent", data: message });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getMessages = async (req, res) => {
//     try {
//         const { userId } = req.params; // ID of the person the current user is chatting with

//         // Validate if the user exists
//         const chattingWith = await User.findById(userId);
//         if (!chattingWith) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Fetch messages involving the current user and the other user
//         const messages = await Message.find({
//             $or: [
//                 { sender: req.user._id, receiver: userId },
//                 { sender: userId, receiver: req.user._id },
//             ],
//         })
//             .sort({ timestamp: 1 }) // Sort by ascending order of timestamp
//             .populate("sender", "name email role") // Populate sender details
//             .populate("receiver", "name email role") // Populate receiver details
//             .populate("task", "title description") // Populate task details
//             .exec();

//         // Extract unique tasks from messages
//         const tasks = messages
//             .filter(message => message.task)
//             .map(message => message.task)
//             .filter((task, index, self) => self.findIndex(t => t._id.toString() === task._id.toString()) === index);

//         res.status(200).json({ success: true, messages, tasks });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getAssignedPeople = async (req, res) => {
//     try {
//         // Fetch the logged-in user
//         const user = await User.findById(req.user.id).populate("tasksAssigned", "_id").exec();

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Fetch full task details for each assigned task ID
//         const tasksAssignedFullData = await Task.find({
//             _id: { $in: user.tasksAssigned.map(task => task._id) },
//         })
//             .populate("customer", "name email") // Populate customer details
//             .populate("employee", "name email") // Populate employee details
//             .exec();

//         res.status(200).json({ success: true, tasksAssigned: tasksAssignedFullData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// };

exports.getAssignedPeople = async (req, res) => {
    try {
        // Fetch the logged-in user
        const user = await User.findById(req.user.id)
            .populate({
                path: "tasksAssigned",
                populate: {
                    path: "customer employee",
                    select: "name email role"
                }
            }) // Get details of assigned tasks along with customer and employee details
            .exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ success: true, tasksAssigned: user.tasksAssigned });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unassignCustomerFromEmployee = async (req, res) => {
    try {
        const { customerId, employeeId } = req.body;

        if (!customerId || !employeeId) {
            return res.status(400).json({ error: "Customer ID and Employee ID are required" });
        }

        // Fetch the customer and employee from the database
        const customer = await User.findById(customerId);
        const employee = await User.findById(employeeId);

        if (!customer || customer.role !== "customer") {
            return res.status(404).json({ error: "Customer not found or invalid" });
        }

        if (!employee || employee.role !== "employee") {
            return res.status(404).json({ error: "Employee not found or invalid" });
        }

        // Remove the employee from the customer's assignedTo array
        customer.assignedTo = customer.assignedTo.filter(
            (id) => id.toString() !== employeeId
        );

        // Remove the customer from the employee's assignedPeople array
        employee.assignedPeople = employee.assignedPeople.filter(
            (id) => id.toString() !== customerId
        );

        // Save both users
        await customer.save();
        await employee.save();

        res.status(200).json({
            success: true,
            message: `Customer ${customer.name} unassigned from Employee ${employee.name}`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.assignCustomerToEmployee = async (req, res) => {
    try {
        const { customerId, employeeId, taskId } = req.body;

        // Validate customer, employee, and task IDs
        if (!customerId || !employeeId || !taskId) {
            return res.status(400).json({ error: "Customer ID, Employee ID, and Task ID are required" });
        }

        // Fetch the customer, employee, and task from the database
        const customer = await User.findById(customerId);
        const employee = await User.findById(employeeId);
        const task = await Task.findById(taskId);

        if (!customer || customer.role !== "customer") {
            return res.status(404).json({ error: "Customer not found or invalid" });
        }

        if (!employee || employee.role !== "employee") {
            return res.status(404).json({ error: "Employee not found or invalid" });
        }

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Initialize arrays if they are undefined
        if (!customer.assignedTo) {
            customer.assignedTo = [];
        }
        if (!employee.assignedPeople) {
            employee.assignedPeople = [];
        }
        if (!customer.assignedPeople) {
            customer.assignedPeople = [];
        }
        if (!employee.assignedPeople) {
            employee.assignedPeople = [];
        }
        if (!customer.tasks) {
            customer.tasks = [];
        }
        if (!employee.tasks) {
            employee.tasks = [];
        }

        // Check if the customer is already assigned to this employee
        if (customer.assignedTo.includes(employeeId)) {
            return res.status(400).json({ error: "Customer is already assigned to this employee" });
        }

        // Add the employee to the customer's assignedTo array
        customer.assignedTo.push(employeeId);

        // Add the customer to the employee's assignedPeople array
        employee.assignedPeople.push(customerId);
        customer.assignedPeople.push(employeeId);
        employee.tasksAssigned.push(taskId);
        // customer.tasksAssigned.push(taskId);

        // Add the task to the employee's and customer's task lists
        employee.tasks.push(taskId);
        customer.tasks.push(taskId);

        // Assign the customer and employee to the task
        task.customer = customerId;
        task.employee = employeeId;
        task.isEmployeeAssigned = true; // Set the boolean variable

        // Save all changes
        await customer.save();
        await employee.save();
        await task.save();

        res.status(200).json({
            success: true,
            message: `Customer ${customer.name} assigned to Employee ${employee.name} and Task ${task.title}`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("customer", "name email")
            .populate("employee", "name email")
            .exec();

        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { content, taskId } = req.body;

        // Validate input
        if (!content || !taskId) {
            return res.status(400).json({ error: "Message content and task ID are required" });
        }

        const sender = await User.findById(req.user.id);
        const task = await Task.findById(taskId).populate("customer employee");

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Ensure the sender is part of the task (either customer or employee)
        if (![task.customer._id.toString(), task.employee._id.toString()].includes(req.user.id.toString())) {
            return res.status(403).json({ error: "You are not authorized to send messages for this task" });
        }

        // Create and save the message
        const message = await Message.create({
            sender: req.user.id,
            task: taskId,
            content,
        });

        // Append the message to the task
        task.messages.push(message._id);
        await task.save();

        res.status(201).json({ success: true, message: "Message sent", data: message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getMessagesByTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId)
            .populate("customer employee", "name email role")
            .populate({
                path: "messages",
                populate: { path: "sender", select: "name email" }, // Populate sender details in messages
            });
        console.log(task);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        // console.log(task.customer.toString(), task.employee?.toString(), req.user.id.toString());
        // Ensure the user is part of the task
        console.log(task)
        if (![task.customer.id.toString(), task.employee.id.toString()].includes(req.user.id.toString())) {
            return res.status(403).json({ error: "You are not authorized to view messages for this task" });
        }

        res.status(200).json({ success: true, messages: task.messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getAssignedTasks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate({
                path: "tasksAssigned",
                populate: {
                    path: "customer employee",
                    select: "name email role"
                }
            })
            .exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ success: true, tasksAssigned: user.tasksAssigned });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};