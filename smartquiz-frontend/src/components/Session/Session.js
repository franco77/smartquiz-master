import React, { Fragment, Component } from 'react';
import './Session.css';
import magnet from '../../assets/img/magnet.svg';

import Correct from './Correct';
import Complete from './Complete';
import Wrong from './Wrong';

import 'tachyons';

const initialSessionState = {
    questionBank: [],
    current_question: {},
    sessionState: 'start',
    answers: []
}

const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const b64DecodeUnicode = (str) => {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

class Session extends Component {
    constructor(props) {
        super()
        this.state = initialSessionState;
    }  
    
    componentDidMount() {
        const category = this.props.appState.questions.active_category.id;
        const amount = this.props.appState.questions.count.active;

        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=easy&type=multiple&encode=base64`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.loadQuestionBank(data.results)
            })
            .catch(console.log);
    }

    loadQuestionBank = (questionsData) => {
        this.setState({ questionBank: questionsData });
        console.log("Loaded questionBank", this.state.questionBank)
        this.loadNewQuestion()
    }

    loadNewQuestion = () => {
        const questionsData = this.state.questionBank;
        const newQuestion = questionsData.shift()
        if (newQuestion) {
            const answers = this.jumbleAnswersList(newQuestion)
            this.setState({ current_question: newQuestion, sessionState: 'active', answers:  answers})
            console.log(this.state);
        }
        else {
            this.setState({ sessionState: 'completed' })
        }

    }

    jumbleAnswersList = (questionData) => {
        console.log(questionData)
        let answerArr = [].concat(questionData.incorrect_answers);
        answerArr.push(questionData.correct_answer);
        return shuffleArray(answerArr); 
    }

    onSelectAnswer = (event) => {
        const chosenAns = event.target.getAttribute("name")
        console.log("User chose this:", chosenAns, this.props.appState)

        let q = this.props.appState.session.stats.questions;
        let a = this.props.appState.session.stats.correct;
        if (chosenAns === this.state.current_question.correct_answer) {
            console.log("Well Done, you chose the right answer");
            this.setState({ sessionState: 'correct_answer'})            
            this.setState(Object.assign(this.props.appState.session.stats, { questions: q + 1, correct: a + 1}))
            console.log(this.props.appState);
        } else {
            console.log("You chose the wrong answer. Hard Luck")
            
            this.setState({ sessionState: 'incorrect_answer'})            
            this.setState(Object.assign(this.props.appState.session.stats, { questions: q + 1, correct: a}))
            console.log(this.props.appState);
        }
    }

    onNextQuestion = () => {
        console.log("Moving on and loading new question")
        this.loadNewQuestion()
    }

    

    render() {
        const { current_question, answers } = this.state;
        const answerDivs = answers.map((answer,index) => {
            return(
                <div key={index} name={answer} className="session-answer bg-light-gray mh3 mv4 pa3 pointer grow shadow-5 f4" onClick={this.onSelectAnswer}> {b64DecodeUnicode(answer)} </div>
            )
        })

        return (
            <Fragment>
            {
                (this.state.sessionState === "active") ?
                <Fragment>
                    <div className="pa3 center flex-column">
                        <div className="f3"> {` ${b64DecodeUnicode(current_question.question)}`}</div>

                        <div className="answer-container dark-gray pa2 mv2">
                            {answerDivs}
                        </div> 
                    </div>
                </Fragment> : 

                (this.state.sessionState === "correct_answer") ? <Correct onNextQuestion={this.onNextQuestion} /> : 

                (this.state.sessionState === "incorrect_answer") ? <Wrong onNextQuestion={this.onNextQuestion} /> :

                (this.state.sessionState === 'completed') ? <Complete appState={this.props.appState} onFinishGame={this.props.backToHome} /> :

                <img className="load-logo" src={magnet} height="80px" width="80px" alt="QuizMaster" />
            }
            </Fragment>                
        )
    }
}


export default Session;