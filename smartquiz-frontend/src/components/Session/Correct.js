import React from 'react';
import './Session.css';

import checkImg from '../../assets/img/check.svg';
import 'tachyons';

const Correct = ({ onNextQuestion }) => {
    return (
        <div className="pa3 center flex-column">
            <img src={checkImg} height="90px" width="90px" alt="Correct Answer!" />
            <div className="mv4">Excellent! That was the right answer<br /> </div>
            <div className="pointer dark-gray bg-light-gray ma3 pv3 ph5 grow shadow-5 f4" onClick={onNextQuestion}>Next Question</div>
        </div>
    )
}


export default Correct;