import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('0');
    const [active, setActive] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/user/${id}`)
            .then((res) => {
                setUsername(res.data.username);
                setFirstname(res.data.firstname);
                setLastname(res.data.lastname);
                setGender(res.data.gender);
                setActive(res.data.active);
                setPhone(res.data.phone);
                setEmail(res.data.email);
                setPassword(res.data.password);
            })
            .catch((error) => console.log(error));
    }, []);

    const data = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        active: active,
        phone: phone,
        email: email,
        password: password,
    };

    function UpdateUser(e) {
        e.preventDefault();
        axios
            .put(`http://127.0.0.1:8000/api/user/${id}`, data)
            .then(navigate('/list-user'))
            .catch((error) => console.log(error));
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Home/ Edit user</h1>
            <div className="row">
                <div className="col-xl">
                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Edit User</h5>
                        </div>
                        <div className="card-body">
                            <form className="add-student-form">
                                <div className="mb-3">
                                    <label className="form-label">User Name</label>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="John Doe"
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
                                        value={active}
                                        onChange={(e) => setActive(e.target.value)}
                                        className="form-control"
                                        id="active"
                                        aria-label="Default select example"
                                    >
                                        <option value="" disabled>
                                            Open this select menu
                                        </option>
                                        <option value="1">Active</option>
                                        <option value="2">Block</option>
                                    </select>
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
                                        />
                                        <span className="input-group-text" id="basic-default-email2">
                                            @example.com
                                        </span>
                                    </div>
                                    <div className="form-text">You can use letters, numbers & periods</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        value={password || ''}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="password"
                                        placeholder=""
                                    />
                                </div>
                                <button onClick={UpdateUser} type="submit" className="btn btn-primary btn-update">
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

export default EditUser;
