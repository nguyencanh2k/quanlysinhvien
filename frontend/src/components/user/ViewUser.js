import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function ViewUser() {
    const { id } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/user/${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Home/ View user</h1>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Profile</h6>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                {user && (
                                    <>
                                        <li>Username: {user.username}</li>
                                        <li>Firstname: {user.firstname}</li>
                                        <li>Lastname: {user.lastname}</li>
                                        <li>Gender: {user.gender}</li>
                                        <li>Active: {user.active}</li>
                                        <li>Phone: {user.phone}</li>
                                        <li>Email: {user.email}</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewUser;
