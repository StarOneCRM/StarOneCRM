// // import React, { useState, useEffect } from "react";
// // import axiosInstance from "../../utils/axios";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";

// // const ChatPage = () => {
// //   const [role, setRole] = useState("");
// //   const [taskslist, setTaskslist] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [newMessage, setNewMessage] = useState("");
// //   const [tasks, setTasks] = useState([]);
// //   const token = localStorage.getItem("token");
// //   const navigate = useNavigate();

// //   const fetchProfile = async () => {
// //     try {
// //       const response = await axiosInstance.get("/profile");
// //       setRole(response.data.data.role);
// //     } catch (error) {
// //       console.error("Error fetching profile:", error);
// //       navigate("/login");
// //     }
// //   };

// //   const fetchAssignedTasks = async () => {
// //     try {
// //       const response = await axiosInstance.get("/chat/assigned-people/", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const tasksAssigned = response.data.tasksAssigned;
// //       const userList = tasksAssigned.map((task) => {
// //         if (role === "employee") {
// //           return {
// //             id: task.customer._id,
// //             name: task.customer.name,
// //             email: task.customer.email,
// //           };
// //         } else {
// //           return {
// //             id: task.employee._id,
// //             name: task.employee.name,
// //             email: task.employee.email,
// //           };
// //         }
// //       });
// //       setTaskslist(userList);
// //       toast.success("Users fetched successfully");
// //     } catch (error) {
// //       console.error("Error fetching assigned tasks:", error);
// //       toast.error("Failed to fetch assigned tasks");
// //       navigate("/");
// //     }
// //   };

// //   const fetchMessagesAndTasks = async (userId) => {
// //     try {
// //       const response = await axiosInstance.get(`/chat/${userId}/messages`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setMessages(response.data.messages);
// //       setTasks(response.data.tasks);
// //       setSelectedUser(userId);
// //     } catch (error) {
// //       console.error("Error fetching messages:", error);
// //       toast.error("Failed to fetch messages");
// //     }
// //   };

// //   const sendMessage = async () => {
// //     if (!newMessage.trim()) return;

// //     try {
// //       const response = await axiosInstance.post(
// //         `/chat/send`,
// //         { receiverId: selectedUser, content: newMessage },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       setMessages([...messages, response.data.data]);
// //       setNewMessage("");
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //       toast.error("Failed to send message");
// //     }
// //   };

// //   useEffect(() => {
// //     const initialize = async () => {
// //       await fetchProfile();
// //       await fetchAssignedTasks();
// //     };
// //     initialize();
// //   }, [role]);

// //   return (
// //     <div className="flex h-screen">
// //       <div className="w-1/4 bg-gray-100 p-4 border-r overflow-y-auto">
// //         <h2 className="text-xl font-semibold mb-4">Users</h2>
// //         {taskslist.map((user) => (
// //           <div
// //             key={user.id}
// //             className={`p-2 rounded cursor-pointer ${
// //               selectedUser === user.id
// //                 ? "bg-blue-500 text-white"
// //                 : "hover:bg-blue-100"
// //             }`}
// //             onClick={() => fetchMessagesAndTasks(user.id)}
// //           >
// //             {user.name}
// //           </div>
// //         ))}
// //       </div>

// //       <div className="w-3/4 flex flex-col">
// //         {selectedUser ? (
// //           <>
// //             <div className="p-4 bg-gray-200 border-b">
// //               <h3 className="text-lg font-semibold mb-2">Assigned Task</h3>
// //               {tasks.length > 0 ? (
// //                 <p>{tasks[0].description}</p>
// //               ) : (
// //                 <p>No tasks assigned</p>
// //               )}
// //             </div>

// //             <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
// //               {messages.length > 0 ? (
// //                 messages.map((msg, index) => (
// //                   <div
// //                     key={index}
// //                     className={`p-2 my-2 rounded ${
// //                       msg.sender === selectedUser
// //                         ? "bg-gray-200"
// //                         : "bg-blue-500 text-white self-end"
// //                     }`}
// //                   >
// //                     {msg.content}
// //                   </div>
// //                 ))
// //               ) : (
// //                 <p>No messages yet</p>
// //               )}
// //             </div>

// //             <div className="p-4 bg-white border-t">
// //               <div className="flex items-center">
// //                 <input
// //                   type="text"
// //                   value={newMessage}
// //                   onChange={(e) => setNewMessage(e.target.value)}
// //                   placeholder="Type your message..."
// //                   className="flex-1 p-2 border rounded"
// //                 />
// //                 <button
// //                   onClick={sendMessage}
// //                   className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //                 >
// //                   Send
// //                 </button>
// //               </div>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="flex items-center justify-center flex-1">
// //             <h2 className="text-gray-500">Select a user to start chatting</h2>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatPage;






// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ChatPage = () => {
//     const [role, setRole] = useState("");
//     const [taskslist, setTaskslist] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [tasks, setTasks] = useState([]);
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();

//     const fetchProfile = async () => {
//         try {
//             const response = await axiosInstance.get("/profile");
//             setRole(response.data.data.role);
//         } catch (error) {
//             console.error("Error fetching profile:", error);
//             navigate("/login");
//         }
//     };

//     const fetchAssignedTasks = async () => {
//         try {
//             const response = await axiosInstance.get("/chat/assigned-people/", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             const tasksAssigned = response.data.tasksAssigned;
//             const userList = tasksAssigned.map((task) => {
//                 if (role === "employee") {
//                     return {
//                         id: task.customer._id,
//                         name: task.customer.name,
//                         email: task.customer.email,
//                         description: task.description,
//                     };
//                 } else {
//                     return {
//                         id: task.employee._id,
//                         name: task.employee.name,
//                         email: task.employee.email,
//                         description: task.description,
//                     };
//                 }
//             });
//             setTaskslist(userList);
//             toast.success("Users fetched successfully");
//         } catch (error) {
//             console.error("Error fetching assigned tasks:", error);
//             toast.error("Failed to fetch assigned tasks");
//             navigate("/");
//         }
//     };

//     const fetchMessagesAndTasks = async (userId) => {
//         try {
//             const response = await axiosInstance.get(`/chat/${userId}/messages`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(response.data.messages);
//             console.log(response.data.task);
//             setTasks(response.data.task);
//             setSelectedUser(userId);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             toast.error("Failed to fetch messages");
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const response = await axiosInstance.post(
//                 `/chat/send`,
//                 { receiverId: selectedUser, content: newMessage },
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//             setMessages([...messages, response.data.data]);
//             setNewMessage("");
//         } catch (error) {
//             console.error("Error sending message:", error);
//             toast.error("Failed to send message");
//         }
//     };

//     useEffect(() => {
//         const initialize = async () => {
//             await fetchProfile();
//             await fetchAssignedTasks();
//         };
//         initialize();
//     }, [role]);

//     return (
//         <div className="flex h-screen">
//             <div className="w-1/4 bg-gray-100 p-4 border-r overflow-y-auto">
//                 <h2 className="text-xl font-semibold mb-4">Users</h2>
//                 {taskslist.map((user) => (
//                     <div
//                         key={user.id}
//                         className={`p-2 rounded cursor-pointer ${
//                             selectedUser === user.id
//                                 ? "bg-blue-500 text-white"
//                                 : "hover:bg-blue-100"
//                         }`}
//                         onClick={() => fetchMessagesAndTasks(user.id)}
//                     >
//                         {user.name}
//                     </div>
//                 ))}
//             </div>

//             <div className="w-3/4 flex flex-col">
//                 {selectedUser ? (
//                     <>
//                         <div className="p-4 bg-gray-200 border-b">
//                             <h3 className="text-lg font-semibold mb-2">Assigned Task</h3>
//                             {tasks.length > 0 ? (
//                                 <p>{tasks[0].description}</p>
//                             ) : (
//                                 <p>No tasks assigned</p>
//                             )}
//                         </div>

//                         <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//                             {messages.length > 0 ? (
//                                 messages.map((msg, index) => (
//                                     <div
//                                         key={index}
//                                         className={`p-2 my-2 rounded ${
//                                             msg.sender === selectedUser
//                                                 ? "bg-gray-200"
//                                                 : "bg-blue-500 text-white self-end"
//                                         }`}
//                                     >
//                                         {msg.content}
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p>No messages yet</p>
//                             )}
//                         </div>

//                         <div className="p-4 bg-white border-t">
//                             <div className="flex items-center">
//                                 <input
//                                     type="text"
//                                     value={newMessage}
//                                     onChange={(e) => setNewMessage(e.target.value)}
//                                     placeholder="Type your message..."
//                                     className="flex-1 p-2 border rounded"
//                                 />
//                                 <button
//                                     onClick={sendMessage}
//                                     className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                                 >
//                                     Send
//                                 </button>
//                             </div>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="flex items-center justify-center flex-1">
//                         <h2 className="text-gray-500">Select a user to start chatting</h2>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ChatPage;












import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Box, Collapse, List, ListItem, Typography } from "@mui/material";

const ChatPage = () => {
    const [role, setRole] = useState("");
    const [taskslist, setTaskslist] = useState([]); // List of tasks
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [openTasks, setOpenTasks] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get("/profile");
            setRole(response.data.data.role);
        } catch (error) {
            console.error("Error fetching profile:", error);
            navigate("/login");
        }
    };

    const fetchAssignedTasks = async () => {
        try {
            const response = await axiosInstance.get("/chat/assigned-tasks/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTaskslist(response.data.tasksAssigned);
            toast.success("Tasks fetched successfully");
        } catch (error) {
            console.error("Error fetching assigned tasks:", error);
            toast.error("Failed to fetch tasks");
            navigate("/");
        }
    };

    const fetchMessagesForTask = async (taskId) => {
        try {
            const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(response.data.messages);
            setSelectedTaskId(taskId);
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Failed to fetch messages for the task");
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await axiosInstance.post(
                `/chat/send`,
                { taskId: selectedTaskId, content: newMessage },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessages([...messages, response.data.data]);
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message");
        }
    };

    useEffect(() => {
        const initialize = async () => {
            await fetchProfile();
            await fetchAssignedTasks();
        };
        initialize();
    }, []);

    useEffect(() => {
        if (selectedTaskId) {
            const interval = setInterval(() => {
                fetchMessagesForTask(selectedTaskId);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [selectedTaskId]);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Task List Sidebar */}
            <Box className="w-1/4 bg-white p-4 border-r overflow-y-auto">
                <Typography variant="h6" className="font-semibold mb-4">Assigned Tasks</Typography>
                <Button
                    onClick={() => setOpenTasks(!openTasks)}
                    variant="outlined"
                    fullWidth
                >
                    {openTasks ? "Hide Tasks" : "Show Tasks"}
                </Button>
                <Collapse in={openTasks}>
                    <List>
                        {taskslist.length > 0 ? (
                            taskslist.map((task) => (
                                <ListItem
                                    key={task.id}
                                    className={`p-2 rounded cursor-pointer ${
                                        selectedTaskId === task._id
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-blue-100"
                                    }`}
                                    onClick={() => fetchMessagesForTask(task._id)}
                                >
                                    <Typography variant="body1" className="font-semibold">{task.description}</Typography>
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body2">No tasks assigned</Typography>
                        )}
                    </List>
                </Collapse>
            </Box>

            {/* Chat Section */}
            <div className="w-3/4 flex flex-col bg-gray-50">
                {selectedTaskId ? (
                    <>
                        <Box className="p-4 bg-white border-b flex justify-between items-center">
                            <Typography variant="h6" className="font-semibold">Task Messages</Typography>
                        </Box>

                        {/* Chat Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`p-3 max-w-xs rounded-lg ${
                                                msg.sender === "user"
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-200 text-gray-800"
                                            }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Typography variant="body2" className="text-gray-500">No messages yet</Typography>
                            )}
                        </div>

                        {/* Message Input Section */}
                        <Box className="p-4 bg-white border-t flex items-center">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 p-2 border rounded-lg"
                            />
                            <Button
                                onClick={sendMessage}
                                variant="contained"
                                color="primary"
                                className="ml-4"
                            >
                                Send
                            </Button>
                        </Box>
                    </>
                ) : (
                    <div className="flex items-center justify-center flex-1">
                        <Typography variant="h5" className="text-gray-500">Select a task to view messages</Typography>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
