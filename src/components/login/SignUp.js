import React, { useState } from "react";
import "../../stylesheets/SignUp.css"
import { useNavigate } from "react-router-dom";

const API = "https://charity-users-db.vercel.app/users"

function SignUp({users,setUsers}){

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [rPassword,setRPassword] = useState('');

    const navigate = useNavigate();
    const newId = users[users.length-1]?.id+1;

    const newUser = {
        id:newId,
        username:username,
        password:password,
        donations:[]
    }

    function cancelClicked(){
        navigate("/login");
    }

    function signClicked(e){
        e.preventDefault();
        const newUsers = [...users,newUser]
        const userFound = users.find(user=>user.username===username);

        if(userFound){
            alert('Username already exist')
        }
        else if(password!==rPassword){
            alert('Confirm password inputs!')
        }
        else{
            setUsers(newUsers);
            navigate('/login')

            fetch(API,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(newUser)
            })
            .then(resp=>resp.json())
            .then(data=>console.log(data))
        }
    }

    return(
        <form onSubmit={(e)=>signClicked(e)} style={{border:"1px solid #ccc"}}>
            <div className="container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>

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
                <button type="button" className="cancelbtn" onClick={cancelClicked} >Cancel</button>
                <button type="submit" className="signupbtn">Sign Up</button>
                </div>
            </div>
        </form>
    )
}

export default SignUp;