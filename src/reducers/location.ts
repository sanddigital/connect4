import { Store, Token } from "store/store";
import { LOCATION_CHANGE } from 'react-router-redux';
import { initialState } from './game';

export default function locationReducer(state: Store = initialState, action): Store {
    switch (action.type) {
        case LOCATION_CHANGE:            

            // Get current
            let gameBoard = _.clone(state.gameBoard);
            let turn = state.turn === Token.Yellow ? Token.Red : Token.Yellow;
            let turnNumber = state.turnNumber;
            let history = _.clone(state.history);

            if(!history)
                return Object.assign({}, state, { });

            // Attmept to get the move number from history and restore it's state
            const pathName = <string>action.payload.pathname;
            var moveNumber = parseInt(pathName.substring(1));
            if (moveNumber) {
                let historyItem = history.find(a => a.id === moveNumber);
                if(historyItem){
                    gameBoard = historyItem.gameBoard;
                    turn = historyItem.turn;
                    turnNumber = historyItem.id;
                }
            }

            return Object.assign({}, state, { gameBoard, turn, turnNumber });
        default:
            return state;
    }
}
