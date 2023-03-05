import React, { useContext, useState } from "react";
import "../../stylesheets/SignUp.css"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserDataProvider";

const API = "https://charity-users-db.vercel.app/users"

function SignUp({users,setUsers}){

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [rPassword,setRPassword] = useState('');

    const navigate = useNavigate();
    const [user,setUser,API] = useContext(UserContext)

    const input = {email:email,username:username,password:password,name:name}
    // const newId = users[users.length-1]?.id+1;

    // const newUser = {
    //     username:username,
    //     password:password
    // }

    function cancelClicked(){
        navigate("/login");
    }

    function signClicked(e){
        e.preventDefault();
        if(password!==rPassword){
            alert('Confirm password inputs!')
        }
        else{
            // navigate('/login')
            fetch(`${API}/auth/register`,{
                method:'POST',
                body:JSON.stringify(input)
            })
            .then(resp=>resp.json())
            .then(data=>{
                if (data.data.message){
                    window.alert(data.data.message)
                }
                else{
                    window.alert("New User Created")
                    navigate('/login')
                }
            })
        }
    }

    return(
        <form onSubmit={(e)=>signClicked(e)} style={{border:"1px solid #ccc"}}>
            <div className="container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>

                <label htmlFor="name"><b>Full Name</b></label>
                <input
                onChange={(e)=>setName(e.target.value)}
                value={name}
                type="text" placeholder="Enter Full Name" name="name" required/>

                <label htmlFor="email"><b>Email</b></label>
                <input
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                type="text" placeholder="Enter Email" name="email" required/>

                <label htmlFor="username"><b>Username</b></label>
                <input
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
                type="text" placeholder="Enter Username" name="username" required/>

                <label htmlFor="psw"><b>Password</b></label>
                <input
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                type="password" placeholder="Enter Password" name="psw" required/>

                <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                <input
                onChange={(e)=>setRPassword(e.target.value)}
                value={rPassword}
                type="password" placeholder="Repeat Password" name="psw-repeat" required/>

                {/* <label>
                <input type="checkbox" checked="checked" name="remember" style={{marginBottom:"15px"}}/> Remember me
                </label>

                <p>By creating an account you agree to our <a href="#" style={{color:"dodgerblue"}}>Terms & Privacy</a>.</p> */}

                <div className="clearfix">
                <button type="button" className=".log-cancelbtn" onClick={cancelClicked} >Cancel</button>
                <button type="submit" className=".log-signupbtn">Sign Up</button>
                </div>
            </div>
        </form>
    )
}

export default SignUp;