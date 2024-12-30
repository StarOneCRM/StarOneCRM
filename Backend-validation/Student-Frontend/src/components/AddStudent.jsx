import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
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
  event.preventDefault();

  try {
      const response = await axios.post(
          `http://localhost:5000/api/cruds/`,
          {
              ...formData,
              age: Number(formData.age),
          }
      );

      const { message, data } = response.data;

      if (data) {
          toast.success(`${message}, you will be redirected shortly`);
          setTimeout(() => {
              window.location.href = '/';
          }, 5000);
      }
  } catch (error) {
      console.error('Error adding student:', error);

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
          toast.error('Failed to add student. Please try again later.');
      }
  }
};



  return (
    <div className="container2">
      <h2 className="heading">Add Student</h2>
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
        <button type="submit" className="submit-button">Add Student</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddStudent;
