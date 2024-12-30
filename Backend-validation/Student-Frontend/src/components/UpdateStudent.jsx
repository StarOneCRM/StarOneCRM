import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({ name: '', age: '', email: '', major: '' });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/cruds/${id}`)
            .then(response => {
                setStudent(response.data.data);
                toast.success('Student data loaded successfully');
            })
            .catch(error => {
                console.error('Error fetching student:', error);
                toast.error('Failed to load student data');
            });
    }, [id]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/cruds/${id}`,
                { ...student, age: Number(student.age) }
            );
            const { message, data } = response.data;
            if (data) {
                toast.success(`${message}, you will be redirected shortly`);
                setTimeout(() => {
                    window.location.href = '/';
                }, 5000);
            }
        } catch (error) {
            console.error('Error updating student:', error);

            if (error.response && error.response.data) {
                const { error: backendError, message } = error.response.data;

                if (backendError && backendError.includes('duplicate key error')) {
                    const emailMatch = backendError.match(/email: "(.*?)"/);
                    const duplicateEmail = emailMatch ? emailMatch[1] : 'this email';
                    toast.error(`The email ${duplicateEmail} is already associated with another student.`);
                } else {
                    toast.error(message || backendError || 'An unexpected error occurred.');
                }
            } else {
                toast.error('Failed to update student. Please try again later.');
            }
        }
    };

    return (
        <div className="container2">
            <ToastContainer />
            <h2 className="heading">Update Student</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="input-field"
                />
                <input
                    type="number"
                    name="age"
                    value={student.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                    className="input-field"
                />
                <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    name="major"
                    value={student.major}
                    onChange={handleChange}
                    placeholder="Major"
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-button">Update Student</button>
            </form>
        </div>
    );
};

export default UpdateStudent;
