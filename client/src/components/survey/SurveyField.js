import React from 'react';

// const SurveyField = (props) => { instead of props.input to wiring the Field's component properties to SurveyField
//meta gives the metadat of the form
const SurveyField = ({ input, label, meta: { touched, error} }) => {

    return (
        <div>
            <label>
                {label}
            </label>
            <div>
                <input style={{ marginBottom: '5px' }} {...input} />
                <div className="red-text" style={{ marginBottom: '10px' }}>
                    {touched && error} 
                 </div>
            </div>
        </div>
    );
};

//if the firls is checked then then error will display if it has any
//  <input {...input} /> // input holds many property behaviors like onBlur, onChanges are assigned to <input />
export default SurveyField;