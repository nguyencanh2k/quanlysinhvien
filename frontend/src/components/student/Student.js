import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
function Student() {
    const [students, setStudents] = useState([]);
    const [pages, setPages] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('');
    const [record, setRecord] = useState(null);
    const data = {
        search: searchInput,
        searchType: searchType,
        record: record,
    };
    const loadStudents = async (pageNumber = 1) => {
        await axios
            .get(`http://127.0.0.1:8000/api/student?page=${pageNumber}`, {
                params: data,
            })
            .then((res) => {
                setStudents(res.data.data);
                setPages(res.data);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        loadStudents();
    }, [record]);
    function deleteStudent(id) {
        axios
            .delete(`http://127.0.0.1:8000/api/student/${id}`)
            .then(loadStudents())
            .catch((error) => console.log(error));
    }
    function SearchSubmit(e) {
        e.preventDefault();
        loadStudents();
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
                <form>
                    <div className="row m-4">
                        <div className="input-group input-group-merge p-4 w-25">
                            <span className="input-group-text" id="basic-addon-search31">
                                <i className="bx bx-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                aria-label="Search..."
                                aria-describedby="basic-addon-search31"
                                value={searchInput}
                                name="search"
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                        <div className="input-group input-group-merge p-4 w-25">
                            <select
                                className="form-control"
                                id="gender"
                                aria-label="Default select example"
                                name="searchSelect"
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                            >
                                <option value="">Open this select menu</option>
                                <option value="username">Username</option>
                                <option value="phone">Phone</option>
                                <option value="email">Email</option>
                            </select>
                        </div>
                        <div className="p-4 w-25">
                            <button type="submit" onClick={SearchSubmit} className="btn btn-primary btn-update">
                                Send
                            </button>
                        </div>
                        <div className="input-group input-group-merge p-4 w-25">
                            <select
                                className="form-control"
                                id="record"
                                aria-label="Default select example"
                                name="searchSelect"
                                value={record}
                                onChange={(e) => setRecord(e.target.value)}
                            >
                                <option value="5">5</option>
                                <option selected value="10">
                                    10
                                </option>
                                <option value="15">15</option>
                            </select>
                        </div>
                    </div>
                </form>
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
