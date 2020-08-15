import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import emailValidator from '../../utils/emailValidator';
import surveyFormFields from './surveyFormFields';
import _ from 'lodash';


class SurveyForm extends Component {

    renderFields() {
        return _.map(surveyFormFields, ({label, name}) =>{ //just accesssing label and name instead of all the Field obj
                    return (
                        <Field key={name} component={SurveyField} type="text" label={label}  name={name} />
                    );
                });
    }

    render() {
        return (

            <div>
                <form onSubmit={this.props.handleSubmit(() => { this.props.onSurveyFormSubmit(); })}>
                    {this.renderFields()}

                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                     <i className="material-icons right">cancel</i>
                    </Link>

                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                     <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.emails = emailValidator(values.surveyFormFields || ''); 

    _.each(surveyFormFields, ({ name, label }) => {
        if (!values[name]) {
            errors[name] = label + ' Field is Mandatory';
        }

        
    });

    return errors;
}

export default reduxForm({
                         validate ,      // = validate: validate
                         form: 'SurveyForm', //redux form identifier in mapStateToProps method in reviewform.js
                         destroyOnUnmount: false // retains the react form prop values
                        })(SurveyForm);