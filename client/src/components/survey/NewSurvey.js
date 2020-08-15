import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReviewForm from './SurveyReviewForm';

class NewSurvey extends Component {

    //Initializing the state of the Survey and this behavior can be achieved in other ways than construtor as well
    /*constructor(props) {
        super(props);
        this.state = { new: true };
    }*/

    //No need for this.state (= NewSurvey.state), showReviewForm is just an state attribute. given any name
    state = { showReviewForm: false };

    renderContent() {
        if (this.state.showReviewForm) {
            return <SurveyReviewForm onEditBack={()=> this.setState({ showReviewForm: false })} />;
        }

        return <SurveyForm onSurveyFormSubmit={() => { this.setState({ showReviewForm: true }) } } />;
    }

    render() {
        return (

            <div>
                {this.renderContent()}
            </div>
        );
    }
}

//destroyOnUnmounted prop retains the values even we navigates to other pages. so,
// we included the reduxForm of id 'SurveyForm' in here so this redux only happen between NewSurvey.js pages
// i.e SurveyForm and  surveyReviewForm
export default reduxForm({
                        form: 'SurveyForm'
                         })(NewSurvey);