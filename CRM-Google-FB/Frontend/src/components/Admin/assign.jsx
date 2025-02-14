import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { Button, MenuItem, Select, FormControl, InputLabel, Grid, Typography, Card, CardContent } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AssignUserToEmployee = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedTask, setSelectedTask] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const navigate = useNavigate();

    // Fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axiosInstance.get('chat/tasks/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data.tasks.filter(task => task));
                toast.success('Tasks fetched successfully');
            } catch (error) {
                console.error('Error fetching tasks:', error);
                toast.error('Failed to fetch tasks');
                setTasks([]);
                navigate('/');
            }
        };
        fetchTasks();
    }, [navigate]);

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axiosInstance.get('/admin/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data.data);
                toast.success('Users fetched successfully');
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Failed to fetch users');
                setUsers([]);
                navigate('/');
            }
        };
        fetchUsers();
    }, [navigate]);

    // Handle assign action
    const handleAssign = async () => {
        if (!selectedTask || !selectedCustomer || !selectedEmployee) {
            toast.error('Please select task, customer, and employee.');
            return;
        }

        try {
            // Call the backend API to assign the task to the employee
            const response = await axiosInstance.post(
                '/chat/assign',
                { taskId: selectedTask, customerId: selectedCustomer, employeeId: selectedEmployee },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            toast.success('Task assigned to employee successfully!');
            // Update the task list to reflect the assignment
            setTasks(tasks.filter(task => task._id !== selectedTask));
        } catch (error) {
            console.error('Error assigning task:', error);
            toast.error('Failed to assign task.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Assign Task to Employee
            </Typography>
            <Grid container spacing={3}>
                {/* Task List */}
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Task</InputLabel>
                        <Select
                            value={selectedTask}
                            onChange={(e) => {
                                const task = tasks.find(t => t._id === e.target.value);
                                setSelectedTask(e.target.value);
                                setSelectedCustomer(task ? task.customer._id : '');
                            }}
                            label="Task"
                        >
                            {tasks.filter(task => task.isEmployeeAssigned === false).map((task) => (
                                <MenuItem key={task._id} value={task._id}>
                                    {task.title} - {task.description}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Employee List */}
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Employee</InputLabel>
                        <Select
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            label="Employee"
                        >
                            {users.filter(user => user.role === 'employee').map((user) => (
                                <MenuItem key={user._id} value={user._id}>
                                    {user.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {/* Assign Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleAssign}
                style={{ marginTop: '20px' }}
            >
                Assign Task
            </Button>

            {/* Assigned List */}
            <Typography variant="h5" gutterBottom style={{ marginTop: '40px' }}>
                Assignments
            </Typography>
            <Grid container spacing={3}>
                {tasks.map(task => (
                    <Grid item xs={12} md={6} key={task._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{task.title}</Typography>
                                <Typography variant="body2">Customer: {task.customer ? task.customer.name : ''}</Typography>
                                <Typography variant="body2">Employee: {task.employee ? task.employee.name : 'Unassigned'}</Typography>
                                <Typography variant="body2">Description: {task.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default AssignUserToEmployee;
