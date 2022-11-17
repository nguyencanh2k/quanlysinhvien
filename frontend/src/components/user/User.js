import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

function User() {
    const [users, setUsers] = useState([]);
    const [pages, setPages] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [record, setRecord] = useState(null);
    const data = {
        search: searchInput,
        record: record,
    };
    const loadUsers = (pageNumber = 1) => {
        axios
            .get(`http://127.0.0.1:8000/api/user?page=${pageNumber}`, {
                params: data,
            })
            .then((res) => {
                setUsers(res.data.data);
                setPages(res.data);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        loadUsers();
    }, [record]);

    function deleteUser(id) {
        axios
            .delete(`http://127.0.0.1:8000/api/user/${id}`)
            .then(loadUsers())
            .catch((error) => console.log(error));
    }
    function SearchSubmit(e) {
        e.preventDefault();
        loadUsers();
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
                        {/* <div className="input-group input-group-merge p-4 w-25">
                            <select className="form-control" id="role" aria-label="Default select example">
                                <option value="">Open this select menu</option>
                                <option value="0">Admin</option>
                                <option value="1">QLHT</option>
                            </select>
                        </div> */}
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
                                <th>Gender</th>
                                <th>Active</th>
                                {/* <th>Role</th> */}
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
                                        {/* <td>{user.role}</td> */}
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
