import React, { Fragment } from 'react';
import './Home.css';


import 'tachyons';

const Home = ({ appState, onRouteChange, name, updateQuestionCount }) => {

    const categoryDivs = appState.questions.categories.map((category, index) => {
        return (
            <div key={category.id} className="home-category bg-light-gray mh3 mv4 pa3 grow pointer shadow-5 dim f4" onClick={() => { onRouteChange('session', category) }}> {category.name}</div>
        )
    })

    // const questionCountDivs = appState.questions.count.options.map((count, index) => {
    //     return (
    //         <div key={index} className="bg-light-gray pa3 mh3 mv4 grow shadow-5 dim f4 br-100" onClick={() => { updateQuestionCount(count) }}> {count} </div>
    //     )
    // })

    return (
        <Fragment>            
            <div className="category-container dark-gray pa2 mv2">
                {categoryDivs}
            </div>
            {/* <div className="flex flex-row center dark-gray">
                {questionCountDivs}
            </div> */}
            {/* <div className="f5 pv3">{`# OF QUESTIONS: ${appState.questions.count.active}`}</div> */}
        </Fragment>
    )
}


export default Home;