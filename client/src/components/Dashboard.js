import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveysList from './survey/SurveysList';

class Dashboard extends Component {
   
    render() {
        return (
            <div>
                <div> Dashboard </div>
                <SurveysList />
                <div className="fixed-action-btn">
                    <Link to="/newSurvey" className="btn-floating btn-large-blue">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Dashboard;