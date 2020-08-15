import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import NewSurvey from './survey/NewSurvey';

import { connect } from 'react-redux';
import * as actions from '../actions';



class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
        
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container" >
                    <Header />
                    <Route exact path='/' component={Landing} />
                    <Route path='/surveys' component={Dashboard} />
                    <Route path='/newSurvey' component={NewSurvey} />
                </div> 
            </BrowserRouter>
        );
    }
};

export default connect(null, actions)(App);