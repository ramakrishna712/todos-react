import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams, Link } from "react-router-dom";

export function ToDoEditAppointment() {
    const [appointment, setAppointment] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state
    const [cookies] = useCookies(['userid']);
    const params = useParams();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const formik = useFormik({
        initialValues: {
            AppointmentId: appointment?.AppointmentId || "",
            Title: appointment?.Title || "",
            Description: appointment?.Description || "",
            Date: appointment?.Date || "",
            UserId: cookies['userid'] || ""
        },
        enableReinitialize: true, // Allow formik to reinitialize with new data
        onSubmit: (task) => {
            axios
                .put(`${apiUrl}/edit-appointment/${params.id}`, task)
                .then(() => {
                    alert("Appointment Modified Successfully...");
                    navigate(`/todo-details/${params.id}`);
                })
                .catch((err) => {
                    console.error("Error updating appointment:", err);
                    alert("Failed to update the appointment.");
                });
        },
    });

    useEffect(() => {
        axios
            .get(`${apiUrl}/get-appointment/${params.id}`)
            .then((response) => {
                setAppointment(response.data); // Set appointment data
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching appointment:", err);
                setError("Failed to load appointment details.");
                setLoading(false);
            });
    }, [params.id, apiUrl]);

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
        <div className="bg-light m-2 p-2">
            <h2>Edit Appointment</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Appointment Id</dt>
                    <dd>
                        <input
                            type="text"
                            name="AppointmentId"
                            onChange={formik.handleChange}
                            value={formik.values.AppointmentId}
                            readOnly
                            className="form-control"
                        />
                    </dd>
                    <dt>Title</dt>
                    <dd>
                        <input
                            type="text"
                            name="Title"
                            onChange={formik.handleChange}
                            value={formik.values.Title}
                            className="form-control"
                        />
                    </dd>
                    <dt>Description</dt>
                    <dd>
                        <textarea
                            name="Description"
                            value={formik.values.Description}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    </dd>
                    <dt>Date</dt>
                    <dd>
                        <input
                            type="date"
                            name="Date"
                            value={formik.values.Date?.split("T")[0]}
                            onChange={formik.handleChange}
                            className="form-control"
                        />
                    </dd>
                </dl>
                <button type="submit" className="btn btn-success">Save</button>
                <Link to={`/todo-details/${params.id}`} className="btn btn-danger ms-2">Cancel</Link>
            </form>
            <Link to="/" className="btn btn-dark mt-2 text-center ">Back to Home</Link>
        </div>
    );
}
