import * as _ from "lodash";

import { GAME_OVER, GameAction, NEW_GAME, PLACE_TOKEN, TICK } from "actions/game";
import { Store, Token } from "store/store";
import { LOCATION_CHANGE } from 'react-router-redux';

import { getStore } from "store";

export const initialState = <Store>{
    gameBoard: [
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
    ],
    turn: Token.Yellow,
    turnNumber: 0,
    winner: null,
    history: null,
    timeLeft: 10,
    lastMoveTime: Date.now()
};

export default function tokenReducer(state: Store = initialState, action): Store {

    // Get current
    let gameBoard = _.clone(state.gameBoard);
    let turn = state.turn === Token.Yellow ? Token.Red : Token.Yellow;
    let turnNumber = state.turnNumber;
    let history = _.clone(state.history);
    let lastMoveTime = _.clone(state.lastMoveTime);
    if(!lastMoveTime)
        lastMoveTime = Date.now();

    switch (action.type) {
        case NEW_GAME:
            return initialState;
        case GAME_OVER:
            return Object.assign({}, state, { winner: action.winner });
        case PLACE_TOKEN:
            
            const column = _.clone(gameBoard[action.column]);
            const emptyIndex = _.findIndex(column, c => c === Token.Empty);
            column.splice(emptyIndex, 1, state.turn);
            gameBoard[action.column] = column;
            
            turnNumber = state.turnNumber + 1;                        

            // Record move history
            const newHistory = { id: turnNumber, gameBoard: gameBoard, turn: turn };

            if (history) {
                const replaceIndex = history.findIndex(a => a.id === newHistory.id);
                if (replaceIndex > -1)
                    history.splice(replaceIndex, history.length - replaceIndex, newHistory);
                else
                    history.push(newHistory);
            }
            else {
                history = [];
                history.push(newHistory);
            }

            // Assign back state
            return Object.assign({}, state, { gameBoard, turn, turnNumber, history });
        case LOCATION_CHANGE:

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
        case TICK:
            const timeLeft = action.timeLeft;
            return Object.assign({}, state, { timeLeft, lastMoveTime });
        default:
            return state;
    }
}
