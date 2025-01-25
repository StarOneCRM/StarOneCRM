import React, { useEffect, useState } from 'react';
import axios from 'axios';

const studentList = () => {
  const [students, setstudents] = useState([]);

  const fetchstudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cruds/');
      setstudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cruds/${id}`);
      fetchstudents();  // Refresh student list after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

//   const handleUpdate = async (id, updatedData) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/cruds/${id}`, updatedData);
//       fetchstudents();  // Refresh student list after update
//     } catch (error) {
//       console.error('Error updating student:', error);
//     }
//   };

  useEffect(() => {
    fetchstudents();
  }, []);

return (
    <div>
        <h2>student List</h2>
        {/* <button onClick={() => window.location.href='/add'}>Add student</button> */}
        <ul>
            {students.map((student) => (
                <li key={student._id}>
                    <strong>
                      {/* {student._id} |  */}
                      {student.name}</strong> | Age: {student.age} | Email: {student.email} | Major: {student.major}
                    <div>
                        <button onClick={() => handleDelete(student._id)}>Delete</button>
                        <button onClick={() => window.location.href=`/update/${student._id}`}>
                            Update
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);
};

export default studentList;
