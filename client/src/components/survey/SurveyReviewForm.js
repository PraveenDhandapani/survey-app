import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import surveyFormFields from './surveyFormFields';
import * as action from '../../actions';
import _ from 'lodash';

const SurveyReviewForm = ({ onEditBack, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(surveyFormFields, ({label, name }) => {
        return (
            <div style={{ marginTop: '15px' }} key={name}>
            <label>{label} </label>
            <div> {formValues[name]} </div> 
          </div>
              );
        //you're not accessing formvalues.name, but you're accessing value of name from formValues 
        //formValues.(field.name) => formValues[field.name]
    });

    // submitSurvey is put it as a function to delay the execution after the onClick
    return (
        <div>
            <h5>Please Review your Survey Form Data</h5>
            <div style={{ marginTop: '15px' }}>
                {reviewFields}
            </div>
            <div style={{ marginTop: '15px' }}>
            <button className="red btn-flat left white-text" onClick={onEditBack}>
                Back
            <i className="material-icons right">backspace</i>
            </button>
            <button onClick={() => submitSurvey(formValues, history)} className="green btn-flat right white-text">
                Send Email
            <i className="material-icons right">email</i>
                </button>
            </div>
        </div>
        );
};

function mapStateToProps(state) {
    return { formValues: state.form.SurveyForm.values };
}

// since we connected the formaValues prop value to SurveyReviewForm, it can be accessable as class variable
// Wiring map and actions behavior into the Review component
//withRouter helps us to navigate to the <history object> after the action dispatch completed
export default connect(mapStateToProps, action)(withRouter(SurveyReviewForm));