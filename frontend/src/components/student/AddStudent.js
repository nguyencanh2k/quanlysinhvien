import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStudent() {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('0');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [identification, setIdentification] = useState('');
    const [school_id, setSchoolID] = useState('');
    const data = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        address: address,
        phone: phone,
        email: email,
        identification: identification,
        school_id: school_id,
    };

    const navigate = useNavigate();

    function Submit(e) {
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/api/student', data)
            .then((res) => {
                toast.success('Add success!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                navigate(`/view-student/${res.data.student.id}`);
            })
            .catch((error) => {
                toast.error('Add error!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                console.log(error);
            });
    }

    return (
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">Forms/</span> Add student
            </h4>

            <div className="row">
                <div className="col-xl">
                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Add student</h5>
                            <small className="text-muted float-end">Default label</small>
                        </div>
                        <div className="card-body">
                            <form className="add-student-form" onSubmit={Submit}>
                                <div className="mb-3">
                                    <label className="form-label">User Name</label>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="firstname"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="lastname"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Gender</label>
                                    <div className="form-check">
                                        <input
                                            onClick={(e) => setGender(e.target.value)}
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            value="0"
                                            id="defaultRadio1"
                                            defaultChecked
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="defaultRadio1">
                                            {' '}
                                            Male{' '}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            onClick={(e) => setGender(e.target.value)}
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            value="1"
                                            id="defaultRadio2"
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="defaultRadio2">
                                            {' '}
                                            Female{' '}
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder=""
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        placeholder=""
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <div className="input-group input-group-merge">
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="text"
                                            id="email"
                                            className="form-control"
                                            placeholder="john.doe"
                                            aria-label="john.doe"
                                            aria-describedby="basic-default-email2"
                                            required
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
                                        value={identification}
                                        onChange={(e) => setIdentification(e.target.value)}
                                        id="identification"
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlSelect1" className="form-label">
                                        School
                                    </label>
                                    <select
                                        value={school_id}
                                        onChange={(e) => setSchoolID(e.target.value)}
                                        className="form-control"
                                        id="school"
                                        aria-label="Default select example"
                                        required
                                    >
                                        <option value="" disabled>
                                            Open this select menu
                                        </option>
                                        <option value="1">ThuyLoi University</option>
                                        <option value="2">HaNoi University</option>
                                        <option value="3">NEU</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    // onClick={Submit}
                                    className="btn btn-primary btn-update"
                                    id="create"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStudent;
