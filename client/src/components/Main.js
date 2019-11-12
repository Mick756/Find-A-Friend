import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import NavBar from "./NavBar";
import Footer from "./Footer";
import LandPage from "./pages/LandPage";
import Friends from "./pages/Friends";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";


import '../styles/pages/home.css';

function Main() {

    return (
        <Router>
            <NavBar/>

            <Switch>
                <Route exact path="/" component={() => {
                    return <LandPage />;
                }}/>
                <Route exact path="/home" component={() => {
                    return <LandPage />;
                }}/>
                <Route exact path="/events" component={() => {
                    return <Events />;
                }}/>
                <Route exact path="/friends" component={() => {
                    return <Friends />;
                }}/>
                <Route exact path="/quiz" component={() => {
                    return <Quiz />;
                }}/>
                <Route exact path="/profile" component={() => {
                    return <Profile />;
                }}/>
            </Switch>

            <Footer/>
        </Router>
    );
}

export default Main;