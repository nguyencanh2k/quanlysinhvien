import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function ViewUser() {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/user/${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Forms/</span> View user
            </h4>

            <div className="row">
                <div className="col-xl">
                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">View user</h5>
                            <small className="text-muted float-end">Default label</small>
                        </div>
                        <div className="card-body">
                            <form className="add-student-form">
                                <div className="mb-3">
                                    <label className="form-label">User Name</label>
                                    <input
                                        value={user.username}
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="John Doe"
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        value={user.firstname}
                                        type="text"
                                        className="form-control"
                                        id="firstname"
                                        placeholder="John Doe"
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        value={user.lastname}
                                        type="text"
                                        className="form-control"
                                        id="lastname"
                                        placeholder="John Doe"
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Gender</label>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            value="0"
                                            id="defaultRadio1"
                                            checked={user.gender == '0'}
                                        />
                                        <label className="form-check-label" htmlFor="defaultRadio1">
                                            {' '}
                                            Male{' '}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            value="1"
                                            id="defaultRadio2"
                                            checked={user.gender == '1'}
                                        />
                                        <label className="form-check-label" htmlFor="defaultRadio2">
                                            {' '}
                                            Female{' '}
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlSelect1" className="form-label">
                                        Active
                                    </label>
                                    <select
                                        value={user.active}
                                        className="form-control"
                                        id="active"
                                        aria-label="Default select example"
                                        disabled
                                    >
                                        <option value="" disabled>
                                            Open this select menu
                                        </option>
                                        <option value="0">Block</option>
                                        <option value="1">Active</option>
                                    </select>
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="exampleFormControlSelect1" className="form-label">
                                        Role
                                    </label>
                                    <select
                                        value={user.role}
                                        className="form-control"
                                        id="role"
                                        aria-label="Default select example"
                                        disabled
                                    >
                                        <option value="" disabled>
                                            Open this select menu
                                        </option>
                                        <option value="Admin">Admin</option>
                                        <option value="QLHT">QLHT</option>
                                    </select>
                                </div> */}
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        value={user.phone}
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        placeholder=""
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <div className="input-group input-group-merge">
                                        <input
                                            value={user.email}
                                            type="text"
                                            id="email"
                                            className="form-control"
                                            placeholder="john.doe"
                                            aria-label="john.doe"
                                            aria-describedby="basic-default-email2"
                                            disabled
                                        />
                                        <span className="input-group-text" id="basic-default-email2">
                                            @example.com
                                        </span>
                                    </div>
                                    <div className="form-text">You can use letters, numbers & periods</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewUser;
