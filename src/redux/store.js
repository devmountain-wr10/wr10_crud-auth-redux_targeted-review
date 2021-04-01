import { createStore } from 'redux';
import userReducer from './reducers/userReducer';
import jokesReducer from './reducers/jokesReducer';
import { combineReducers } from 'redux';

// if we have multiple reducers, need to bring in combineReducers
const rootReducer = combineReducers({
    userReducer,
    jokesReducer
})

export default createStore(rootReducer);