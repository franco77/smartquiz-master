import React, { Fragment, Component } from 'react';
import './App.css';

import 'tachyons';
import Sound from 'react-sound';
import homeMusic from './assets/media/home_2.mp3';
import sessionMusic from './assets/media/session.mp3';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Session from './components/Session/Session';
import Profile from './components/Profile/Profile';

const initialState = {
  route: "login",
  music: {
    home: {
      position: 0,
      status: "STOPPED"
    },
    session: {
      position: 0,
      status: "STOPPED"
    }
  },
  userProfile: {
    name: 'Rishab Bakshi',
    email: "rishabbakshi@gmail.com",
    points: 0,
    joined_at: "",
    stats: {
      total_attempts: 0,
      correct_attempts: 0,
      times_played: 0
    }
  },
  questions: {
    active_category: {
      id: 21,
      name: "Sports"
    },
    categories: [
      {
        "id": 9,
        "name": "General Knowledge"
      },
      {
        "id": 11,
        "name": "Movies"
      },
      {
        "id": 17,
        "name": "Science"
      },
      {
        "id": 21,
        "name": "Sports"
      },
      // {
      //   "id": 22,
      //   "name": "Geography"
      // },
      // {
      //   "id": 23,
      //   "name": "History"
      // },
      {
        "id": 26,
        "name": "Celebrities"
      },
    ],
    count: {
      options: [10, 15, 20],
      active: 10
    }
  },
  session: {
    stats: {
      questions: 0,
      correct: 0
    }
  }
}

class App extends Component {
  constructor() {
    super()

    this.state = initialState;
  }

  onRouteChange = (route, params) => {
    if (route === "session") {
      if (params.id) {
        this.setState(Object.assign(this.state.questions.active_category, params));
        console.log(this.state);
      }
      // this.setState(Object.assign(this.state.music.home, { status: "STOPPED" }))
      // this.setState(Object.assign(this.state.music.session, { status: "PLAYING" }))
    }
    if (route === 'signout') {
      this.setState(initialState)
      console.log("Changing route to ", route, this.state)

    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
      // this.setState(Object.assign(this.state.music.home, { status: "PLAYING" }))
      // this.setState(Object.assign(this.state.music.session, { status: "STOPPED" }))
      console.log("Changing route to ", route, this.state)
    }
    else if (route === 'profile') {
      this.fetchUpdateProfile();
    }

    this.setState({ route: route })
  }

  fetchUpdateProfile = () => {
    fetch(global.API_URL + 'profile', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email: this.state.userProfile.email
      })
    })
      .then(res => res.json())
      .then(userProfileData => {
        this.setState(Object.assign(this.state.userProfile.stats,
          {
            total_attempts: userProfileData.total_attempts,
            correct_attempts: userProfileData.correct_attempts,
            times_played: userProfileData.times_played
          }))
      })
      .catch(err => console.log(err));
  }

  updateQuestionCount = (count) => {
    this.setState(Object.assign(this.state.questions.count, { active: count }))
  }

  loadUser = (user) => {
    this.setState(Object.assign(this.state.userProfile, {
      name: user.name,
      email: user.email,
      joined_at: user.joined
    }))
    console.log("Loaded User: ", this.state.userProfile)
  }

  backToHome = () => {
    console.log(this.state.userProfile)
    if (this.state.route != 'profile') {

      fetch(global.API_URL + 'updateStats', {
        method: 'PUT',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email: this.state.userProfile.email,
          total: this.state.session.stats.questions,
          correct: this.state.session.stats.correct
        })
      })
        .then(res => res.json())
        .then(updatedUserData => {
          this.setState(Object.assign(this.state.session,
            {
              stats: {
                questions: 0,
                correct: 0
              }
            })
          )
    })
        .catch(err => console.log(err));

    }
    this.onRouteChange('home')
  }

  render() {

    const { route } = this.state;

    return (
      <div className="App">
        {
          (route === 'home') ?
            <Fragment>
              <Navbar appState={this.state} onGoingBack={this.backToHome} onRouteChange={this.onRouteChange} />
              <Sound
                url={homeMusic}
                playStatus="PLAYING"
                playFromPosition={0}
                loop={true}
                volume={75}
              // onStop={this.onSessionMusicStop}
              // onLoading={this.handleSongLoading}
              // onPlaying={this.handleSongPlaying}
              // onFinishedPlaying={this.handleSongFinishedPlaying}
              />
              <Home appState={this.state} onRouteChange={this.onRouteChange} name={this.state.userProfile.name} updateQuestionCount={this.updateQuestionCount} />
              <Footer />
            </Fragment>
            : (route === 'session') ?
              <Fragment>
                <Navbar appState={this.state} onGoingBack={this.backToHome} onRouteChange={this.onRouteChange} />
                <Sound
                  id="sessionMusic"
                  url={sessionMusic}
                  // playStatus={this.state.music.session.status}
                  playStatus="PLAYING"
                  playFromPosition={0}
                  loop={true}
                  volume={75}
                  onStop={this.onSessionMusicStop}
                />
                <Session appState={this.state} onRouteChange={this.onRouteChange} backToHome={this.backToHome} />
                <Footer />
              </Fragment>

              : (route === "profile") ?
                <Fragment>
                  <Navbar appState={this.state} onGoingBack={this.backToHome} onRouteChange={this.onRouteChange} />
                  <Profile appState={this.state} onRouteChange={this.onRouteChange} />
                  <Footer />
                </Fragment>
                : (route === "register") ? <Register appState={this.state} onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                  : <Login appState={this.state} onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        }
      </div>
    );
  }
}

export default App;
