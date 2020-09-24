import { combineReducers } from 'redux';
import searchReducer from './SearchReducer';

const allReducers = combineReducers({
    results: searchReducer
})
 
export default allReducers;