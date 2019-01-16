import React from 'react';
import './Profile.css';

import 'tachyons';

const Profile = ({ appState }) => {
    const profileImage = `https://robohash.org/${appState.userProfile.name}.png`

    return (
        <div className="profile-container flex flex-column justify-center items-center pa2 tc w-100">

            <div className="f2 profile-image-container mv2">
                <img height="200px" width="200px" src={profileImage} alt={appState.userProfile.name} />
            </div>
            <div className="f2 mv2"> {appState.userProfile.name} </div>
            <div className="f7"> {appState.userProfile.email} </div>

            <div className="stats-container mv4 ph3 w-100">
                {/* <div className="f4">Gam Stats:</div> */}
                <div className="flex flex-row mv2"> Times you've played: <div className="ml-auto">{appState.userProfile.stats.times_played}</div></div>
                <div className="flex flex-row mv2"> Total Questions Attempted: <div className="ml-auto">{appState.userProfile.stats.total_attempts}</div></div>
                <div className="flex flex-row mv2"> Correctly Answered:  <div className="ml-auto">{appState.userProfile.stats.correct_attempts}</div></div>
                <div className="flex flex-row mv2"> Success Percentage:  <div className="ml-auto">{(appState.userProfile.stats.correct_attempts / appState.userProfile.stats.total_attempts * 100).toFixed(2) + "%"}</div></div>
            </div>

        </div>
    )
}


export default Profile;