import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
function Student() {
    const [students, setStudents] = useState([]);
    const [pages, setPages] = useState([]);

    const loadStudents = async (pageNumber = 1) => {
        await axios
            .get(`http://127.0.0.1:8000/api/student?page=${pageNumber}`)
            .then((res) => {
                setStudents(res.data.data);
                setPages(res.data);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        loadStudents();
    }, []);

    function deleteStudent(id) {
        axios
            .delete(`http://127.0.0.1:8000/api/student/${id}`)
            .then(loadStudents())
            .catch((error) => console.log(error));
    }
    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Home /</span> Student
            </h4>

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Student</h5>
                    <Link to="/add-student" className="btn btn-info">
                        Add
                    </Link>
                </div>
                <div className="table-responsive text-nowrap">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th>School</th>
                                <th>Identification</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.id}</td>
                                    <td>{student.username}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.email}</td>
                                    <td>{student.address}</td>
                                    <td>{student.gender == 0 ? 'Male' : 'Female'}</td>
                                    <td>{student.school_id}</td>
                                    <td>{student.identification}</td>
                                    <td>
                                        <Link to={`/view-student/${student.id}`} className="btn btn-primary btn-sm">
                                            View
                                        </Link>
                                        <Link to={`/edit-student/${student.id}`} className="btn btn-success btn-sm">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteStudent(student.id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            activePage={pages.current_page}
                            itemsCountPerPage={pages.per_page}
                            totalItemsCount={pages.total}
                            onChange={(pageNumber) => loadStudents(pageNumber)}
                            itemClass="page-link"
                            linkClass="page-link"
                            firstPageText="First"
                            lastPageText="Last"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;
