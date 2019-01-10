import React, { Component } from 'react';
import './Login.css';
import magnet from '../../assets/img/magnet.svg';

import 'tachyons';

class Login extends Component {
    constructor(props) {
        super()
        this.state = {
            loginEmail: "",
            loginPassword: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({ loginEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ loginPassword: event.target.value })

    }

    onLogin = (event) => {
        const { loginEmail, loginPassword } = this.state;
        fetch(global.API_URL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }
            })
            .catch(err => console.log("ERROR", err))
    }

    render() {
        const { onRouteChange } = this.props;

        return (
            <main className="pa4 black-80 bg-light-gray">
                <div className="center flex-column">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <img className="app-logo" src={magnet} height="60px" width="60px" alt="QuizMaster" />
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 tl" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 tl" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="center">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                            onClick={this.onLogin} />
                    </div>
                    <div className="lh-copy mt3 f6">
                        New User?
                        <a href="#0" className="link black db pointer" onClick={() => onRouteChange('register')}> <div className="underline">Sign up Here</div></a>
                    </div>
                </div>
            </main>

        )
    }

}

export default Login;