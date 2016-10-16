import tokenReducer from "./game";
import { routerReducer } from 'react-router-redux'

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](state[key], action);                
                return nextState;
            },
            {}
        );
    }
};

export default combineReducers({
    tokenReducer,
    routing: routerReducer
});
