import React, { Fragment } from 'react';
import './Navbar.css';

import backButton from '../../assets/img/back.png';
import statsImg from '../../assets/img/stats.png';
import logoutImg from '../../assets/img/logout.png';
import magnet from '../../assets/img/magnet.svg';

import 'tachyons';

const Navbar = ({ appState, onGoingBack, onRouteChange }) => {
    return (
        <nav className="navbar flex flex-row w-100 center ph3 f4">
            {
                (appState.route === "home") ?
                    <Fragment>
                        <div className="navbar-link flex flex-row items-center pointer" onClick={() => onRouteChange('profile')}>
                            <img src={statsImg} height="40px" width="40px" alt="View your Stats" />
                            <span className="pl2">Stats</span>
                        </div>
                        <div className="ml-auto flex flex-row items-center f4 pointer" onClick={() => onRouteChange('signout')}>
                            <span className="pr2">Logout</span>
                            <img className="pointer" height="40px" width="40px" src={logoutImg} alt="Signout" />
                        </div>
                    </Fragment>

                    :
                    <div className="mr-auto flex flex-row items-center f4 pointer" onClick={onGoingBack} >
                        <img height="40px" width="40px" src={backButton} alt="Go Back" />
                        <span className="ml2">Back</span>
                    </div>
            }
        </nav>
    )
}


export default Navbar;