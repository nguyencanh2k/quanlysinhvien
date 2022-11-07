import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

function User() {
    const [users, setUsers] = useState([]);

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
            name: 'Gender',
            selector: (row) => row.gender,
            sortable: true,
        },
        {
            name: 'Active',
            selector: (row) => row.active,
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
            name: 'Password',
            selector: (row) => row.password,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className="m-2">
                    <Link to={`/view-user/${row.id}`} className="btn btn-primary btn-sm">
                        View
                    </Link>
                    <Link to={`/edit-user/${row.id}`} className="btn btn-success btn-sm">
                        Edit
                    </Link>
                    <Link onClick={() => deleteUser(row.id)} className="btn btn-danger btn-sm">
                        Delete
                    </Link>
                </div>
            ),
        },
    ];

    const loadUsers = () => {
        axios
            .get('http://127.0.0.1:8000/api/user')
            .then((res) => {
                setUsers(res.data.reverse());
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        loadUsers();
    }, []);

    function deleteUser(id) {
        axios
            .delete(`http://127.0.0.1:8000/api/user/${id}`)
            .then(loadUsers())
            .catch((error) => console.log(error));
    }
    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Tables</h1>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">User</h6>
                    <hr></hr>
                    <Link to="/add-user" className="btn btn-info">
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
                                    <th>Pass</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Pass</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>
                                            <Link to={`/view-user/${user.id}`} className="btn btn primary">
                                                View
                                            </Link>
                                            <Link to={`/edit-user/${user.id}`} className="btn btn primary">
                                                Edit
                                            </Link>
                                            <button onClick={() => deleteUser(user.id)} className="btn btn primary">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}
                        <DataTable columns={columns} data={users} pagination />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
