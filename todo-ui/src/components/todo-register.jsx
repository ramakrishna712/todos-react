import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function TodoRegister() {
    let navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [errorClass, setErrorClass] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL ;

    const formik = useFormik({
        initialValues: {
            UserId: "",
            UserName: "",
            Password: "",
            Email: "",
            Mobile: ""
        },
        onSubmit: (user) => {
            axios.post(`${apiUrl}/register-user`, user)
                .then(() => {
                    alert("Registered successfully");
                    navigate('/user-login');
                });
        }
    });

    function VerifyUserId(e) {
        axios.get(`${apiUrl}/get-users`)
            .then(response => {
                for (let user of response.data) {
                    if (user.UserId === e.target.value) {
                        setMsg('User ID Taken - Try Another');
                        setErrorClass('text-danger');
                        break;
                    } else {
                        setMsg('User ID Available');
                        setErrorClass('text-success');
                    }
                }
            });
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center p-3" style={{ minHeight: "100vh" }}>
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 bg-light p-4 rounded shadow-lg">
                <form onSubmit={formik.handleSubmit}>
                    <h2 className="text-center mb-4">Register User</h2>
                    <dl>
                        <dt>User ID</dt>
                        <dd>
                            <input
                                onBlur={VerifyUserId}
                                onChange={formik.handleChange}
                                name="UserId"
                                className="form-control"
                                type="text"
                            />
                        </dd>
                        <dd className={errorClass}>{msg}</dd>
                        <dt>User Name</dt>
                        <dd>
                            <input
                                type="text"
                                onChange={formik.handleChange}
                                className="form-control"
                                name="UserName"
                            />
                        </dd>
                        <dt>Password</dt>
                        <dd>
                            <input
                                type="password"
                                onChange={formik.handleChange}
                                className="form-control"
                                name="Password"
                            />
                        </dd>
                        <dt>Email</dt>
                        <dd>
                            <input
                                type="email"
                                className="form-control"
                                name="Email"
                                onChange={formik.handleChange}
                            />
                        </dd>
                        <dt>Mobile</dt>
                        <dd>
                            <input
                                type="text"
                                name="Mobile"
                                className="form-control"
                                onChange={formik.handleChange}
                            />
                        </dd>
                    </dl>
                    <button type="submit" className="w-100 btn btn-dark mt-3">Register</button>
                </form>
                <Link to="/user-login" className="d-block text-center mt-3">Existing User? Login</Link>

            </div>
            <Link to="/" className="btn btn-dark" >back to Home</Link>
        </div>
    );
}
