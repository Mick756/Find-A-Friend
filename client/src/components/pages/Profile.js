import React, {useState} from 'react';
import axios from 'axios';

import '../../styles/pages/profile.css';

function Profile(props) {

    let loggedIn = false;
    const [takenQuiz, setTakenQuiz] = useState(false);
    const [surveys, setSurveys] = useState({});

    if (props.profilePicture && props.profileName && props.profileEmail) {
        loggedIn = true;
    }

    axios.get('/auth/has_taken_quiz/' + props.profileEmail).then(result => {
        setTakenQuiz(result.data.taken);
        if (takenQuiz) {
            setSurveys(JSON.parse(result.data.quiz));
        }
    });

    function renderQuiz() {
        let toRender = [];
        for (let i = 0; i < surveys.length; i++) {
            let question = surveys[i];
            toRender.push(
                <div className="Align-Center">
                    <p className="TakenQuizQuestion">Question: {question.question}</p><br />
                    <p className="TakenQuizScore">Score: {question.score}</p>
                </div>);
        }
        return toRender;
    }

    return (
        <div>
            {
                loggedIn ?
                    <div>
                        <img src={props.profilePicture} className="ProfilePictureLarge" alt="Profile"/>
                        <p className="ProfileNameLarge">{props.profileName}<br/><span
                            className="ProfileEmailLarge">{props.profileEmail}</span></p>
                        {takenQuiz ?
                            <div>
                                <p> </p>
                                {
                                    renderQuiz()
                                }
                            </div>
                            :
                            <div>
                                <p className="ProfileNameLarge">You have not taken the Find-A-Friend Quiz.</p>
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <p className="ProfileNameLarge">You are not logged in.</p>
                    </div>
            }
        </div>
    );
}

export default Profile;