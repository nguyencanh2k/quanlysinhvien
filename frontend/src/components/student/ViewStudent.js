import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function ViewStudent() {
    const { id } = useParams();
    const [student, setStudent] = useState([]);
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/student/${id}`)
            .then((res) => {
                setStudent(res.data.student);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Forms/</span> Edit student
            </h4>
            <div className="row">
                <div className="col-xl">
                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">View student</h5>
                            <small className="text-muted float-end">Default label</small>
                        </div>
                        <div className="card-body">
                            <form className="add-student-form">
                                <div className="mb-3">
                                    <label className="form-label">User Name</label>
                                    <input
                                        value={student.username}
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
                                        value={student.firstname}
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
                                        value={student.lastname}
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
                                            name="gender"
                                            className="form-check-input"
                                            value="0"
                                            type="radio"
                                            checked={student.gender == '0'}
                                        />
                                        <label className="form-check-label" htmlFor="defaultRadio1">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            name="gender"
                                            className="form-check-input"
                                            value="1"
                                            type="radio"
                                            checked={student.gender == '1'}
                                        />
                                        <label className="form-check-label" htmlFor="defaultRadio2">
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input
                                        value={student.address}
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder=""
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        value={student.phone}
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
                                            value={student.email}
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
                                <div className="mb-3">
                                    <label className="form-label">Identification</label>
                                    <input
                                        value={student.identification}
                                        className="form-control"
                                        id="identification"
                                        placeholder=""
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlSelect1" className="form-label">
                                        School
                                    </label>
                                    <select
                                        value={student.school_id}
                                        className="form-control"
                                        id="school"
                                        aria-label="Default select example"
                                        disabled
                                    >
                                        <option value="" disabled>
                                            Open this select menu
                                        </option>
                                        <option value="1">ThuyLoi University</option>
                                        <option value="2">HaNoi University</option>
                                        <option value="3">NEU</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewStudent;
