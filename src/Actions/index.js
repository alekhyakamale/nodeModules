import {SEARCH_FORM, FETCH_SUGGESTIONS, FETCH_SUGGESTIONS_SUCCESS, FETCH_SUGGESTIONS_FAILURE,
        FETCH_RESULTS, FETCH_RESULTS_SUCCESS, FETCH_RESULTS_FAILURE, LOADING} from './types';

import { getSuggestions, getResults } from '../Axios';

export const searchForm = query => dispatch => {
    dispatch({
        type: SEARCH_FORM,
        payload: query
    })
};

export const fetchSuggestions = () => dispatch => {
        dispatch({ type: FETCH_SUGGESTIONS })
    
        const request = getSuggestions();
        
        return request.then(
          response => dispatch(fetchSuggestionsSuccess(response.data)),
          err => dispatch(fetchSuggestionsFailure(err))
        );
      }

export const fetchSuggestionsSuccess = (suggestions) => {
    return {
        type: FETCH_SUGGESTIONS_SUCCESS,
        payload: suggestions
    }  
}

export const fetchSuggestionsFailure = (error) => {
    return {
        type: FETCH_SUGGESTIONS_FAILURE,
        payload: error
    }
}

export const fetchResults = () => dispatch => {
    dispatch({ type: FETCH_RESULTS })

    const request = getResults();
    
    return request
    .then(response => { 
    fetchResultsSuccess(dispatch, response);})
    .catch(error => fetchResultsFailure(dispatch, error));
  }

export const fetchResultsSuccess = (dispatch, response) => {
    dispatch({
        type: FETCH_RESULTS_SUCCESS,
        payload: response.data
    }) 
}

export const fetchResultsFailure = (error) => {
return {
    type: FETCH_RESULTS_FAILURE,
    payload: {"message": error}
}
}

export const setLoading = () => {
    return {
        type: LOADING
    }
}
