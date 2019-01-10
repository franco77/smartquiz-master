import React, { Fragment } from 'react';
import './Navbar.css';

import backButton from '../../assets/img/back.png';
// import statsImg from '../../assets/img/stats.png';
import logoutImg from '../../assets/img/logout.png';
// import magnet from '../../assets/img/magnet.svg';

import 'tachyons';

const Navbar = ({ appState, onGoingBack, onRouteChange }) => {
    return (
        <nav className="navbar flex flex-row w-100 center ph3">
            {
                (appState.route === "home") ?
                    <Fragment>
                        <div className="mr-auto flex flex-row items-center">
                            <div className="navbar-title mr-auto">Smartquiz</div>
                            {/* <img className="app-logo" src={magnet} height="60px" width="60px" alt="QuizMaster" /> */}
                            {/* <img src={statsImg} height="40px" width="40px" alt="View your Stats" /> */}                            
                            {/* <span className="pl2">Stats</span> */}
                        </div>
                        <div className="ml-auto flex flex-row items-center f4">
                            <span className="pr2" onClick={()=>onRouteChange('signout')}>Logout</span>
                            <img className="pointer" height="40px" width="40px" src={logoutImg} alt="Signout" />
                        </div>
                    </Fragment>

                    :
                    <div className="mr-auto flex flex-row items-center f4">
                        <img className="pointer" height="40px" width="40px" src={backButton} alt="Go Back" onClick={ onGoingBack }/>
                        <span className="ml2">Back</span>
                    </div>
            }
            {/* <div className="ml-auto flex-row flex items-center">
                <img className="ml-auto pointer grow"
                    src={profileImg}
                    height="40px"
                    width="40px"
                    alt="User Profile" />
                <div className="f4 flex-start tl mh2">{appState.userProfile.name}</div>
            </div> */}
        </nav>
    )
}


export default Navbar;