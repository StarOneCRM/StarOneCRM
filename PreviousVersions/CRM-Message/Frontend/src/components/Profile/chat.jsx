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












// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Box, Collapse, List, ListItem, Typography } from "@mui/material";

// const ChatPage = () => {
//     const [role, setRole] = useState("");
//     const [taskslist, setTaskslist] = useState([]); // List of tasks
//     const [selectedTaskId, setSelectedTaskId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [openTasks, setOpenTasks] = useState(true);
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
//             const response = await axiosInstance.get("/chat/assigned-tasks/", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTaskslist(response.data.tasksAssigned);
//             toast.success("Tasks fetched successfully");
//         } catch (error) {
//             console.error("Error fetching assigned tasks:", error);
//             toast.error("Failed to fetch tasks");
//             navigate("/");
//         }
//     };

//     const fetchMessagesForTask = async (taskId) => {
//         try {
//             const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(response.data.messages);
//             setSelectedTaskId(taskId);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             toast.error("Failed to fetch messages for the task");
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const response = await axiosInstance.post(
//                 `/chat/send`,
//                 { taskId: selectedTaskId, content: newMessage },
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
//     }, []);

//     useEffect(() => {
//         if (selectedTaskId) {
//             const interval = setInterval(() => {
//                 fetchMessagesForTask(selectedTaskId);
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [selectedTaskId]);

//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Task List Sidebar */}
//             <Box className="w-1/4 bg-white p-4 border-r overflow-y-auto">
//                 <Typography variant="h6" className="font-semibold mb-4">Assigned Tasks</Typography>
//                 <Button
//                     onClick={() => setOpenTasks(!openTasks)}
//                     variant="outlined"
//                     fullWidth
//                 >
//                     {openTasks ? "Hide Tasks" : "Show Tasks"}
//                 </Button>
//                 <Collapse in={openTasks}>
//                     <List>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem
//                                     key={task.id}
//                                     className={`p-2 rounded cursor-pointer ${
//                                         selectedTaskId === task._id
//                                             ? "bg-blue-500 text-white"
//                                             : "hover:bg-blue-100"
//                                     }`}
//                                     onClick={() => fetchMessagesForTask(task._id)}
//                                 >
//                                     <Typography variant="body1" className="font-semibold">{task.description}</Typography>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Collapse>
//             </Box>

//             {/* Chat Section */}
//             <div className="w-3/4 flex flex-col bg-gray-50">
//                 {selectedTaskId ? (
//                     <>
//                         <Box className="p-4 bg-white border-b flex justify-between items-center">
//                             <Typography variant="h6" className="font-semibold">Task Messages</Typography>
//                         </Box>

//                         {/* Chat Messages */}
//                         <div className="flex-1 p-4 overflow-y-auto space-y-4">
//                             {messages.length > 0 ? (
//                                 messages.map((msg, index) => (
//                                     <div
//                                         key={index}
//                                         className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//                                     >
//                                         <div
//                                             className={`p-3 max-w-xs rounded-lg ${
//                                                 msg.sender === "user"
//                                                     ? "bg-blue-500 text-white"
//                                                     : "bg-gray-200 text-gray-800"
//                                             }`}
//                                         >
//                                             {msg.content}
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <Typography variant="body2" className="text-gray-500">No messages yet</Typography>
//                             )}
//                         </div>

//                         {/* Message Input Section */}
//                         <Box className="p-4 bg-white border-t flex items-center">
//                             <input
//                                 type="text"
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 placeholder="Type a message..."
//                                 className="flex-1 p-2 border rounded-lg"
//                             />
//                             <Button
//                                 onClick={sendMessage}
//                                 variant="contained"
//                                 color="primary"
//                                 className="ml-4"
//                             >
//                                 Send
//                             </Button>
//                         </Box>
//                     </>
//                 ) : (
//                     <div className="flex items-center justify-center flex-1">
//                         <Typography variant="h5" className="text-gray-500">Select a task to view messages</Typography>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ChatPage;















// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Box, Collapse, List, ListItem, Typography, TextField } from "@mui/material";

// const ChatPage = () => {
//     const [role, setRole] = useState("");
//     const [taskslist, setTaskslist] = useState([]); // List of tasks
//     const [selectedTaskId, setSelectedTaskId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [openTasks, setOpenTasks] = useState(true);
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
//             const response = await axiosInstance.get("/chat/assigned-tasks/", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTaskslist(response.data.tasksAssigned);
//             toast.success("Tasks fetched successfully");
//         } catch (error) {
//             console.error("Error fetching assigned tasks:", error);
//             toast.error("Failed to fetch tasks");
//             navigate("/");
//         }
//     };

//     const fetchMessagesForTask = async (taskId) => {
//         try {
//             const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(response.data.messages);
//             setSelectedTaskId(taskId);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             toast.error("Failed to fetch messages for the task");
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const response = await axiosInstance.post(
//                 `/chat/send`,
//                 { taskId: selectedTaskId, content: newMessage },
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
//     }, []);

//     useEffect(() => {
//         if (selectedTaskId) {
//             const interval = setInterval(() => {
//                 fetchMessagesForTask(selectedTaskId);
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [selectedTaskId]);

//     return (
//         <Box display="flex" height="100vh" bgcolor="gray.100">
//             {/* Task List Sidebar */}
//             <Box width="25%" bgcolor="white" p={4} borderRight="1px solid" overflowY="auto">
//                 <Typography variant="h6" fontWeight="bold" mb={2}>Assigned Tasks</Typography>
//                 <Button
//                     onClick={() => setOpenTasks(!openTasks)}
//                     variant="outlined"
//                     fullWidth
//                     sx={{ mb: 2 }}
//                 >
//                     {openTasks ? "Hide Tasks" : "Show Tasks"}
//                 </Button>
//                 <Collapse in={openTasks}>
//                     <List>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem
//                                     key={task.id}
//                                     sx={{
//                                         padding: 1,
//                                         borderRadius: 1,
//                                         cursor: "pointer",
//                                         bgcolor: selectedTaskId === task._id ? "primary.main" : "transparent",
//                                         color: selectedTaskId === task._id ? "white" : "text.primary",
//                                         "&:hover": {
//                                             bgcolor: "primary.light",
//                                         },
//                                     }}
//                                     onClick={() => fetchMessagesForTask(task._id)}
//                                 >
//                                     <Typography variant="body1" fontWeight="bold">{task.description}</Typography>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Collapse>
//             </Box>

//             {/* Chat Section */}
//             <Box width="75%" display="flex" flexDirection="column" bgcolor="gray.50">
//                 {selectedTaskId ? (
//                     <>
//                         <Box p={4} bgcolor="white" borderBottom="1px solid" display="flex" justifyContent="space-between" alignItems="center">
//                             <Typography variant="h6" fontWeight="bold">Task Messages</Typography>
//                         </Box>

//                         {/* Chat Messages */}
//                         <Box flex="1" p={4} overflowY="auto" display="flex" flexDirection="column" gap={2}>
//                             {messages.length > 0 ? (
//                                 messages.map((msg, index) => (
//                                     <Box
//                                         key={index}
//                                         display="flex"
//                                         justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
//                                     >
//                                         <Box
//                                             p={2}
//                                             maxWidth="300px"
//                                             borderRadius="8px"
//                                             bgcolor={msg.sender === "user" ? "primary.main" : "gray.200"}
//                                             color={msg.sender === "user" ? "white" : "text.primary"}
//                                         >
//                                             {msg.content}
//                                         </Box>
//                                     </Box>
//                                 ))
//                             ) : (
//                                 <Typography variant="body2" color="text.secondary">No messages yet</Typography>
//                             )}
//                         </Box>

//                         {/* Message Input Section */}
//                         <Box p={2} bgcolor="white" borderTop="1px solid" display="flex" alignItems="center">
//                             <TextField
//                                 fullWidth
//                                 variant="outlined"
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 placeholder="Type a message..."
//                                 sx={{ marginRight: 2 }}
//                             />
//                             <Button
//                                 onClick={sendMessage}
//                                 variant="contained"
//                                 color="primary"
//                             >
//                                 Send
//                             </Button>
//                         </Box>
//                     </>
//                 ) : (
//                     <Box display="flex" justifyContent="center" alignItems="center" flex="1">
//                         <Typography variant="h5" color="text.secondary">Select a task to view messages</Typography>
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default ChatPage;


































// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Box, Collapse, List, ListItem, Typography, TextField } from "@mui/material";

// const ChatPage = () => {
//     const [role, setRole] = useState("");
//     const [taskslist, setTaskslist] = useState([]); // List of tasks
//     const [selectedTaskId, setSelectedTaskId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [openTasks, setOpenTasks] = useState(true);
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
//             const response = await axiosInstance.get("/chat/assigned-tasks/", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTaskslist(response.data.tasksAssigned);
//             toast.success("Tasks fetched successfully");
//         } catch (error) {
//             console.error("Error fetching assigned tasks:", error);
//             toast.error("Failed to fetch tasks");
//             navigate("/"); 
//         }
//     };

//     const fetchMessagesForTask = async (taskId) => {
//         try {
//             const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(response.data.messages);
//             setSelectedTaskId(taskId);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             toast.error("Failed to fetch messages for the task");
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const response = await axiosInstance.post(
//                 `/chat/send`,
//                 { taskId: selectedTaskId, content: newMessage },
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

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             sendMessage();
//         }
//     };

//     useEffect(() => {
//         const initialize = async () => {
//             await fetchProfile();
//             await fetchAssignedTasks();
//         };
//         initialize();
//     }, []);

//     useEffect(() => {
//         if (selectedTaskId) {
//             const interval = setInterval(() => {
//                 fetchMessagesForTask(selectedTaskId);
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [selectedTaskId]);

//     return (
//         <Box display="flex" flexDirection="row" height="100vh" bgcolor="#f4f6f8">
//             {/* Task List Sidebar */}
//             <Box
//                 sx={{
//                     width: "25%",
//                     bgcolor: "white",
//                     padding: 2,
//                     borderRight: 1,
//                     borderColor: "divider",
//                     overflowY: "auto",
//                 }}
//             >
//                 <Typography variant="h6" fontWeight="bold" marginBottom={2}>
//                     Assigned Tasks
//                 </Typography>
//                 <Button
//                     onClick={() => setOpenTasks(!openTasks)}
//                     variant="outlined"
//                     fullWidth
//                     sx={{ marginBottom: 2 }}
//                 >
//                     {openTasks ? "Hide Tasks" : "Show Tasks"}
//                 </Button>
//                 <Collapse in={openTasks}>
//                     <List>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem
//                                     key={task.id}
//                                     sx={{
//                                         padding: 1.5,
//                                         borderRadius: 1,
//                                         cursor: "pointer",
//                                         backgroundColor:
//                                             selectedTaskId === task._id
//                                                 ? "#1976d2"
//                                                 : "transparent",
//                                         color:
//                                             selectedTaskId === task._id
//                                                 ? "white"
//                                                 : "inherit",
//                                         "&:hover": {
//                                             backgroundColor: "#e3f2fd",
//                                         },
//                                     }}
//                                     onClick={() => fetchMessagesForTask(task._id)}
//                                 >
//                                     <Typography variant="body1" fontWeight="bold">
//                                         {task.description}
//                                     </Typography>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Collapse>
//             </Box>

//             {/* Chat Section */}
//             <Box
//                 sx={{
//                     width: "75%",
//                     display: "flex",
//                     flexDirection: "column",
//                     bgcolor: "#f5f5f5",
//                     padding: 2,
//                 }}
//             >
//                 {selectedTaskId ? (
//                     <>
//                         {/* Task Header */}
//                         <Box
//                             sx={{
//                                 padding: 2,
//                                 bgcolor: "white",
//                                 borderBottom: 1,
//                                 borderColor: "divider",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <Typography variant="h6" fontWeight="bold">
//                                 Task Messages
//                             </Typography>
//                         </Box>

//                         {/* Messages Section */}
//                         <Box
//                             sx={{
//                                 flexGrow: 1,
//                                 overflowY: "auto",
//                                 padding: 2,
//                                 bgcolor: "#ffffff",
//                                 borderRadius: 1,
//                                 marginBottom: 2,
//                                 maxHeight: "calc(100vh - 150px)",
//                             }}
//                         >
//                             {messages.length > 0 ? (
//                                 messages.map((msg, index) => (
//                                     <Box
//                                         key={index}
//                                         sx={{
//                                             display: "flex",
//                                             justifyContent:
//                                                 msg.sender === "user"
//                                                     ? "flex-end"
//                                                     : "flex-start",
//                                             marginBottom: 2,
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 padding: 2,
//                                                 borderRadius: 2,
//                                                 maxWidth: "60%",
//                                                 bgcolor:
//                                                     msg.sender === "user"
//                                                         ? "#1976d2"
//                                                         : "#e3f2fd",
//                                                 color:
//                                                     msg.sender === "user"
//                                                         ? "white"
//                                                         : "black",
//                                             }}
//                                         >
//                                             {msg.content}
//                                         </Box>
//                                     </Box>
//                                 ))
//                             ) : (
//                                 <Typography variant="body2" color="textSecondary">
//                                     No messages yet
//                                 </Typography>
//                             )}
//                         </Box>

//                         {/* Input Section */}
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 bgcolor: "white",
//                                 padding: 1.5,
//                                 borderTop: 1,
//                                 borderColor: "divider",
//                             }}
//                         >
//                             <TextField
//                                 fullWidth
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 onKeyDown={handleKeyPress}
//                                 placeholder="Type a message..."
//                                 variant="outlined"
//                                 size="small"
//                                 sx={{
//                                     marginRight: 1,
//                                     borderRadius: 2,
//                                     "& .MuiOutlinedInput-root": {
//                                         borderRadius: 2,
//                                     },
//                                 }}
//                             />
//                             <Button
//                                 onClick={sendMessage}
//                                 variant="contained"
//                                 color="primary"
//                                 sx={{
//                                     padding: "6px 16px",
//                                     borderRadius: 2,
//                                 }}
//                             >
//                                 Send
//                             </Button>
//                         </Box>
//                     </>
//                 ) : (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "100%",
//                         }}
//                     >
//                         <Typography variant="h5" color="textSecondary">
//                             Select a task to view messages
//                         </Typography>
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default ChatPage;
















// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Box, Collapse, List, ListItem, Typography, TextField } from "@mui/material";

// const ChatPage = () => {
//     const [role, setRole] = useState("");
//     const [taskslist, setTaskslist] = useState([]); // List of tasks
//     const [selectedTaskId, setSelectedTaskId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [openTasks, setOpenTasks] = useState(true);
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
//             const response = await axiosInstance.get("/chat/assigned-tasks/", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTaskslist(response.data.tasksAssigned);
//             toast.success("Tasks fetched successfully");
//         } catch (error) {
//             console.error("Error fetching assigned tasks:", error);
//             toast.error("Failed to fetch tasks");
//             navigate("/"); 
//         }
//     };

//     const fetchMessagesForTask = async (taskId) => {
//         try {
//             const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(response.data.messages);
//             setSelectedTaskId(taskId);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             toast.error("Failed to fetch messages for the task");
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const response = await axiosInstance.post(
//                 `/chat/send`,
//                 { taskId: selectedTaskId, content: newMessage },
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

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             sendMessage();
//         }
//     };

//     useEffect(() => {
//         const initialize = async () => {
//             await fetchProfile();
//             await fetchAssignedTasks();
//         };
//         initialize();
//     }, []);

//     useEffect(() => {
//         if (selectedTaskId) {
//             const interval = setInterval(() => {
//                 fetchMessagesForTask(selectedTaskId);
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [selectedTaskId]);

//     return (
//         <Box display="flex" flexDirection="row" height="100vh" bgcolor="#f4f6f8">
//             {/* Task List Sidebar */}
//             <Box
//                 sx={{
//                     width: "25%",
//                     bgcolor: "white",
//                     padding: 2,
//                     borderRight: 1,
//                     borderColor: "divider",
//                     overflowY: "auto",
//                 }}
//             >
//                 <Typography variant="h6" fontWeight="bold" marginBottom={2}>
//                     Assigned Tasks
//                 </Typography>
//                 <Button
//                     onClick={() => setOpenTasks(!openTasks)}
//                     variant="outlined"
//                     fullWidth
//                     sx={{ marginBottom: 2 }}
//                 >
//                     {openTasks ? "Hide Tasks" : "Show Tasks"}
//                 </Button>
//                 <Collapse in={openTasks}>
//                     <List>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem
//                                     key={task.id}
//                                     sx={{
//                                         padding: 1.5,
//                                         borderRadius: 1,
//                                         cursor: "pointer",
//                                         backgroundColor:
//                                             selectedTaskId === task._id
//                                                 ? "#1976d2"
//                                                 : "transparent",
//                                         color:
//                                             selectedTaskId === task._id
//                                                 ? "white"
//                                                 : "inherit",
//                                         "&:hover": {
//                                             backgroundColor: "#e3f2fd",
//                                         },
//                                     }}
//                                     onClick={() => fetchMessagesForTask(task._id)}
//                                 >
//                                     <Typography variant="body1" fontWeight="bold">
//                                         {task.description}
//                                     </Typography>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Collapse>
//             </Box>

//             {/* Chat Section */}
//             <Box
//                 sx={{
//                     width: "75%",
//                     display: "flex",
//                     flexDirection: "column",
//                     bgcolor: "#f5f5f5",
//                     padding: 2,
//                 }}
//             >
//                 {selectedTaskId ? (
//                     <>
//                         {/* Task Header */}
//                         <Box
//                             sx={{
//                                 padding: 2,
//                                 bgcolor: "white",
//                                 borderBottom: 1,
//                                 borderColor: "divider",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <Typography variant="h6" fontWeight="bold">
//                                 Task Messages
//                             </Typography>
//                         </Box>

//                         {/* Messages Section */}
//                         <Box
//     sx={{
//         flexGrow: 1,
//         overflowY: "auto",
//         padding: 2,
//         bgcolor: "#ffffff",
//         borderRadius: 1,
//         marginBottom: 2,
//         maxHeight: "calc(100vh - 150px)",
//     }}
// >
//     {messages.length > 0 ? (
//         messages
//             .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Sort messages by creation date
//             .map((msg, index) => (
//                 <Box
//                     key={index}
//                     sx={{
//                         display: "flex",
//                         justifyContent:
//                             msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                 ? "flex-end"
//                                 : "flex-start",
//                         marginBottom: 2,
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             padding: 2,
//                             borderRadius: 2,
//                             maxWidth: "60%",
//                             bgcolor:
//                                 msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                     ? "#1976d2"
//                                     : "#e3f2fd",
//                             color:
//                                 msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                     ? "white"
//                                     : "black",
//                         }}
//                     >
//                         {msg.content}
//                     </Box>
//                 </Box>
//             ))
//     ) : (
//         <Typography variant="body2" color="textSecondary">
//             No messages yet
//         </Typography>
//     )}
// </Box>


//                         {/* Input Section */}
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 bgcolor: "white",
//                                 padding: 1.5,
//                                 borderTop: 1,
//                                 borderColor: "divider",
//                             }}
//                         >
//                             <TextField
//                                 fullWidth
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 onKeyDown={handleKeyPress}
//                                 placeholder="Type a message..."
//                                 variant="outlined"
//                                 size="small"
//                                 sx={{
//                                     marginRight: 1,
//                                     borderRadius: 2,
//                                     "& .MuiOutlinedInput-root": {
//                                         borderRadius: 2,
//                                     },
//                                 }}
//                             />
//                             <Button
//                                 onClick={sendMessage}
//                                 variant="contained"
//                                 color="primary"
//                                 sx={{
//                                     padding: "6px 16px",
//                                     borderRadius: 2,
//                                 }}
//                             >
//                                 Send
//                             </Button>
//                         </Box>
//                     </>
//                 ) : (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "100%",
//                         }}
//                     >
//                         <Typography variant="h5" color="textSecondary">
//                             Select a task to view messages
//                         </Typography>
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default ChatPage;



















// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Box, Collapse, List, ListItem, Typography, TextField } from "@mui/material";

// const ChatPage = () => {
//     const [role, setRole] = useState("");
//     const [taskslist, setTaskslist] = useState([]); // List of tasks
//     const [selectedTaskId, setSelectedTaskId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [openTasks, setOpenTasks] = useState(true);
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();

//     const messagesEndRef = useRef(null); // Reference to the bottom of the messages container

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
//             const response = await axiosInstance.get("/chat/assigned-tasks/", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTaskslist(response.data.tasksAssigned);
//             toast.success("Tasks fetched successfully");
//         } catch (error) {
//             console.error("Error fetching assigned tasks:", error);
//             toast.error("Failed to fetch tasks");
//             navigate("/"); 
//         }
//     };

//     const fetchMessagesForTask = async (taskId) => {
//         try {
//             const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(response.data.messages);
//             setSelectedTaskId(taskId);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             toast.error("Failed to fetch messages for the task");
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const response = await axiosInstance.post(
//                 `/chat/send`,
//                 { taskId: selectedTaskId, content: newMessage },
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

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             sendMessage();
//         }
//     };

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         const initialize = async () => {
//             await fetchProfile();
//             await fetchAssignedTasks();
//         };
//         initialize();
//     }, []);

//     useEffect(() => {
//         if (selectedTaskId) {
//             const interval = setInterval(() => {
//                 fetchMessagesForTask(selectedTaskId);
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [selectedTaskId]);

//     useEffect(() => {
//         scrollToBottom(); // Scroll to the bottom when messages change
//     }, [messages]); // This will trigger when new messages are added

//     return (
//         <Box display="flex" flexDirection="row" height="100vh" bgcolor="#f4f6f8">
//             {/* Task List Sidebar */}
//             <Box
//                 sx={{
//                     width: "25%",
//                     bgcolor: "white",
//                     padding: 2,
//                     borderRight: 1,
//                     borderColor: "divider",
//                     overflowY: "auto",
//                 }}
//             >
//                 <Typography variant="h6" fontWeight="bold" marginBottom={2}>
//                     Assigned Tasks
//                 </Typography>
//                 <Button
//                     onClick={() => setOpenTasks(!openTasks)}
//                     variant="outlined"
//                     fullWidth
//                     sx={{ marginBottom: 2 }}
//                 >
//                     {openTasks ? "Hide Tasks" : "Show Tasks"}
//                 </Button>
//                 <Collapse in={openTasks}>
//                     <List>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem
//                                     key={task.id}
//                                     sx={{
//                                         padding: 1.5,
//                                         borderRadius: 1,
//                                         cursor: "pointer",
//                                         backgroundColor:
//                                             selectedTaskId === task._id
//                                                 ? "#1976d2"
//                                                 : "transparent",
//                                         color:
//                                             selectedTaskId === task._id
//                                                 ? "white"
//                                                 : "inherit",
//                                         "&:hover": {
//                                             backgroundColor: "#e3f2fd",
//                                         },
//                                     }}
//                                     onClick={() => fetchMessagesForTask(task._id)}
//                                 >
//                                     <Typography variant="body1" fontWeight="bold">
//                                         {task.description}
//                                     </Typography>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Collapse>
//             </Box>

//             {/* Chat Section */}
//             <Box
//                 sx={{
//                     width: "75%",
//                     display: "flex",
//                     flexDirection: "column",
//                     bgcolor: "#f5f5f5",
//                     padding: 2,
//                 }}
//             >
//                 {selectedTaskId ? (
//                     <>
//                         {/* Task Header */}
//                         <Box
//                             sx={{
//                                 padding: 2,
//                                 bgcolor: "white",
//                                 borderBottom: 1,
//                                 borderColor: "divider",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <Typography variant="h6" fontWeight="bold">
//                                 Task Messages
//                             </Typography>
//                         </Box>

//                         {/* Messages Section */}
//                         <Box
//                             sx={{
//                                 flexGrow: 1,
//                                 overflowY: "auto",
//                                 padding: 2,
//                                 bgcolor: "#ffffff",
//                                 borderRadius: 1,
//                                 marginBottom: 2,
//                                 maxHeight: "calc(100vh - 150px)",
//                             }}
//                         >
//                             {messages.length > 0 ? (
//                                 messages
//                                     .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Sort messages by creation date
//                                     .map((msg, index) => (
//                                         <Box
//                                             key={index}
//                                             sx={{
//                                                 display: "flex",
//                                                 justifyContent:
//                                                     msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                         ? "flex-end"
//                                                         : "flex-start",
//                                                 marginBottom: 2,
//                                             }}
//                                         >
//                                             <Box
//                                                 sx={{
//                                                     padding: 2,
//                                                     borderRadius: 2,
//                                                     maxWidth: "60%",
//                                                     bgcolor:
//                                                         msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                             ? "#1976d2"
//                                                             : "#e3f2fd",
//                                                     color:
//                                                         msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                             ? "white"
//                                                             : "black",
//                                                 }}
//                                             >
//                                                 {msg.content}
//                                             </Box>
//                                         </Box>
//                                     ))
//                             ) : (
//                                 <Typography variant="body2" color="textSecondary">
//                                     No messages yet
//                                 </Typography>
//                             )}
//                             {/* Scroll reference */}
//                             <div ref={messagesEndRef} />
//                         </Box>

//                         {/* Input Section */}
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 bgcolor: "white",
//                                 padding: 1.5,
//                                 borderTop: 1,
//                                 borderColor: "divider",
//                             }}
//                         >
//                             <TextField
//                                 fullWidth
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 onKeyDown={handleKeyPress}
//                                 placeholder="Type a message..."
//                                 variant="outlined"
//                                 size="small"
//                                 sx={{
//                                     marginRight: 1,
//                                     borderRadius: 2,
//                                     "& .MuiOutlinedInput-root": {
//                                         borderRadius: 2,
//                                     },
//                                 }}
//                             />
//                             <Button
//                                 onClick={sendMessage}
//                                 variant="contained"
//                                 color="primary"
//                                 sx={{
//                                     padding: "6px 16px",
//                                     borderRadius: 2,
//                                 }}
//                             >
//                                 Send
//                             </Button>
//                         </Box>
//                     </>
//                 ) : (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "100%",
//                         }}
//                     >
//                         <Typography variant="h5" color="textSecondary">
//                             Select a task to view messages
//                         </Typography>
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default ChatPage;


























// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Box, Collapse, List, ListItem, Typography, TextField } from "@mui/material";

// const ChatPage = () => {
//     const [role, setRole] = useState("");
//     const [taskslist, setTaskslist] = useState([]); // List of tasks
//     const [selectedTaskId, setSelectedTaskId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [openTasks, setOpenTasks] = useState(true);
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();
//     const messageEndRef = useRef(null); // Ref to scroll to the bottom of the messages container

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
//             const response = await axiosInstance.get("/chat/assigned-tasks/", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTaskslist(response.data.tasksAssigned);
//             toast.success("Tasks fetched successfully");
//         } catch (error) {
//             console.error("Error fetching assigned tasks:", error);
//             toast.error("Failed to fetch tasks");
//             navigate("/"); 
//         }
//     };

//     const fetchMessagesForTask = async (taskId) => {
//         try {
//             const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(response.data.messages);
//             setSelectedTaskId(taskId);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             toast.error("Failed to fetch messages for the task");
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const response = await axiosInstance.post(
//                 `/chat/send`,
//                 { taskId: selectedTaskId, content: newMessage },
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

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             sendMessage();
//         }
//     };

//     // Scroll to the bottom whenever messages are updated or a new message is sent
//     useEffect(() => {
//         if (messageEndRef.current) {
//             messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [
//         // messages
//     ]);

//     useEffect(() => {
//         const initialize = async () => {
//             await fetchProfile();
//             await fetchAssignedTasks();
//         };
//         initialize();
//     }, []);

//     useEffect(() => {
//         if (selectedTaskId) {
//             const interval = setInterval(() => {
//                 fetchMessagesForTask(selectedTaskId);
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [selectedTaskId]);

//     return (
//         <Box display="flex" flexDirection="row" height="100vh" bgcolor="#f4f6f8">
//             {/* Task List Sidebar */}
//             <Box
//                 sx={{
//                     width: "25%",
//                     bgcolor: "white",
//                     padding: 2,
//                     borderRight: 1,
//                     borderColor: "divider",
//                     overflowY: "auto",
//                 }}
//             >
//                 <Typography variant="h6" fontWeight="bold" marginBottom={2}>
//                     Assigned Tasks
//                 </Typography>
//                 <Button
//                     onClick={() => setOpenTasks(!openTasks)}
//                     variant="outlined"
//                     fullWidth
//                     sx={{ marginBottom: 2 }}
//                 >
//                     {openTasks ? "Hide Tasks" : "Show Tasks"}
//                 </Button>
//                 <Collapse in={openTasks}>
//                     <List>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem
//                                     key={task.id}
//                                     sx={{
//                                         padding: 1.5,
//                                         borderRadius: 1,
//                                         cursor: "pointer",
//                                         backgroundColor:
//                                             selectedTaskId === task._id
//                                                 ? "#1976d2"
//                                                 : "transparent",
//                                         color:
//                                             selectedTaskId === task._id
//                                                 ? "white"
//                                                 : "inherit",
//                                         "&:hover": {
//                                             backgroundColor: "#e3f2fd",
//                                         },
//                                     }}
//                                     onClick={() => fetchMessagesForTask(task._id)}
//                                 >
//                                     <Typography variant="body1" fontWeight="bold">
//                                         {task.description}
//                                     </Typography>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Collapse>
//             </Box>

//             {/* Chat Section */}
//             <Box
//                 sx={{
//                     width: "75%",
//                     display: "flex",
//                     flexDirection: "column",
//                     bgcolor: "#f5f5f5",
//                     padding: 2,
//                 }}
//             >
//                 {selectedTaskId ? (
//                     <>
//                         {/* Task Header */}
//                         <Box
//                             sx={{
//                                 padding: 2,
//                                 bgcolor: "white",
//                                 borderBottom: 1,
//                                 borderColor: "divider",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <Typography variant="h6" fontWeight="bold">
//                                 Task Messages
//                             </Typography>
//                         </Box>

//                         {/* Messages Section */}
//                         <Box
//                             sx={{
//                                 flexGrow: 1,
//                                 overflowY: "auto",
//                                 padding: 2,
//                                 bgcolor: "#ffffff",
//                                 borderRadius: 1,
//                                 marginBottom: 2,
//                                 maxHeight: "calc(100vh - 150px)",
//                             }}
//                         >
//                             {messages.length > 0 ? (
//                                 messages
//                                     .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Sort messages by creation date
//                                     .map((msg, index) => (
//                                         <Box
//                                             key={index}
//                                             sx={{
//                                                 display: "flex",
//                                                 justifyContent:
//                                                     msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                         ? "flex-end"
//                                                         : "flex-start",
//                                                 marginBottom: 2,
//                                             }}
//                                         >
//                                             <Box
//                                                 sx={{
//                                                     padding: 2,
//                                                     borderRadius: 2,
//                                                     maxWidth: "60%",
//                                                     bgcolor:
//                                                         msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                             ? "#1976d2"
//                                                             : "#e3f2fd",
//                                                     color:
//                                                         msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                             ? "white"
//                                                             : "black",
//                                                 }}
//                                             >
//                                                 {msg.content}
//                                             </Box>
//                                         </Box>
//                                     ))
//                             ) : (
//                                 <Typography variant="body2" color="textSecondary">
//                                     No messages yet
//                                 </Typography>
//                             )}
//                             {/* Scroll-to-bottom reference */}
//                             <div ref={messageEndRef} />
//                         </Box>

//                         {/* Input Section */}
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 bgcolor: "white",
//                                 padding: 1.5,
//                                 borderTop: 1,
//                                 borderColor: "divider",
//                             }}
//                         >
//                             <TextField
//                                 fullWidth
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 onKeyDown={handleKeyPress}
//                                 placeholder="Type a message..."
//                                 variant="outlined"
//                                 size="small"
//                                 sx={{
//                                     marginRight: 1,
//                                     borderRadius: 2,
//                                     "& .MuiOutlinedInput-root": {
//                                         borderRadius: 2,
//                                     },
//                                 }}
//                             />
//                             <Button
//                                 onClick={sendMessage}
//                                 variant="contained"
//                                 color="primary"
//                                 sx={{
//                                     padding: "6px 16px",
//                                     borderRadius: 2,
//                                 }}
//                             >
//                                 Send
//                             </Button>
//                         </Box>
//                     </>
//                 ) : (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "100%",
//                         }}
//                     >
//                         <Typography variant="h5" color="textSecondary">
//                             Select a task to view messages
//                         </Typography>
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default ChatPage;
























// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Box, Collapse, List, ListItem, Typography, TextField } from "@mui/material";

// const ChatPage = () => {
//     const [role, setRole] = useState("");
//     const [taskslist, setTaskslist] = useState([]); // List of tasks
//     const [selectedTaskId, setSelectedTaskId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [openTasks, setOpenTasks] = useState(true);
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();
//     const messageEndRef = useRef(null); // Ref to scroll to the bottom of the messages container

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
//             const response = await axiosInstance.get("/chat/assigned-tasks/", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTaskslist(response.data.tasksAssigned);
//             toast.success("Tasks fetched successfully");
//         } catch (error) {
//             console.error("Error fetching assigned tasks:", error);
//             toast.error("Failed to fetch tasks");
//             navigate("/"); 
//         }
//     };

//     const fetchMessagesForTask = async (taskId) => {
//         try {
//             const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(response.data.messages);
//             setSelectedTaskId(taskId);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             toast.error("Failed to fetch messages for the task");
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const response = await axiosInstance.post(
//                 `/chat/send`,
//                 { taskId: selectedTaskId, content: newMessage },
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

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             sendMessage();
//         }
//     };

//     // Scroll to the bottom whenever messages are updated or a new message is sent
//     useEffect(() => {
//         if (messageEndRef.current) {
//             messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [
//         // messages
//     ]);

//     useEffect(() => {
//         const initialize = async () => {
//             await fetchProfile();
//             await fetchAssignedTasks();
//         };
//         initialize();
//     }, []);

//     useEffect(() => {
//         if (selectedTaskId) {
//             const interval = setInterval(() => {
//                 fetchMessagesForTask(selectedTaskId);
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [selectedTaskId]);

//     return (
//         <Box
//             display="flex"
//             flexDirection={{ xs: "column", md: "row" }} // Responsive for mobile and larger screens
//             height="100vh"
//             bgcolor="#f4f6f8"
//             overflow="hidden" // Hide overflow
//         >
//             {/* Task List Sidebar */}
//             <Box
//                 sx={{
//                     width: { xs: "100%", md: "25%" },
//                     bgcolor: "white",
//                     padding: 2,
//                     borderRight: 1,
//                     borderColor: "divider",
//                     overflowY: "auto",
//                     display: { xs: openTasks ? "block" : "none", md: "block" }, // Toggle on mobile
//                     mb: { xs: 2, md: 0 }, // Margin at bottom for mobile
//                 }}
//             >
//                 <Typography variant="h6" fontWeight="bold" marginBottom={2}>
//                     Assigned Tasks
//                 </Typography>
//                 <Button
//                     onClick={() => setOpenTasks(!openTasks)}
//                     variant="outlined"
//                     fullWidth
//                     sx={{ marginBottom: 2, display: { md: "none" } }} // Hide on larger screens
//                 >
//                     {openTasks ? "Hide Tasks" : "Show Tasks"}
//                 </Button>
//                 <Collapse in={openTasks}>
//                     <List>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem
//                                     key={task.id}
//                                     sx={{
//                                         padding: 1.5,
//                                         borderRadius: 1,
//                                         cursor: "pointer",
//                                         backgroundColor:
//                                             selectedTaskId === task._id
//                                                 ? "#1976d2"
//                                                 : "transparent",
//                                         color:
//                                             selectedTaskId === task._id
//                                                 ? "white"
//                                                 : "inherit",
//                                         "&:hover": {
//                                             backgroundColor: "#e3f2fd",
//                                         },
//                                     }}
//                                     onClick={() => fetchMessagesForTask(task._id)}
//                                 >
//                                     <Typography variant="body1" fontWeight="bold">
//                                         {task.description}
//                                     </Typography>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Collapse>
//             </Box>

//             {/* Chat Section */}
//             <Box
//                 sx={{
//                     width: { xs: "100%", md: "75%" },
//                     display: "flex",
//                     flexDirection: "column",
//                     bgcolor: "#f5f5f5",
//                     padding: 2,
//                     overflow: "hidden", // Hide overflow
//                 }}
//             >
//                 {selectedTaskId ? (
//                     <>
//                         {/* Task Header */}
//                         <Box
//                             sx={{
//                                 padding: 2,
//                                 bgcolor: "white",
//                                 borderBottom: 1,
//                                 borderColor: "divider",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <Typography variant="h6" fontWeight="bold">
//                                 Task Messages
//                             </Typography>
//                         </Box>

//                         {/* Messages Section */}
//                         <Box
//                             sx={{
//                                 flexGrow: 1,
//                                 overflowY: "auto",
//                                 padding: 2,
//                                 bgcolor: "#ffffff",
//                                 borderRadius: 1,
//                                 marginBottom: 2,
//                                 maxHeight: "calc(100vh - 150px)",
//                                 overflowX: "hidden", // Prevent horizontal overflow
//                             }}
//                         >
//                             {messages.length > 0 ? (
//                                 messages
//                                     .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Sort messages by creation date
//                                     .map((msg, index) => (
//                                         <Box
//                                             key={index}
//                                             sx={{
//                                                 display: "flex",
//                                                 justifyContent:
//                                                     msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                         ? "flex-end"
//                                                         : "flex-start",
//                                                 marginBottom: 2,
//                                             }}
//                                         >
//                                             <Box
//                                                 sx={{
//                                                     padding: 2,
//                                                     borderRadius: 2,
//                                                     maxWidth: "60%",
//                                                     bgcolor:
//                                                         msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                             ? "#1976d2"
//                                                             : "#e3f2fd",
//                                                     color:
//                                                         msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                             ? "white"
//                                                             : "black",
//                                                 }}
//                                             >
//                                                 {msg.content}
//                                             </Box>
//                                         </Box>
//                                     ))
//                             ) : (
//                                 <Typography variant="body2" color="textSecondary">
//                                     No messages yet
//                                 </Typography>
//                             )}
//                             {/* Scroll-to-bottom reference */}
//                             <div ref={messageEndRef} />
//                         </Box>

//                         {/* Input Section */}
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 bgcolor: "white",
//                                 padding: 1.5,
//                                 borderTop: 1,
//                                 borderColor: "divider",
//                                 flexWrap: "wrap", // Allow input to wrap in mobile view
//                             }}
//                         >
//                             <TextField
//                                 fullWidth
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 onKeyDown={handleKeyPress}
//                                 placeholder="Type a message..."
//                                 variant="outlined"
//                                 size="small"
//                                 sx={{
//                                     marginRight: 1,
//                                     borderRadius: 2,
//                                     "& .MuiOutlinedInput-root": {
//                                         borderRadius: 2,
//                                     },
//                                 }}
//                             />
//                             <Button
//                                 onClick={sendMessage}
//                                 variant="contained"
//                                 color="primary"
//                                 sx={{
//                                     padding: "6px 16px",
//                                     borderRadius: 2,
//                                     width: { xs: "100%", sm: "auto" }, // Button full-width on small screens
//                                 }}
//                             >
//                                 Send
//                             </Button>
//                         </Box>
//                     </>
//                 ) : (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "100%",
//                         }}
//                     >
//                         <Typography variant="h5" color="textSecondary">
//                             Select a task to view messages
//                         </Typography>
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default ChatPage;
































































// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Box, Collapse, List, ListItem, Typography, TextField } from "@mui/material";

// const ChatPage = () => {
//     const [role, setRole] = useState("");
//     const [taskslist, setTaskslist] = useState([]); // List of tasks
//     const [selectedTaskId, setSelectedTaskId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [openTasks, setOpenTasks] = useState(true);
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();
//     const messageEndRef = useRef(null); // Ref to scroll to the bottom of the messages container

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
//             const response = await axiosInstance.get("/chat/assigned-tasks/", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTaskslist(response.data.tasksAssigned);
//             toast.success("Tasks fetched successfully");
//         } catch (error) {
//             console.error("Error fetching assigned tasks:", error);
//             toast.error("Failed to fetch tasks");
//             navigate("/"); 
//         }
//     };

//     const fetchMessagesForTask = async (taskId) => {
//         try {
//             const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(response.data.messages);
//             setSelectedTaskId(taskId);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             toast.error("Failed to fetch messages for the task");
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const response = await axiosInstance.post(
//                 `/chat/send`,
//                 { taskId: selectedTaskId, content: newMessage },
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

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             sendMessage();
//         }
//     };

//     // Scroll to the bottom whenever messages are updated or a new message is sent
//     useEffect(() => {
//         if (messageEndRef.current) {
//             messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [
//         // messages
//     ]);

//     useEffect(() => {
//         const initialize = async () => {
//             await fetchProfile();
//             await fetchAssignedTasks();
//         };
//         initialize();
//     }, []);

//     useEffect(() => {
//         if (selectedTaskId) {
//             const interval = setInterval(() => {
//                 fetchMessagesForTask(selectedTaskId);
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [selectedTaskId]);

//     return (
//         <Box display="flex" flexDirection="row" 
//         // height="100vh" 
//         sx={{mt:2, mb:2}}
//         height="100%" 
//         bgcolor="#f4f6f8">
//             {/* Task List Sidebar */}
//             <Box
//                 sx={{
//                     width: "25%",
//                     bgcolor: "white",
//                     padding: 2,
//                     // borderRight: 1,
//                     // borderColor: "divider",
//                     overflowY: "auto",
//                 }}
//             >
//                 <Typography variant="h6" fontWeight="bold" marginBottom={2}>
//                     Assigned Tasks
//                 </Typography>
//                 <Button
//                     onClick={() => setOpenTasks(!openTasks)}
//                     variant="outlined"
//                     fullWidth
//                     sx={{ marginBottom: 2 }}
//                 >
//                     {openTasks ? "Hide Tasks" : "Show Tasks"}
//                 </Button>
//                 <Collapse in={openTasks}>
//                     <List>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem
//                                     key={task.id}
//                                     sx={{
//                                         padding: 1.5,
//                                         borderRadius: 1,
//                                         cursor: "pointer",
//                                         backgroundColor:
//                                             selectedTaskId === task._id
//                                                 ? "#1976d2"
//                                                 : "transparent",
//                                         color:
//                                             selectedTaskId === task._id
//                                                 ? "white"
//                                                 : "inherit",
//                                         "&:hover": {
//                                             backgroundColor: "#e3f2fd",
//                                         },
//                                     }}
//                                     onClick={() => fetchMessagesForTask(task._id)}
//                                 >
//                                     <Typography variant="body1" fontWeight="bold">
//                                         {task.description}
//                                     </Typography>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Collapse>
//             </Box>

//             {/* Chat Section */}
//             <Box
//                 sx={{
//                     width: "75%",
//                     display: "flex",
//                     flexDirection: "column",
//                     bgcolor: "#f5f5f5",
//                     // padding: 2,
//                 }}
//             >
//                 {selectedTaskId ? (
//                     <>
//                         {/* Task Header */}
//                         <Box
//                             sx={{
//                                 // padding: 2,
//                                 bgcolor: "white",
//                                 // borderBottom: 1,
//                                 // borderColor: "divider",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <Typography variant="h6" fontWeight="bold">
//                                 Task Messages
//                             </Typography>
//                         </Box>

//                         {/* Messages Section */}
//                         <Box
//                             sx={{
//                                 flexGrow: 1,
//                                 overflowY: "auto",
//                                 // padding: 2,
//                                 bgcolor: "#ffffff",
//                                 // borderRadius: 1,
//                                 // marginBottom: 2,
//                                 paddingBottom: 0,
//                                 maxHeight: "calc(100vh - 150px)",
//                             }}
//                         >
//                             {messages.length > 0 ? (
//                                 messages
//                                     .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Sort messages by creation date
//                                     .map((msg, index) => (
//                                         <Box
//                                             key={index}
//                                             sx={{
//                                                 display: "flex",
//                                                 justifyContent:
//                                                     msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                         ? "flex-end"
//                                                         : "flex-start",
//                                                 marginBottom: 2,
//                                             }}
//                                         >
//                                             <Box
//                                                 sx={{
//                                                     padding: 2,
//                                                     borderRadius: 2,
//                                                     maxWidth: "60%",
//                                                     bgcolor:
//                                                         msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                             ? "#1976d2"
//                                                             : "#e3f2fd",
//                                                     color:
//                                                         msg.sender.email === "cocply135@gmail.com" // Replace with user email or ID
//                                                             ? "white"
//                                                             : "black",
//                                                 }}
//                                             >
//                                                 {msg.content}
//                                             </Box>
//                                         </Box>
//                                     ))
//                             ) : (
//                                 <Typography variant="body2" color="textSecondary">
//                                     No messages yet
//                                 </Typography>
//                             )}
//                             {/* Scroll-to-bottom reference */}
//                             <div ref={messageEndRef} />
//                         </Box>

//                         {/* Input Section */}
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 bgcolor: "white",
//                                 // padding: 1.5,
//                                 // borderTop: 1,
//                                 // borderColor: "divider",
//                             }}
//                         >
//                             <TextField
//                                 fullWidth
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 onKeyDown={handleKeyPress}
//                                 placeholder="Type a message..."
//                                 variant="outlined"
//                                 size="small"
//                                 sx={{
//                                     // marginRight: 1,
//                                     borderRadius: 2,
//                                     "& .MuiOutlinedInput-root": {
//                                         borderRadius: 2,
//                                     },
//                                 }}
//                             />
//                             <Button
//                                 onClick={sendMessage}
//                                 variant="contained"
//                                 color="primary"
//                                 sx={{
//                                     padding: "6px 16px",
//                                     borderRadius: 2,
//                                 }}
//                             >
//                                 Send
//                             </Button>
//                         </Box>
//                     </>
//                 ) : (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "100%",
//                         }}
//                     >
//                         <Typography variant="h5" color="textSecondary">
//                             Select a task to view messages
//                         </Typography>
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default ChatPage;


















// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Box, Collapse, List, ListItem, Typography, TextField } from "@mui/material";
// import moment from "moment"; // For better timestamp formatting

// const ChatPage = () => {
//     const [role, setRole] = useState("");
//     const [taskslist, setTaskslist] = useState([]);
//     const [selectedTaskId, setSelectedTaskId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [openTasks, setOpenTasks] = useState(true);
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();
//     const messageEndRef = useRef(null);

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
//             const response = await axiosInstance.get("/chat/assigned-tasks/", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTaskslist(response.data.tasksAssigned);
//             toast.success("Tasks fetched successfully");
//         } catch (error) {
//             console.error("Error fetching assigned tasks:", error);
//             toast.error("Failed to fetch tasks");
//             navigate("/"); 
//         }
//     };

//     const fetchMessagesForTask = async (taskId) => {
//         try {
//             const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(response.data.messages);
//             setSelectedTaskId(taskId);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             toast.error("Failed to fetch messages for the task");
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const response = await axiosInstance.post(
//                 `/chat/send`,
//                 { taskId: selectedTaskId, content: newMessage },
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

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             sendMessage();
//         }
//     };

//     useEffect(() => {
//         if (messageEndRef.current) {
//             messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [messages]);

//     useEffect(() => {
//         const initialize = async () => {
//             await fetchProfile();
//             await fetchAssignedTasks();
//         };
//         initialize();
//     }, []);

//     useEffect(() => {
//         if (selectedTaskId) {
//             const interval = setInterval(() => {
//                 fetchMessagesForTask(selectedTaskId);
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [selectedTaskId]);

//     return (
//         <Box
//             display="flex"
//             flexDirection={{ xs: "column", sm: "row" }} // Adjust layout for small screens
//             sx={{ mt: 2, mb: 2 }}
//             height="100%"
//             bgcolor="#f4f6f8"
//         >
//             <Box
//                 sx={{
//                     width: { xs: "100%", sm: "25%" }, // Full width on small screens, 25% on larger
//                     bgcolor: "white",
//                     padding: 2,
//                     overflowY: "auto",
//                     marginBottom: { xs: 2, sm: 0 }, // Add margin at the bottom for small screens
//                     borderRadius: 2, // Added border radius for a cleaner look
//                     boxShadow: 2, // Added shadow for component separation
//                 }}
//             >
//                 <Typography variant="h6" fontWeight="bold" marginBottom={2}>
//                     Assigned Tasks
//                 </Typography>
//                 <Button
//                     onClick={() => setOpenTasks(!openTasks)}
//                     variant="outlined"
//                     fullWidth
//                     sx={{ marginBottom: 2 }}
//                 >
//                     {openTasks ? "Hide Tasks" : "Show Tasks"}
//                 </Button>
//                 <Collapse in={openTasks}>
//                     <List>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem
//                                     key={task.id}
//                                     sx={{
//                                         padding: 1.5,
//                                         borderRadius: 1,
//                                         cursor: "pointer",
//                                         backgroundColor:
//                                             selectedTaskId === task._id
//                                                 ? "#1976d2"
//                                                 : "transparent",
//                                         color:
//                                             selectedTaskId === task._id
//                                                 ? "white"
//                                                 : "inherit",
//                                         "&:hover": {
//                                             backgroundColor: "#e3f2fd",
//                                         },
//                                     }}
//                                     onClick={() => fetchMessagesForTask(task._id)}
//                                 >
//                                     <Typography variant="body1" fontWeight="bold">
//                                         {task.description}
//                                     </Typography>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Collapse>
//             </Box>

//             <Box
//                 sx={{
//                     width: { xs: "100%", sm: "75%" }, // Full width on small screens, 75% on larger
//                     display: "flex",
//                     flexDirection: "column",
//                     bgcolor: "#f5f5f5",
//                     borderRadius: 2, // Added border radius
//                     boxShadow: 2, // Added shadow for component separation
//                 }}
//             >
//                 {selectedTaskId ? (
//                     <>
//                         <Box
//                             sx={{
//                                 bgcolor: "white",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                                 padding: 2, // Added padding
//                                 borderBottom: 1, // Separated header with a border
//                                 borderColor: "grey.300",
//                             }}
//                         >
//                             <Typography variant="h6" fontWeight="bold">
//                                 Task Messages
//                             </Typography>
//                         </Box>

//                         <Box
//                             sx={{
//                                 flexGrow: 1,
//                                 overflowY: "auto",
//                                 bgcolor: "#ffffff",
//                                 paddingBottom: 0,
//                                 maxHeight: "calc(100vh - 150px)",
//                                 padding: 2, // Added padding
//                             }}
//                         >
//                             {messages.length > 0 ? (
//                                 messages
//                                     .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//                                     .map((msg, index) => (
//                                         <Box
//                                             key={index}
//                                             sx={{
//                                                 display: "flex",
//                                                 justifyContent:
//                                                     msg.sender.email === "cocply135@gmail.com"
//                                                         ? "flex-end"
//                                                         : "flex-start",
//                                                 marginBottom: 2,
//                                             }}
//                                         >
//                                             <Box
//                                                 sx={{
//                                                     padding: 2,
//                                                     borderRadius: 2,
//                                                     maxWidth: "60%",
//                                                     bgcolor:
//                                                         msg.sender.email === "cocply135@gmail.com"
//                                                             ? "#1976d2"
//                                                             : "#e3f2fd",
//                                                     color:
//                                                         msg.sender.email === "cocply135@gmail.com"
//                                                             ? "white"
//                                                             : "black",
//                                                     position: "relative",
//                                                 }}
//                                             >
//                                                 {msg.content}
//                                                 <Typography
//                                                     variant="caption"
//                                                     color="textSecondary"
//                                                     sx={{
//                                                         position: "absolute",
//                                                         bottom: -18,
//                                                         right: 5,
//                                                     }}
//                                                 >
//                                                     {moment(msg.createdAt).fromNow()}
//                                                 </Typography>
//                                                 {!msg.isRead && (
//                                                     <Box
//                                                         sx={{
//                                                             position: "absolute",
//                                                             top: 5,
//                                                             right: -12,
//                                                             width: 12,
//                                                             height: 12,
//                                                             borderRadius: "50%",
//                                                             backgroundColor: "#1976d2",
//                                                             border: "2px solid white",
//                                                         }}
//                                                     />
//                                                 )}
//                                             </Box>
//                                         </Box>
//                                     ))
//                             ) : (
//                                 <Typography variant="body2" color="textSecondary">
//                                     No messages yet
//                                 </Typography>
//                             )}
//                             <div ref={messageEndRef} />
//                         </Box>

//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 bgcolor: "white",
//                                 padding: 1, // Added padding for input section
//                                 borderTop: 1, // Separated with border
//                                 borderColor: "grey.300",
//                             }}
//                         >
//                             <TextField
//                                 fullWidth
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 onKeyDown={handleKeyPress}
//                                 placeholder="Type a message..."
//                                 variant="outlined"
//                                 size="small"
//                                 sx={{
//                                     borderRadius: 2,
//                                     "& .MuiOutlinedInput-root": {
//                                         borderRadius: 2,
//                                     },
//                                     marginRight: 1, // Spacing between text field and button
//                                 }}
//                             />
//                             <Button
//                                 onClick={sendMessage}
//                                 variant="contained"
//                                 color="primary"
//                                 sx={{
//                                     padding: "6px 16px",
//                                     borderRadius: 2,
//                                 }}
//                             >
//                                 Send
//                             </Button>
//                         </Box>
//                     </>
//                 ) : (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "100%",
//                         }}
//                     >
//                         <Typography variant="h5" color="textSecondary">
//                             Select a task to view messages
//                         </Typography>
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default ChatPage;





















// import React, { useState, useEffect, useRef } from "react";
// import axiosInstance from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Button, Box, Collapse, List, ListItem, Typography, TextField } from "@mui/material";
// import moment from "moment"; // For better timestamp formatting

// const ChatPage = () => {
//     const [role, setRole] = useState("");
//     const [taskslist, setTaskslist] = useState([]);
//     const [selectedTaskId, setSelectedTaskId] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [openTasks, setOpenTasks] = useState(true);
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();
//     const messageEndRef = useRef(null);

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
//             const response = await axiosInstance.get("/chat/assigned-tasks/", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTaskslist(response.data.tasksAssigned);
//             toast.success("Tasks fetched successfully");
//         } catch (error) {
//             console.error("Error fetching assigned tasks:", error);
//             toast.error("Failed to fetch tasks");
//             navigate("/"); 
//         }
//     };

//     const fetchMessagesForTask = async (taskId) => {
//         try {
//             const response = await axiosInstance.get(`/chat/task/${taskId}/messages`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessages(response.data.messages);
//             setSelectedTaskId(taskId);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//             toast.error("Failed to fetch messages for the task");
//         }
//     };

//     const sendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             const response = await axiosInstance.post(
//                 `/chat/send`,
//                 { taskId: selectedTaskId, content: newMessage },
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

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter") {
//             sendMessage();
//         }
//     };

//     useEffect(() => {
//         if (messageEndRef.current) {
//             messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [messages]);

//     useEffect(() => {
//         const initialize = async () => {
//             await fetchProfile();
//             await fetchAssignedTasks();
//         };
//         initialize();
//     }, []);

//     useEffect(() => {
//         if (selectedTaskId) {
//             const interval = setInterval(() => {
//                 fetchMessagesForTask(selectedTaskId);
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [selectedTaskId]);

//     return (
//         <Box
//             display="flex"
//             flexDirection={{ xs: "column", sm: "row" }} // Adjust layout for small screens
//             sx={{ mt: 2, mb: 2 }}
//             height="100%"
//             bgcolor="#f4f6f8"
//         >
//             <Box
//                 sx={{
//                     width: { xs: "100%", sm: "25%" }, // Full width on small screens, 25% on larger
//                     bgcolor: "white",
//                     padding: 2,
//                     overflowY: "auto",
//                     marginBottom: { xs: 2, sm: 0 }, // Add margin at the bottom for small screens
//                     borderRadius: 2, // Added border radius for a cleaner look
//                     boxShadow: 2, // Added shadow for component separation
//                 }}
//             >
//                 <Typography variant="h6" fontWeight="bold" marginBottom={2}>
//                     Assigned Tasks
//                 </Typography>
//                 <Button
//                     onClick={() => setOpenTasks(!openTasks)}
//                     variant="outlined"
//                     fullWidth
//                     sx={{ marginBottom: 2 }}
//                 >
//                     {openTasks ? "Hide Tasks" : "Show Tasks"}
//                 </Button>
//                 <Collapse in={openTasks}>
//                     <List>
//                         {taskslist.length > 0 ? (
//                             taskslist.map((task) => (
//                                 <ListItem
//                                     key={task.id}
//                                     sx={{
//                                         padding: 1.5,
//                                         borderRadius: 1,
//                                         cursor: "pointer",
//                                         backgroundColor:
//                                             selectedTaskId === task._id
//                                                 ? "#1976d2"
//                                                 : "transparent",
//                                         color:
//                                             selectedTaskId === task._id
//                                                 ? "white"
//                                                 : "inherit",
//                                         "&:hover": {
//                                             backgroundColor: "#e3f2fd",
//                                         },
//                                     }}
//                                     onClick={() => fetchMessagesForTask(task._id)}
//                                 >
//                                     <Typography variant="body1" fontWeight="bold">
//                                         {task.description}
//                                     </Typography>
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <Typography variant="body2">No tasks assigned</Typography>
//                         )}
//                     </List>
//                 </Collapse>
//             </Box>

//             <Box
//                 sx={{
//                     width: { xs: "100%", sm: "75%" }, // Full width on small screens, 75% on larger
//                     display: "flex",
//                     flexDirection: "column",
//                     bgcolor: "#f5f5f5",
//                     borderRadius: 2, // Added border radius
//                     boxShadow: 2, // Added shadow for component separation
//                 }}
//             >
//                 {selectedTaskId ? (
//                     <>
//                         <Box
//                             sx={{
//                                 bgcolor: "white",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                                 padding: 2, // Added padding
//                                 borderBottom: 1, // Separated header with a border
//                                 borderColor: "grey.300",
//                             }}
//                         >
//                             <Typography variant="h6" fontWeight="bold">
//                                 Task Messages
//                             </Typography>
//                         </Box>

//                         <Box
//                             sx={{
//                                 flexGrow: 1,
//                                 overflowY: "auto",
//                                 bgcolor: "#ffffff",
//                                 paddingBottom: 0,
//                                 maxHeight: "calc(100vh - 150px)",
//                                 padding: 2, // Added padding
//                             }}
//                         >
//                             {messages.length > 0 ? (
//                                 messages
//                                     .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//                                     .map((msg, index) => (
//                                         <Box
//                                             key={index}
//                                             sx={{
//                                                 display: "flex",
//                                                 justifyContent:
//                                                     msg.sender.email === "cocply135@gmail.com"
//                                                         ? "flex-end"
//                                                         : "flex-start",
//                                                 marginBottom: 2,
//                                             }}
//                                         >
//                                             <Box
//                                                 sx={{
//                                                     padding: 2,
//                                                     borderRadius: 2,
//                                                     maxWidth: "60%",
//                                                     bgcolor:
//                                                         msg.sender.email === "cocply135@gmail.com"
//                                                             ? "#1976d2"
//                                                             : "#e3f2fd",
//                                                     color:
//                                                         msg.sender.email === "cocply135@gmail.com"
//                                                             ? "white"
//                                                             : "black",
//                                                     position: "relative",
//                                                 }}
//                                             >
//                                                 {msg.content}
//                                                 <Typography
//                                                     variant="caption"
//                                                     color="textSecondary"
//                                                     sx={{
//                                                         position: "absolute",
//                                                         bottom: -18,
//                                                         right: 5,
//                                                     }}
//                                                 >
//                                                     {moment(msg.createdAt).fromNow()}
//                                                 </Typography>
//                                                 {!msg.isRead && (
//                                                     <Box
//                                                         sx={{
//                                                             position: "absolute",
//                                                             top: 5,
//                                                             right: -12,
//                                                             width: 12,
//                                                             height: 12,
//                                                             borderRadius: "50%",
//                                                             backgroundColor: "#1976d2",
//                                                             border: "2px solid white",
//                                                         }}
//                                                     />
//                                                 )}
//                                             </Box>
//                                         </Box>
//                                     ))
//                             ) : (
//                                 <Typography variant="body2" color="textSecondary">
//                                     No messages yet
//                                 </Typography>
//                             )}
//                             <div ref={messageEndRef} />
//                         </Box>

//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 bgcolor: "white",
//                                 padding: 1, // Added padding for input section
//                                 borderTop: 1, // Separated with border
//                                 borderColor: "grey.300",
//                             }}
//                         >
//                             <TextField
//                                 fullWidth
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 onKeyDown={handleKeyPress}
//                                 placeholder="Type a message..."
//                                 variant="outlined"
//                                 size="small"
//                                 sx={{
//                                     borderRadius: 2,
//                                     "& .MuiOutlinedInput-root": {
//                                         borderRadius: 2,
//                                     },
//                                     marginRight: 1, // Spacing between text field and button
//                                 }}
//                             />
//                             <Button
//                                 onClick={sendMessage}
//                                 variant="contained"
//                                 color="primary"
//                                 sx={{
//                                     padding: "6px 16px",
//                                     borderRadius: 2,
//                                 }}
//                             >
//                                 Send
//                             </Button>
//                         </Box>
//                     </>
//                 ) : (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "100%",
//                         }}
//                     >
//                         <Typography variant="h5" color="textSecondary">
//                             Select a task to view messages
//                         </Typography>
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default ChatPage;


















import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Box, Collapse, List, ListItem, Typography, TextField } from "@mui/material";

const ChatPage = () => {
    const [role, setRole] = useState("");
    const [taskslist, setTaskslist] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [openTasks, setOpenTasks] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const messageEndRef = useRef(null);
    const userEmail = JSON.parse(localStorage.getItem("user")).email;
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

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

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
        <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }} 
            sx={{ mt: 2, mb: 2 }}
            height="100%"
            bgcolor="#f4f6f8"
        >
            <Box
                sx={{
                    width: { xs: "100%", sm: "25%" }, 
                    bgcolor: "white",
                    padding: 2,
                    overflowY: "auto",
                    marginBottom: { xs: 2, sm: 0 }, 
                }}
            >
                <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                    Assigned Tasks
                </Typography>
                <Button
                    onClick={() => setOpenTasks(!openTasks)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                >
                    {openTasks ? "Hide Tasks" : "Show Tasks"}
                </Button>
                <Collapse in={openTasks}>
                    <List>
                        {taskslist.length > 0 ? (
                            taskslist.map((task) => (
                                <ListItem
                                    key={task.id}
                                    sx={{
                                        padding: 1.5,
                                        borderRadius: 1,
                                        cursor: "pointer",
                                        backgroundColor:
                                            selectedTaskId === task._id
                                                ? "#1976d2"
                                                : "transparent",
                                        color:
                                            selectedTaskId === task._id
                                                ? "white"
                                                : "inherit",
                                        "&:hover": {
                                            backgroundColor: "#e3f2fd",
                                        },
                                    }}
                                    onClick={() => fetchMessagesForTask(task._id)}
                                >
                                    <Typography variant="body1" fontWeight="bold">
                                        {task.description}
                                    </Typography>
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body2">No tasks assigned</Typography>
                        )}
                    </List>
                </Collapse>
            </Box>

            <Box
                sx={{
                    width: { xs: "100%", sm: "75%" }, 
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "#f5f5f5",
                }}
            >
                {selectedTaskId ? (
                    <>
                        <Box
                            sx={{
                                bgcolor: "white",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                Task Messages
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                flexGrow: 1,
                                overflowY: "auto",
                                bgcolor: "#ffffff",
                                paddingBottom: 0,
                                maxHeight: "calc(100vh - 150px)",
                            }}
                        >
                            {messages.length > 0 ? (
                                messages
                                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                    .map((msg, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                justifyContent:
                                                    msg.sender.email === userEmail
                                                        ? "flex-end"
                                                        : "flex-start",
                                                marginBottom: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    minWidth: 40,
                                                    // display: "flex",
                                                    // alignItems: "center",
                                                    // textAlign: "center",
                                                    padding: 2,
                                                    borderRadius: 2,
                                                    maxWidth: "60%",
                                                    textAlign: msg.sender.email === userEmail
                                                            ? "left"
                                                            : "left",
                                                    bgcolor:
                                                        msg.sender.email === userEmail
                                                            ? "#1976d2"
                                                            : "#e3f2fd",
                                                    color:
                                                        msg.sender.email === userEmail
                                                            ? "white"
                                                            : "black",
                                                    position: "relative", // Add positioning for timestamp
                                                }}
                                            >
                                                {msg.content}
                                                
                                                <Typography 
                                                    variant="caption"
                                                    sx={{
                                                        position: "absolute", 
                                                        bottom: -20, 
                                                        right: 0, 
                                                        fontSize: "0.75rem", 
                                                        color: "gray"
                                                    }}
                                                >
                                                    {new Date(msg.createdAt).toLocaleTimeString()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    No messages yet
                                </Typography>
                            )}
                            <div ref={messageEndRef} />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                bgcolor: "white",
                            }}
                        >
                            <TextField
                                fullWidth
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Type a message..."
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderRadius: 2,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                    },
                                    fontSize: "0.875rem", // Smaller text size
                                }}
                            />
                            <Button
                                onClick={sendMessage}
                                variant="contained"
                                color="primary"
                                sx={{
                                    padding: "6px 16px",
                                    borderRadius: 2,
                                    fontSize: "0.875rem", // Smaller text size
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <Typography variant="h5" color="textSecondary">
                            Select a task to view messages
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ChatPage;
