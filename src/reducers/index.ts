import { combineReducers } from 'redux'
import tokenReducer from "./game";
import { routerReducer } from 'react-router-redux'

export default combineReducers({ 
    tokenReducer,
    routing: routerReducer
});
