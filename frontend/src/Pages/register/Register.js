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
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user">
                                    <div className="form-group row">
                                        <div className="col-sm-4 mb-3 mb-sm-0">
                                            <input
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                type="text"
                                                className="form-control form-control-user"
                                                id="exampleFirstName"
                                                placeholder="User Name"
                                            />
                                        </div>
                                        <div className="col-sm-4 mb-3 mb-sm-0">
                                            <input
                                                value={firstname}
                                                onChange={(e) => setFirstname(e.target.value)}
                                                type="text"
                                                className="form-control form-control-user"
                                                id="exampleFirstName"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                value={lastname}
                                                onChange={(e) => setLastname(e.target.value)}
                                                type="text"
                                                className="form-control form-control-user"
                                                id="exampleLastName"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="email"
                                                className="form-control form-control-user"
                                                id="exampleInputEmail"
                                                placeholder="Email Address"
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                type="text"
                                                className="form-control form-control-user"
                                                id="examplePhoneNumber"
                                                placeholder="Phone Number"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            className="form-control form-control-user"
                                            id="exampleInputPassword"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <a onClick={Submit} className="btn btn-primary btn-user btn-block">
                                        Register Account
                                    </a>
                                    <hr></hr>
                                    <a href="index.html" className="btn btn-google btn-user btn-block">
                                        <i className="fab fa-google fa-fw"></i> Register with Google
                                    </a>
                                    <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                        <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                    </a>
                                </form>
                                <hr></hr>
                                <div className="text-center">
                                    <a className="small" href="forgot-password.html">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="text-center">
                                    <a className="small" href="/login">
                                        Already have an account? Login!
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
