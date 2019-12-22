import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router'


import App from './modules/App'
// import About from './modules/About'
// import Repos from './modules/Repos'
// import Repo from './modules/Repo'
import Home from './modules/Home'
import Dishes from './modules/Dishes'
import Menu from './modules/Menu'
import Health from './modules/Health'
import MySpace from './modules/MySpace'
// import Recipe from './modules/Recipe'
// import Menu from './modules/Menu'
// import Nutrition from './modules/Nutrition'
// import Preference from './modules/Preference'


render((
    /*<Router history={browserHistory} forceRefresh={true}>*/
    <Router history={hashHistory} forceRefresh={true}>
        <Route path="/" component={App}>
            {/* add the new route */}
            <IndexRoute component={Home}/>}/>
            <Route path="/Dishes" component={Dishes}/>
            <Route path="/Dishes/:type/:option" component={Dishes}/>
            <Route path="/Menu" component={Menu}/>
            <Route path="/Health" component={Health}/>
            <Route path="/MySpace" component={MySpace}/>
            {/*
            <Route path="/repos" component={Repos}>
                <Route path="/repos/:userName/:repoName" component={Repo}/>
            </Route>
            <Route path="/about" component={About}/>
            <Route path="/Recipe" component={Recipe}/>
            <Route path="/Menu" component={Menu}/>
            <Route path="/Nutrition" component={Nutrition}/>
            <Route path="/Preference" component={Preference}/>*/}
        </Route>
    </Router>
), document.getElementById('app'));
