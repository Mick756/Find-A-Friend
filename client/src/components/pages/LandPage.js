import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

import '../../styles/pages/landpage.css';

function LandPage(props) {

    const [activity, setActivity] = useState(getUserActivity());

    function getCurrentUserScore() {
        if (props.loggedIn) {

            axios.get('/auth/all_users').then(response => {
                response.data.map(user => {
                    if (user.email === props.profileEmail) {
                        let score = 0;
                        if (user.survey) {
                            let questions = JSON.parse(user.survey);
                            for (let i = 0; i < questions.length; i++) {
                                let question = questions[i];
                                score += parseInt(question.score);
                            }
                            localStorage.setItem('score', score.toString());
                        }
                    }
                })

            });

        }
    }

    function getUserActivity() {
        getCurrentUserScore();
        let toRender = [];
        axios.get('/auth/all_users').then(results => {
            for (let j = 0; j < results.data.length; j++) {
                let score = 0;
                let data = results.data[j];
                if (data.email !== props.profileEmail) {
                    if (data.taken_survey) {
                        let questions = JSON.parse(data.survey);
                        for (let i = 0; i < questions.length; i++) {
                            let question = questions[i];
                            score += parseInt(question.score);
                        }
                        toRender.push(
                            <div className="ActivityContainer">
                                <p className="ActivityName">{results.data[j].name}<br/></p>
                                <p>{results.data[j].email}<br/></p>
                                {
                                    props.loggedIn ?
                                        <p>Similarity Score: { Math.round(100 * Math.abs( (score - parseInt(localStorage.getItem('score'))) / ( (score+parseInt(localStorage.getItem('score'))/2 ))))}%</p>
                                        :
                                        <p>Similarity Score: Log in to View</p>

                                }

                            </div>
                        );
                    } else {
                        toRender.push(
                            <div className="ActivityContainer">
                                <p className="ActivityName">{results.data[j].name}<br/></p>
                                <p>{results.data[j].email}</p>
                            </div>
                        );
                    }
                }
            }
            setActivity(toRender);
        });
    }

    return (
        <div>
            <div className="NewsContainer">
                <h1 className="Align-Center">Welcome to Find-A-Friend</h1>

                <p className="Align-Center">Friendships are important and it is necessary to give people the ability to make friends in this growing age through technology.
                                            <br/>Through the power of Find-A-Friend, connections will be made, conversations will be started, and friendships will be cherished.
                </p>

                <p className="Align-Center">Be brought together with people similar to you through a small quiz.</p>

                <Link to="/quiz"><button className="TakeQuizButton">Click here to take your Quiz!</button></Link>
            </div>
            <div className="NewsContainer">
                <h1 className="Align-Center">Contact Similar Users!</h1>
                {
                    activity
                }
            </div>
        </div>
    );
}

export default LandPage;