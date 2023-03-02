import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../stylesheets/Login.css';
import image from "../../images/download.png"
// import image from "../../random-acts-kindness-day.png";

function Login({users,setIsLoggedIn,setCurrentUser}){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");

    // const navigate = useNavigate();


    return(
        <form
        className="log-form"
        // onSubmit={(e)=>loginClicked(e)}
         method="#">
            <div className="log-imgcontainer">
                <img src={image} alt="Avatar" className="log-avatar"/>
            </div>

            <div className="container login-container bg-body-tertiary">
                <label htmlFor="uname"><b>Username</b></label>
                <input
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
                type="text" placeholder="Enter Username" name="uname" required/>

                <label htmlFor="psw"><b>Password</b></label>
                <input
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                type="password" placeholder="Enter Password" name="psw" required/>
                
                <button type="submit">Login</button>
                {/* <label>
                <input type="checkbox" checked="" name="remember"/> Remember me
                </label> */}
            </div>

            <div className="container  d-flex" style={{backgroundColor:"#f1f1f1"}}>
                {/* <Link type="login-button" className="btn cancelbtn mx-auto" to="/signup" >Register?</Link> */}
                {/* <span className="psw">Forgot <a href="#">password?</a></span> */}
            </div>
        </form>
    )
}

export default Login;