import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({ name: '', age: '', email: '', major: '' });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/cruds/${id}`)
            .then(response => setStudent(response.data))
            .catch(error => console.error('Error fetching student:', error));
    }, [id]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:5000/api/cruds/${id}`, student)
            .then(response => {
                console.log('Student updated:', response.data);
                setStudent({ name: '', age: '', email: '', major: '' }); // Clear form
                window.location.href = '/'; // Redirect after successful update
            })
            .catch(error => console.error('Error updating student:', error));
    };

    return (
        <div className="container">
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
