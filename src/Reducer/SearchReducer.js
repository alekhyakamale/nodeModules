import { SEARCH_FORM, FETCH_SUGGESTIONS, FETCH_SUGGESTIONS_SUCCESS, FETCH_SUGGESTIONS_FAILURE,
    FETCH_RESULTS, FETCH_RESULTS_SUCCESS, FETCH_RESULTS_FAILURE, POST_SEARCH_QUERY,
    POST_SEARCH_QUERY_SUCCESS, POST_SEARCH_QUERY_FAILURE, LOADING } from '../Actions/types';

const initState = { query: '',
                    suggestions: [],
                    results: [],
                    loading: false,
                    }

const SearchReducer = (state = initState, action) => {
    switch(action.type){
        case SEARCH_FORM:
            return{
                ...state,
                query: action.payload,
                loading: false
            };
        case FETCH_SUGGESTIONS:
            return {
                ...state,
                    suggestions: [],
                    error: null,
                    loading: true
            };
        case FETCH_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                    suggestions: action.payload,
                    error: null,
                    loading: false
            };
        case FETCH_SUGGESTIONS_FAILURE:
            let error1 = action.payload || {message: action.payload.message}
            return {
                ...state,
                    suggestions: [],
                    error: error1,
                    loading: false
            };
        case FETCH_RESULTS:
            return {
                ...state,
                    results: [],
                    error: null,
                    loading: true
            };
        case FETCH_RESULTS_SUCCESS:
            return {
                ...state,
                    results: action.payload,
                    error: null,
                    loading: false
            };
        case FETCH_RESULTS_FAILURE:
            let error2 = action.payload || {message: action.payload.message}
            return {
                ...state,
                    results: [],
                    error: error2,
                    loading: false
            };
        case POST_SEARCH_QUERY:
            return{
                ...state,
                    loading: true
            }
        case POST_SEARCH_QUERY_SUCCESS:
            return{
                ...state,
                    query: action.payload,
                    loading: true
            }
        case POST_SEARCH_QUERY_FAILURE:
            let error4 = action.payload || {message: action.payload.message}
            return{
                ...state,
                    error: error4,
                    loading: true
            }
        case LOADING:
            return{
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export default SearchReducer;