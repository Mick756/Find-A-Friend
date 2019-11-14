import React, {useState} from 'react';
import {Button} from 'reactstrap';

import '../../../styles/pages/quiz.css';

function QuizAnswerButton(props) {

    const [buttons, setButtons] = useState([]);

    function updateChoice(number) {
        localStorage.setItem(props.question_id, number);
        generateButtons();
    }

    function generateButtons() {

        if (buttons.length) {
            setButtons([]);
        }

        for (let i = 1; i < props.how_many + 1; i++) {
            if (localStorage.getItem(props.question_id) && localStorage.getItem(props.question_id) == i) {
                // Selected
                buttons.push(<Button className="AnswerButton AnswerButtonSelected" id={props.question_id + "-button-" + i}
                                     onClick={() => updateChoice(i)}>{i}</Button>);
            } else {
                buttons.push(<Button className="AnswerButton" id={props.question_id + "-button-" + i}
                                     onClick={() => updateChoice(i)}>{i}</Button>);
            }
        }
    }

    if (!buttons.length) {
        generateButtons();
    }

    return buttons;
}

export default QuizAnswerButton;
