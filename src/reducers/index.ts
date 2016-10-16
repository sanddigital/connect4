//import { combineReducers } from 'redux'
import tokenReducer from "./game";
//import locationReducer from "./location";
import { routerReducer } from 'react-router-redux'

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {

                if(key == "locationReducer")
                    nextState[key] = reducers[key](state["tokenReducer"], action);
                else
                    nextState[key] = reducers[key](state[key], action);
                
                return nextState;
            },
            {}
        );
    }
};

export default combineReducers({
    tokenReducer,
    //locationReducer,
    routing: routerReducer
});
