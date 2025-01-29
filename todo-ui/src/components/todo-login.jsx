import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function TodoLogin() {
    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    let navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL ;

    const formik = useFormik({
        initialValues: {
            UserId: "",
            Password: ""
        },
        onSubmit: (user) => {
            axios.get(`${apiUrl}/get-users`)
                .then(response => {
                    var userdetail = response.data.find(u => u.UserId === user.UserId);
                    if (userdetail) {
                        if (userdetail.Password === user.Password) {
                            setCookie('userid', user.UserId);
                            navigate('/user-dash');
                        } else {
                            alert("Invalid Password");
                        }
                    } else {
                        alert("Invalid User Id");
                    }
                })
        }
    });

    return (
        <div className="container-fluid  align-items-center justify-content-center align-content-center " style={{ minHeight: "100vh"}}>
            <div className=" d-block col-12 col-sm-8 col-md-6 col-lg-4 p-3  bg-light  rounded " style={{height:"70%"}}>
                <form onSubmit={formik.handleSubmit}>
                    <h3>User Login</h3>
                    <dl>
                        <dt>UserId</dt>
                        <dd><input onChange={formik.handleChange} className="form-control" type="text" name="UserId" /></dd>
                        <dt>Password</dt>
                        <dd><input onChange={formik.handleChange} name="Password" type="password" className="form-control" /></dd>
                    </dl>
                    <button type="submit" className="btn btn-dark w-100">Login</button>
                </form>
                <Link to="/user-register">New User? Register</Link>
               
            </div>
            <div className="my-3 text-center ">
            <Link to="/" className="btn btn-sm  btn-dark text-center  " >back to Home</Link>
            </div>
           

        </div>
    );
}
