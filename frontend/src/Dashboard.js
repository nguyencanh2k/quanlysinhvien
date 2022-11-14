import { Route, Routes } from 'react-router-dom';
import SideBar from './components/Sidebar';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Student from './components/student/Student';
import AddStudent from './components/student/AddStudent';
import EditStudent from './components/student/EditStudent';
import ViewStudent from './components/student/ViewStudent';
import User from './components/user/User';
import AddUser from './components/user/AddUser';
import EditUser from './components/user/EditUser';
import ViewUser from './components/user/ViewUser';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Dashboard() {
    const data = localStorage.getItem('accessToken');
    const [users, setUsers] = useState([]);
    const loadUsers = () => {
        axios
            .post('http://127.0.0.1:8000/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${data}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        loadUsers();
    }, []);
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <SideBar />
                <div className="layout-page">
                    <Header users={users} />
                    <div className="content-wrapper">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/list-student" element={<Student />} />
                            <Route path="/add-student" element={<AddStudent />} />
                            <Route path="/edit-student/:id" element={<EditStudent />} />
                            <Route path="/view-student/:id" element={<ViewStudent />} />
                            <Route path="/list-user" element={<User />} />
                            <Route path="/add-user" element={<AddUser />} />
                            <Route path="/edit-user/:id" element={<EditUser />} />
                            <Route path="/view-user/:id" element={<ViewUser />} />
                        </Routes>
                        <Footer />
                        <div className="content-backdrop fade"></div>
                    </div>
                </div>
            </div>
            <div className="layout-overlay layout-menu-toggle"></div>
        </div>
    );
}

export default Dashboard;
