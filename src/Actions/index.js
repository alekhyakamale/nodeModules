import {SEARCH_FORM, FETCH_SUGGESTIONS, FETCH_SUGGESTIONS_SUCCESS, FETCH_SUGGESTIONS_FAILURE,
        FETCH_RESULTS, FETCH_RESULTS_SUCCESS, FETCH_RESULTS_FAILURE, LOADING, POST_SEARCH_QUERY,
        POST_SEARCH_QUERY_SUCCESS, POST_SEARCH_QUERY_FAILURE} from './types';

import { getSuggestions, getResults, postSearchRequest } from '../Axios';
import history from '../Components/Layout/history';

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
    
    return request.then(
      response => dispatch(fetchResultsSuccess(response.data)),
      err => dispatch(fetchResultsFailure(err))
    );
  }

export const fetchResultsSuccess = (results) => {
return {
    type: FETCH_RESULTS_SUCCESS, 
    payload: results
}  
}

export const fetchResultsFailure = (error) => {
return {
    type: FETCH_RESULTS_FAILURE,
    payload: {"message": error}
}
}

export const postSearchQuery = (searchQuery) => dispatch => {
    dispatch({ type: POST_SEARCH_QUERY })
    return postSearchRequest(searchQuery)
    .then(response => dispatch(postSearchQuerySuccess(dispatch, response)))
    .catch(error => postSearchQueryFailure(dispatch, error));
}

export const postSearchQuerySuccess = (dispatch, response) => {
    dispatch({
        type: POST_SEARCH_QUERY_SUCCESS,
        payload: response.data
    })
}

export const postSearchQueryFailure = (dispatch, error) => {
    dispatch({
        type: POST_SEARCH_QUERY_FAILURE,
        payload: {"message": error}
    })
}

export const setLoading = () => {
    return {
        type: LOADING
    }
}
