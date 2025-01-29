import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie"
import {Link, useNavigate } from "react-router-dom";


export function ToDoAddAppointment(){

    const[cookies,setCookie,removeCookie] = useCookies(['userid'])
    let navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL ;

    const formik = useFormik({
        initialValues : {
            AppointmentId :0,
            Title :"",
            Description:'',
            Date:'',
            UserId:cookies['userid']

        },
        onSubmit:(appointment)=>{
            axios.post(`${apiUrl}/add-appointment`,appointment)
            .then(()=>{
                alert('Appointment Added successfully...');
                navigate('/user-dash')
            })
        }
    })


    return(
        <div>
            <div className=" fw-bold  d-flex bg-light m-2 justify-content-between ">
                <span>Add New Appointment</span>
                <span>{cookies['userid']}</span>
                <button className="btn btn-link">Signout</button>
                </div>
                <div className="bg-light
                 p-2 m-2 col-12 col-sm-8 col-lg-4 justify-content-center " >
                    <form className=" justify-content-center " onSubmit={formik.handleSubmit} style={{maxWidth:"500px"}} >
                        <dl>
                            <dt>Id</dt>
                            <dd><input type="number" onChange={formik.handleChange} name="AppointmentId" className="form-control" /></dd>
                            <dt>Title</dt>
                            <dd><input type="text" onChange={formik.handleChange} name="Title" className="form-control" /></dd>
                            <dt>Description</dt>
                            <dd><input type="text" onChange={formik.handleChange} name="Description" className="form-control" /></dd>
                            <dt>Date</dt>
                            <dd><input type="date" onChange={formik.handleChange}name="Date" className="form-control" /></dd>

                        </dl>
                        <button type="submit" className="btn btn-dark w-100">Add Appointment</button>
                        <Link to='/user-dash' className="btn mt-1 btn-warning w-100" >Cancel</Link>
                    </form>
                </div>
                <Link to="/" className="btn btn-dark" >back to Home</Link>
        </div>
    )
}