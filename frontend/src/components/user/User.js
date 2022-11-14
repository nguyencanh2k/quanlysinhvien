import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

function User() {
    const [users, setUsers] = useState([]);
    const [pages, setPages] = useState([]);

    const loadUsers = (pageNumber = 1) => {
        axios
            .get(`http://127.0.0.1:8000/api/user?page=${pageNumber}`)
            .then((res) => {
                setUsers(res.data.data);
                setPages(res.data);
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
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Home /</span> User
            </h4>

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">User</h5>
                    <Link to="/add-user" className="btn btn-info">
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
                                <th>Gender</th>
                                <th>Active</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {users &&
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>{user.gender == 0 ? 'Male' : 'Female'}</td>
                                        <td>{user.active == 0 ? 'No' : 'Yes'}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Link to={`/view-user/${user.id}`} className="btn btn-primary btn-sm">
                                                View
                                            </Link>
                                            <Link to={`/edit-user/${user.id}`} className="btn btn-success btn-sm">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteUser(user.id)}
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
                            onChange={(pageNumber) => loadUsers(pageNumber)}
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

export default User;
