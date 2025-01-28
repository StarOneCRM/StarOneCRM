const express = require("express");
const router = express.Router();
const { getAssignedPeople, assignCustomerToEmployee, unassignCustomerFromEmployee, sendMessage, getMessagesByTask, getAssignedTasks } = require("../controllers/chat.controller");
const { verifyJWT, isAdmin } = require("../utils/middleware");
const { getAllTasks } = require("../controllers/chat.controller");

router.post("/send", verifyJWT, sendMessage);
// router.get("/:userId/messages", verifyJWT, getMessages);
router.get("/assigned-people", verifyJWT, getAssignedPeople);
router.get("/assigned-tasks", verifyJWT, getAssignedTasks);
router.post("/assign", verifyJWT, isAdmin, assignCustomerToEmployee);
router.post("/unassign", verifyJWT, isAdmin, unassignCustomerFromEmployee);
router.get("/tasks", verifyJWT, getAllTasks);

router.post("/messages", verifyJWT, sendMessage); // Send a message
router.get("/task/:taskId/messages", verifyJWT, getMessagesByTask); // Get messag

module.exports = router;
