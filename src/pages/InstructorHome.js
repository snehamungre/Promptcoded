import React, { useState, useEffect } from 'react';
import { Select, Typography, Card } from 'antd';
import axios from 'axios';
import StudentHome from './StudentHome.js'; 

const { Title } = Typography;

const InstructorHome = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch the list of students
        axios.get('http://localhost:9000/users/students')
            .then(response => {
                setStudents(response.data.data); 
            })
            .catch(error => {
                console.error('There was an error fetching the students!', error);
            });
    }, []);

    const handleStudentChange = (value) => {
        setSelectedStudent(value);
    };

    return (
        <>
            <Title level={3}>Instructor Dashboard</Title>
            <div style={{ marginBottom: 24 }}>
                <Title level={5}>Select a student to view their attempts</Title>
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    optionFilterProp="children"
                    placeholder="Select a student"
                    onChange={handleStudentChange}
                    options={students.map(student => ({ value: student.username, label: student.name }))}
                />
            </div>

            {selectedStudent && (
                <Card
                    title={selectedStudent}
                    style={{ margin: '24px 0' }}
                >
                    <StudentHome user={selectedStudent} inInstructorHome />
                </Card>
            )}
        </>
    );
};

export default InstructorHome;