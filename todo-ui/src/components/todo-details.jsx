import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export function ToDoDetails() {
    const [appointment, setAppointment] = useState(null); // Default to null
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state
    let params = useParams();
    let navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios
            .get(`${apiUrl}/get-appointment/${params.id}`)
            .then((response) => {
                setAppointment(response.data); // Assume response.data is an object
                setLoading(false); // Data successfully loaded
            })
            .catch((err) => {
                console.error("Error fetching appointment:", err);
                setError("Failed to load appointment details.");
                setLoading(false); // Stop loading even on error
            });
    }, [params.id, apiUrl]);

    function handleDeleteClick() {
        const flag = window.confirm("Are you sure you want to delete this appointment?");
        if (flag) {
            axios
                .delete(`${apiUrl}/delete-appointment/${params.id}`)
                .then(() => {
                    alert("Appointment deleted successfully.");
                    navigate(`/user-dash`);
                })
                .catch((error) => {
                    console.error("Error deleting appointment:", error);
                    alert("Failed to delete the appointment.");
                });
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!appointment) {
        return <div>No appointment details found.</div>;
    }

    return (
        <div className="container-fluid justify-content-centera align-content-center align-items-center d-flex flex-column" style={{height:"100vh"}} >
           <div className="col-md-4 col-md-6 col-12 bg-light justify-content-center text-center  border boder-3 p-2  boder-light "style={{height:"60%"}} >
           <h3>Appointment Details</h3>
            <dl>
                <dt>Title</dt>
                <dd>{appointment.Title || "N/A"}</dd>
                <dt>Description</dt>
                <dd>{appointment.Description || "N/A"}</dd>
                <dt>Date</dt>
                <dd>{appointment.Date ? moment(appointment.Date).format("dddd DD MMM yyyy") : "N/A"}</dd>
            </dl>

            <div>
                <button onClick={handleDeleteClick} className="bi bi-trash-fill btn btn-danger text-center">
                    Delete
                </button>
                <Link to={`/todo-edit/${appointment.AppointmentId}`} className="bi bi-pen-fill text-center btn btn-warning ms-2">
                    Edit
                </Link>
            </div>
            <Link to="/user-dash" className="btn btn-secondary my-3 ">
                Back to Appointments
            </Link>
           </div>
           <Link  to="/" className="btn btn-dark mx-2 text-center ">
                Back to Home
            </Link>
        </div>
    );
}
