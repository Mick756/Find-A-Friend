import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import GoogleLogin from "react-google-login";

import Data from "../util/Data";

import '../styles/navbar.css';

function NavBar() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [profileName, setProfileName] = useState("");

    if (localStorage.getItem('token') !== null) {
        axios.post('/auth/google_token', {token: localStorage.getItem('token')}).then(response => {
            if (response.data === false) {
                setLoggedIn(false);
                localStorage.removeItem('token');
            } else {
                setLoggedIn(true);
                setProfilePictureUrl(response.data.response.picture);
                setProfileName(response.data.response.email);
            }
        }).catch(error => {});
    }

    const responseGoogle = async (response) => {
        let token = response.tokenObj.id_token;
        localStorage.setItem('token', token);
        setLoggedIn(true);

        let user = await axios.get("/auth/add/user/" + token);
        console.log(user);

    };

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    return (
        <div>
            <nav className="NavBar">

                <div className="Title">Find-A-Friend</div>
                <Link to="/home" style={{float: "left"}}><button className="NavLink">Home</button></Link>
                <Link to="/events" style={{float: "left"}}><button className="NavLink">Events</button></Link>
                <Link to="/friends" style={{float: "left"}}><button className="NavLink">Friends</button></Link>

                {loggedIn ?

                    <div>
                        <div className="AccountContainer">
                            <button className="LogoutButton" onClick={logout}>Logout</button>
                            <div className="ProfileName">{profileName}</div>
                            <Link to="/profile"><img src={profilePictureUrl} className="ProfilePicture" alt="Profile"/></Link>
                        </div>
                    </div>

                    :

                    <div className="LoginButtonContainer">
                        <GoogleLogin
                            clientId="1066775516443-ir1ln4htkr7up216i8ktko452s3p0vb8.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            theme="dark"
                        />
                    </div>

                }
            </nav>
        </div>
    );
}

export default NavBar;