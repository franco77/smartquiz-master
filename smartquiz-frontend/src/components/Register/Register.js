import React, { Component } from 'react';
import '../../global';
import './Register.css';

import 'tachyons';

class Register extends Component {
    constructor(props){
        super()
        this.state = {
            registerName: "",
            registerEmail: "",
            registerPassword: ""
        }

    }

    onRegisterNameChange=(event) => {
        this.setState({
            registerName: event.target.value
        })
    }

    onRegisterEmailChange=(event) => {
        this.setState({
            registerEmail: event.target.value
        })
    }

    onRegisterPasswordChange=(event) => {
        this.setState({
            registerPassword: event.target.value
        })
    }

    onSubmitRegister=() => {
        const { registerName, registerEmail, registerPassword } = this.state;

        fetch(global.API_URL + 'register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: registerName,
                email: registerEmail,
                password: registerPassword
            })
        })
        .then(res =>  res.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
        }).catch(err => console.log("Error while Registering", err))
    }


    render() {

        const { onRouteChange } = this.props;

        return (
            <main className="pa4 black-80 bg-light-gray mv5 flex flex-column">
                    <fieldset id="registerForm" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 tl" htmlFor="name">Name</label>
                            <input onChange={this.onRegisterNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="registerName" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 tl" htmlFor="email-address">Email</label>
                            <input onChange={this.onRegisterEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="registerEmail" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 tl" htmlFor="password">Password</label>
                            <input onChange={this.onRegisterPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="registerPassword" />
                        </div>
                    </fieldset>
                    <div className="center">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                            type="submit"
                            value="Register"
                            onClick={this.onSubmitRegister} />
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0" className="f6 link black db underline" onClick={() => onRouteChange('login')}> Back to Sign In</a>
                    </div>
            </main>

        )
    }

}

export default Register;