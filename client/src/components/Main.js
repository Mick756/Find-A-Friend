import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import NavBar from "./NavBar";
import Footer from "./Footer";
import LandPage from "./pages/LandPage";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";

import '../styles/pages/home.css';
import Data from "../util/Data";
import axios from "axios";

function Main() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [profileEmail, setProfileEmail] = useState("");
    const [profileName, setProfileName] = useState("");

    if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token');
        Data.verifyToken(token).then(data => {
            if (data.data) {

                setProfilePictureUrl(data.data.picture);
                setProfileEmail(data.data.email);
                setProfileName(data.data.name);

                axios.post('/auth/add/user', {token: token});

                setLoggedIn(true);
            }
        });

    }

    for (let i = 1; i < 11; i++) {
        localStorage.setItem(i.toString(), "-1");
    }


    return (
        <Router>
            <NavBar loggedIn={loggedIn} profilePicture={profilePictureUrl} profileName={profileEmail}/>

            <Switch>
                <Route exact path="/" component={() => {
                    return <LandPage loggedIn={loggedIn} profileEmail={profileEmail}/>;
                }}/>
                <Route exact path="/home" component={() => {
                    return <LandPage loggedIn={loggedIn} profileEmail={profileEmail}/>;
                }}/>
                <Route exact path="/quiz" component={() => {
                    return <Quiz loggedIn={loggedIn} profileEmail={profileEmail} />;
                }}/>
                <Route exact path="/profile" component={() => {
                    return <Profile profilePicture={profilePictureUrl} profileName={profileName} profileEmail={profileEmail}/>;
                }}/>
            </Switch>

            <Footer/>
        </Router>
    );
}

export default Main;