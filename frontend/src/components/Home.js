import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
    const [students, setStudents] = useState(0);
    const [users, setUsers] = useState(0);

    const loadStudents = async () => {
        await axios
            .get('http://127.0.0.1:8000/api/student')
            .then((res) => {
                setStudents(res.data.students);
            })
            .catch((error) => console.log(error));
    };
    const loadUsers = async () => {
        await axios
            .get('http://127.0.0.1:8000/api/user')
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        loadStudents();
        loadUsers();
    }, []);

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
                <div className="col-lg-12 col-md-4 order-1">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img
                                                src="../assets/img/icons/unicons/chart-success.png"
                                                alt="chart success"
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="dropdown">
                                            <button
                                                className="btn p-0"
                                                type="button"
                                                id="cardOpt3"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                                <a className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="fw-semibold d-block mb-1">Student</span>
                                    <h3 className="card-title mb-2">{students.total}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img
                                                src="../assets/img/icons/unicons/wallet-info.png"
                                                alt="chart success"
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="dropdown">
                                            <button
                                                className="btn p-0"
                                                type="button"
                                                id="cardOpt3"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                                <a className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="fw-semibold d-block mb-1">User</span>
                                    <h3 className="card-title mb-2">{users.total}</h3>
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
