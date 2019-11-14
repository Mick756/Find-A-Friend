import React, {useState} from 'react';
import QuizQuestion from "./other/QuizQuestion";
import axios from 'axios';

import '../../styles/pages/quiz.css';

function Quiz(props) {

    let questions = [
        {
            question_id: 1,
            question: "I enjoy long walks on the beach more than a movie night."
        },
        {
            question_id: 2,
            question: "If I lost all my technology right now, I would not mind."
        },
        {
            question_id: 3,
            question: "The world needs to do more to stop global warming."
        },
        {
            question_id: 4,
            question: "Religion is very important to me."
        },
        {
            question_id: 5,
            question: "I am not interested in the political status of my country."
        },
        {
            question_id: 6,
            question: "Dogs are better than cats."
        },
        {
            question_id: 7,
            question: "I prefer to use a track-pad over a mouse on a laptop."
        },
        {
            question_id: 8,
            question: "Minecraft is the best video game ever made."
        },
        {
            question_id: 9,
            question: "I try not to be negative around others if I am not feeling well."
        },
        {
            question_id: 10,
            question: "In order to be happy, you have to believe you are."
        }
    ];

    const [error, setError] = useState("");

    async function submitSurvey() {

        let missingQuestions = [];

        for (let i = 1; i < questions.length + 1; i++) {

            if (localStorage.getItem("" + i) && localStorage.getItem("" + i) == -1) {
                missingQuestions.push(i);
            }

        }

        if (missingQuestions.length) {

            setError("You need to answer the questions: " + missingQuestions.join(', '));

            return false;
        } else {

            setError("");

            let survey_object = [];

            for (let i = 0; i < questions.length; i++) {

                let question_obj = {
                    question_id: questions[i].question_id,
                    question: questions[i].question,
                    score: localStorage.getItem(questions[i].question_id)
                };

                survey_object.push(question_obj);

            }

            let response = await axios.post("/auth/complete_survey/" + props.profileEmail, survey_object);

            if (response.data === true) {

                window.location.replace("/");

            }

            return true;
        }

    }

    return (
        <div>
            <p className="QuizTitle">Find-A-Friend Official Quiz</p>
            {props.loggedIn ?
                <div className="Align-Center">

                    <p className="QuizInstructions"> Rate the statements' significance to you on a scale from 1 to 10. 1 being opposite of you and 10 being a great description of you. </p>

                    {questions.map(question => {

                        return (<QuizQuestion question={question.question} question_id={question.question_id}/>);

                    })}

                    {error ? <p>{error}</p> : <p></p>}

                    <button className="SubmitQuizButton" onClick={(e) => {e.preventDefault(); submitSurvey();}}>Submit Survey</button>

                </div>
                :
                <div >You need to be logged in to view and take the survey!</div>
            }

        </div>);
}

export default Quiz;