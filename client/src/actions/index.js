import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

//actions for the redux reducers

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/currentUser');

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (survey, history) => async dispatch => {
    const res = await axios.post('/api/survey', survey);
    history.push('/surveys');

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');

    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
