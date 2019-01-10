import React from 'react';
import './Session.css';

import fineImg from '../../assets/img/fine.png';
import 'tachyons';

const Complete = ({ appState, onFinishGame }) => {
    return (
        <div className="pa3 center flex-column">
            <img src={fineImg} height="90px" width="90px" alt="Session Completed!" />
            <div className="mv4"> Congratulations! You have completed all questions in this section!</div>
            <div className="f5">Attempted: {appState.userProfile.stats.questions}</div>
            <div className="f5">Correct: {appState.userProfile.stats.correct}</div>
            <div className="pointer dark-gray bg-light-gray ma3 pv3 ph5 grow shadow-5 f4" onClick={onFinishGame}> Back to Home </div>
        </div>
    )
}


export default Complete;