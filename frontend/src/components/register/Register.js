import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const data = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        password: password,
    };

    const navigate = useNavigate();

    function Submit(e) {
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/api/auth/register', data)
            .then(alert('Register successfully'), navigate('/login'))
            .catch((error) => console.log(error));
    }

    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                    <div className="card">
                        <div className="card-body">
                            <div className="app-brand justify-content-center">
                                <a href="index.html" className="app-brand-link gap-2">
                                    <span className="app-brand-text demo text-body fw-bolder">Sneat</span>
                                </a>
                            </div>
                            <h4 className="mb-2">Adventure starts here 🚀</h4>
                            <p className="mb-4">Make your app management easy and fun!</p>

                            <form
                                id="formAuthentication"
                                className="mb-3"
                                action="index.html"
                                method="POST"
                                onSubmit={Submit}
                            >
                                <div className="mb-3">
                                    <label for="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder="Enter your username"
                                        autofocus
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="firstname" className="form-label">
                                        Firstname
                                    </label>
                                    <input
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="firstname"
                                        name="firstname"
                                        placeholder="Enter your firstname"
                                        autofocus
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="lastname" className="form-label">
                                        Lastname
                                    </label>
                                    <input
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="lastname"
                                        name="lastname"
                                        placeholder="Enter your lastname"
                                        autofocus
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="phone" className="form-label">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter your phone"
                                        required
                                    />
                                </div>
                                <div className="mb-3 form-password-toggle">
                                    <label className="form-label" for="password">
                                        Password
                                    </label>
                                    <div className="input-group input-group-merge">
                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                            aria-describedby="password"
                                            required
                                        />
                                        <span className="input-group-text cursor-pointer">
                                            <i className="bx bx-hide"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="terms-conditions"
                                            name="terms"
                                        />
                                        <label className="form-check-label" for="terms-conditions">
                                            I agree to
                                            <a href="javascript:void(0);">privacy policy & terms</a>
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary d-grid w-100">
                                    Sign up
                                </button>
                            </form>

                            <p className="text-center">
                                <span>Already have an account?</span>
                                <a href="/login">
                                    <span>Sign in instead</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
