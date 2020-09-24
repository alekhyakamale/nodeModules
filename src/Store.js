import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import allReducers from './Reducer';

const middleware = [thunk];
const initialState = {};

const store = createStore(
    allReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;