import React,{ useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../stylesheets/Login.css';
import image from "../../images/download.png"
import { UserContext } from "../UserDataProvider";
// import image from "../../random-acts-kindness-day.png";

function Login({users,setIsLoggedIn,setCurrentUser}){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const [user,setUser,API] = useContext(UserContext)

    const input = {email:email, password:password}

    function loginClicked(e){
        e.preventDefault()
        fetch(`${API}/auth/login`,{
            method:'POST',
            body:JSON.stringify(input)
        })
        .then(resp=>resp.json())
        .then(userData=>{
            setUser(user=>user = userData.data)
            navigate('/')
            console.log(user)
        })
    }

    // const navigate = useNavigate();


    return(
        <form
        className="log-form"
        onSubmit={(e)=>loginClicked(e)}
         method="#">
            <div className="log-imgcontainer">
                <img src={image} alt="Avatar" className="log-avatar"/>
            </div>

            <div className="container login-container bg-body-tertiary">
                <label htmlFor="email"><b>Email</b></label>
                <input
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                type="text" placeholder="Enter Email" name="email" required/>

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
                <Link type="login-button" className="btn cancelbtn mx-auto" to="/signup" >Register?</Link>
                {/* <span className="psw">Forgot <a href="#">password?</a></span> */}
            </div>
        </form>
    )
}

export default Login;