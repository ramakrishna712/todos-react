import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";

export function ToDoUserDashBoard() {
    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    const [appointments, setAppointments] = useState([{ AppointmentId: 0, Title: "", Description: "", Date: "", UserId: "" }]);
    let navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL ;

    function handleSignout() {
        removeCookie('userid');
        navigate("/user-login");
    }

    useEffect(() => {
        axios.get(`${apiUrl}/get-appointments/${cookies['userid']}`)
            .then(response => {
                setAppointments(response.data);
            });
    }, [cookies]);

    return (
        <div className="container-fluid">
            <div className="col-12 bg-light rounded d-flex justify-content-between align-items-center fw-bold p-2 flex-wrap">
                <span>User Dashboard</span>
                <span>Hello! {cookies['userid']}</span>
                <button onClick={handleSignout} className="btn btn-link">Signout</button>
            </div>

            <div className="text-center mt-3">
                <Link to="/add-appointment" className="btn btn-primary fs-5 px-3 my-2">
                    <i className="bi bi-calendar-plus"></i> Add Appointment
                </Link>
            </div>

            <div className="row d-flex justify-content-center align-items-stretch">
                {
                    appointments.map(appointment =>
                        <div key={appointment.AppointmentId} className="col-12 col-md-6 col-lg-3 d-flex">
                            <div className="alert alert-success w-100 m-3 d-flex flex-column justify-content-between" style={{ minHeight: "200px" }}>
                                <div>
                                    <div className="fw-bold fs-5">{appointment.Title}</div>
                                    <div>{appointment.Description}</div>
                                </div>
                                <div className="mt-2">
                                    <Link to={`/todo-details/${appointment.AppointmentId}`} className="btn btn-success w-100">
                                        <i className="bi bi-eye-fill"></i> View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <Link to="/" className="btn btn-dark" >back to Home</Link>
        </div>
    );
}
