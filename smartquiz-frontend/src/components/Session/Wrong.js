import React from 'react';
import './Session.css';

import crossImg from '../../assets/img/cross.svg';
import 'tachyons';

const Wrong = ({ onNextQuestion }) => {
    return (
        <div className="pa3 center flex-column">
            <img src={crossImg} height="80px" width="80px" alt="Incorrect Answer!" />
            <div className="mv4"> Oops! That was the wrong answer <br /> </div>
            <div className="pointer dark-gray bg-light-gray ma3 pv3 ph5 grow shadow-5 f4" onClick={onNextQuestion}>Next Question</div>
        </div>
    )
}


export default Wrong;