import { buildQueries } from "@testing-library/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar({currentUser,isLoggedIn,setIsLoggedIn}){

    const ulClasses = isLoggedIn?'navbar-nav mx-auto mb-2 mb-lg-0 w-50':`navbar-nav mx-auto mb-2 mb-lg-0`;
    const navigate = useNavigate()

    function nameClicked(){
        if(window.confirm('Do you wish to Sign out?')){
            navigate('/');
            setIsLoggedIn(false);
        }
    }

    return(
        <nav className="navbar navbar-expand-lg bg-body-secondary">
                <div className="container-fluid">
                    <Link className="navbar-brand h1" to="/"
                    >TOUCH A LIFE</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className={ulClasses}>
                            <li className="nav-item">
                                <Link className="nav-link mx-5" aria-current="page" to="/finder">CHARITY-FINDER</Link>
                            </li>
                            {isLoggedIn?<li className="nav-item">
                                <Link className="nav-link mx-5" aria-current="page" to="/my-donations   ">MY-DONATIONS</Link>
                            </li>:null}
                        </ul>
                    </div>
                    {isLoggedIn?<input type='button' className="nav-link navbar-brand btn btn-link" onClick={nameClicked} value={currentUser.username} />:<Link className="nav-link navbar-brand" to="/login" >LOGIN</Link>}
                </div>
            </nav>
    )
}

export default Navbar