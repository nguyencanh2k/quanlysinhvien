import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
    const [students, setStudents] = useState(0);
    const [users, setUsers] = useState(0);

    const loadStudents = async () => {
        await axios
            .get('http://127.0.0.1:8000/api/student')
            .then((res) => {
                setStudents(res.data.reverse());
            })
            .catch((error) => console.log(error));
    };
    const loadUsers = async () => {
        await axios
            .get('http://127.0.0.1:8000/api/user')
            .then((res) => {
                setUsers(res.data.reverse());
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        loadStudents();
        loadUsers();
    }, []);

    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>

            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        User
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{users.length}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Student
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{students.length}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
