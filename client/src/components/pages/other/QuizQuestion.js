import React, {useState} from 'react';
import QuizAnswerButton from "./QuizAnswerButton";

import '../../../styles/pages/quiz.css';

function QuizQuestion(props) {

    return (
        <div className="QuestionQuestionContainer">
            <p className="QuizQuestion">{props.question}</p>
                <QuizAnswerButton how_many={10} question_id={props.question_id} />
        </div>
    );
}

export default QuizQuestion;
