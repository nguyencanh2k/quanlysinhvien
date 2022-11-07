import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

function Student() {
    const [students, setStudents] = useState([]);

    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Username',
            selector: (row) => row.username,
            sortable: true,
        },
        {
            name: 'Firstname',
            selector: (row) => row.firstname,
            sortable: true,
        },
        {
            name: 'Lastname',
            selector: (row) => row.lastname,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: (row) => row.gender,
            sortable: true,
        },
        {
            name: 'Identification',
            selector: (row) => row.identification,
            sortable: true,
        },
        {
            name: 'School_ID',
            selector: (row) => row.school_id,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className="m-2">
                    <Link to={`/view-student/${row.id}`} className="btn btn-primary btn-sm">
                        View
                    </Link>
                    <Link to={`/edit-student/${row.id}`} className="btn btn-success btn-sm">
                        Edit
                    </Link>
                    <Link onClick={() => deleteStudent(row.id)} className="btn btn-danger btn-sm">
                        Delete
                    </Link>
                </div>
            ),
        },
    ];

    const loadStudents = async () => {
        await axios
            .get('http://127.0.0.1:8000/api/student')
            .then((res) => {
                setStudents(res.data.reverse());
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
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Tables</h1>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Student</h6>
                    <hr></hr>
                    <Link to="/add-student" className="btn btn-info">
                        Add
                    </Link>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {/* <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>School</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>School</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.id}</td>
                                        <td>{student.username}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.email}</td>
                                        <td>{student.school_id}</td>
                                        <td>
                                            <Link to={`/view-student/${student.id}`} className="btn btn-primary">
                                                View
                                            </Link>
                                            <Link to={`/edit-student/${student.id}`} className="btn btn-success">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteStudent(student.id)}
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}
                        <DataTable columns={columns} data={students} pagination />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;
