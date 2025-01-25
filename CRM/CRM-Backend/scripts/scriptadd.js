import axios from 'axios';
// import { toast } from 'react-toastify';

const createstudentData = (index) => {
  const names = ['John Doe', 'Jane Smith', 'Alice Brown', 'Bob Johnson', 'Dipen Patel', 'Emily Davis', 'Michael Wilson', 'Sarah Miller', 'David Anderson', 'Laura Thomas'];
  const majors = ['Computer Science', 'Mathematics', 'Physics', 'Engineering', 'Biology', 'Chemistry', 'Economics', 'History'];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomMajor = majors[Math.floor(Math.random() * majors.length)];

  return {
    name: randomName,
    age: Math.floor(Math.random() * 5) + 18, // Random age between 18 and 22
    email: `student${index + 1}@example.com`, // Unique email for each student
    major: randomMajor
  };
};

const submitstudentData = async (studentData) => {
    await axios.post('https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api/cruds/', studentData);
};

const addstudents = async (num) => {
  for (let i = 0; i < num; i++) {
    const studentData = createstudentData(i);
    await submitstudentData(studentData);
  }
};

// Usage example:
// Add 10 students
addstudents(100);
