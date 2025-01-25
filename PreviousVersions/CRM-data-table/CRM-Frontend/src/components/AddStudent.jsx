import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addstudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    major: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
        const response = await axios.post(
          // `http://localhost:5000/api/cruds/`, 
          `https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/`,
          {
            ...formData,
            // id: studentId
        });
        console.log('student added:', response.data);
        if (response.data) {
            // Show success toast
            toast.success("added successfully soon will be redirected back");
            setTimeout(() => {
                window.location.href = '/';
            }, 500);
        } else {
            // Show error toast if the response indicates failure
            toast.error(response.data.message);
        }

    } catch (error) {
        console.error('Error adding student:', error);
        toast.error('Failed to add student.');
    }
};

  return (
    <div className="container2">
      <h2 className="heading">Add student</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="major"
          placeholder="Major"
          value={formData.major}
          onChange={handleChange}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Add student</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Addstudent;
