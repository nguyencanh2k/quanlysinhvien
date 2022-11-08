import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const data = {
        email: email,
        password: pwd,
    };
    const navigate = useNavigate();

    function Submit(e) {
        e.preventDefault();
        axios
            .post('http://127.0.0.1:8000/api/auth/login', data)
            .then((res) => {
                const token = res.data.access_token;
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        login: true,
                        token: token,
                    }),
                );
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
                // else {
                //     delete axios.defaults.headers.common['Authorization'];
                // }
                navigate('/');
            })
            .catch((error) => console.log(error));
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    id="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                    className="form-control form-control-user"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    onChange={(e) => setPwd(e.target.value)}
                                                    value={pwd}
                                                    className="form-control form-control-user"
                                                    placeholder="Password"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck">
                                                        Remember Me
                                                    </label>
                                                </div>
                                            </div>
                                            <a onClick={Submit} href="#" className="btn btn-primary btn-user btn-block">
                                                Login
                                            </a>
                                            <hr></hr>
                                            <a href="index.html" className="btn btn-google btn-user btn-block">
                                                <i className="fab fa-google fa-fw"></i> Login with Google
                                            </a>
                                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                                <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                            </a>
                                        </form>
                                        <hr></hr>
                                        <div className="text-center">
                                            <a className="small" href="forgot-password.html">
                                                Forgot Password?
                                            </a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small" href="/register">
                                                Create an Account!
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
