import React from 'react';
import {Link} from "react-router-dom";
import GoogleLogin from "react-google-login";

import '../styles/navbar.css';

function NavBar(props) {

    const responseGoogle = async (response) => {
        let token = response.tokenObj.id_token;
        localStorage.setItem('token', token);
        window.location.reload();
    };

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div>
            <nav className="NavBar">

                <div className="Title">Find-A-Friend</div>
                <Link to="/home" style={{float: "left"}}>
                    <button className="NavLink">Home</button>
                </Link>

                {props.loggedIn ?

                    <div>
                        <div className="AccountContainer">
                            <button className="LogoutButton" onClick={logout}>Logout</button>
                            <div className="ProfileName">{props.profileName}</div>
                            <Link to="/profile"><img src={props.profilePicture} className="ProfilePicture" alt="Profile"/></Link>
                        </div>
                    </div>

                    :

                    <div className="LoginButtonContainer">
                        <GoogleLogin
                            clientId="1066775516443-ir1ln4htkr7up216i8ktko452s3p0vb8.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={logout}
                            theme="dark"
                        />
                    </div>

                }
            </nav>
        </div>
    );
}

export default NavBar;