import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function ViewStudent() {
    const { id } = useParams();
    const [student, setStudent] = useState();
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/student/${id}`)
            .then((res) => {
                setStudent(res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Cards</h1>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Profile</h6>
                        </div>
                        <div className="card-body">
                            <ul class="list-unstyled">
                                {student && (
                                    <>
                                        <li>Username: {student.username}</li>
                                        <li>Firstname: {student.firstname}</li>
                                        <li>Lastname: {student.lastname}</li>
                                        <li>Phone: {student.phone}</li>
                                        <li>Email: {student.email}</li>
                                        <li>Gender: {student.gender}</li>
                                        <li>Identification: {student.identification}</li>
                                        <li>School: {student.school_id}</li>
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

export default ViewStudent;
