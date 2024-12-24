import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cruds/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cruds/${id}`);
      fetchStudents();  // Refresh student list after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

//   const handleUpdate = async (id, updatedData) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/cruds/${id}`, updatedData);
//       fetchStudents();  // Refresh student list after update
//     } catch (error) {
//       console.error('Error updating student:', error);
//     }
//   };

  useEffect(() => {
    fetchStudents();
  }, []);

return (
    <div>
        <h2>Student List</h2>
        {/* <button onClick={() => window.location.href='/add'}>Add Student</button> */}
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

export default StudentList;
