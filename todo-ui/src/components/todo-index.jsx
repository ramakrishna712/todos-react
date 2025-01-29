import { Link } from "react-router-dom"



export function TodoIndex(){
    return(
        <div className="container-fluid" style={{height:"100vh"}}>
            <h1 className="text-center">Home</h1>
            <h2 className="mt-5 fw-bold  text-center text-white  ">Be Productive ,Be <br/>
            more with Protick</h2>
            <div className="h3 text-center text-light " >
            <p className="">if the diffcult tasks completed first</p>
            <p>reamining seems easy</p>
            </div>
           
            <div className="d-flex justify-content-center align-items-center my-5 ">
                <Link to="/user-register" className="btn btn-warning" >New User Register</Link>
                <Link to="/user-login" className="btn btn-light" >Existing User Login</Link>
            </div>

        </div>
    )
}