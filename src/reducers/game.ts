import * as _ from "lodash";

import { GAME_OVER, GameAction, NEW_GAME, PLACE_TOKEN } from "actions/game";
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
    turnNumber: 1,
    winner: null,
    history: null
};

export default function tokenReducer(state: Store = initialState, action: GameAction = null): Store {
    switch (action.type) {
        case NEW_GAME:
            return initialState;
        case GAME_OVER:
            return Object.assign({}, state, { winner: action.winner });
        case PLACE_TOKEN:
            const gameBoard = _.clone(state.gameBoard);
            const column = _.clone(gameBoard[action.column]);
            const emptyIndex = _.findIndex(column, c => c === Token.Empty);
            column.splice(emptyIndex, 1, state.turn);
            gameBoard[action.column] = column;
            const turn = state.turn === Token.Yellow ? Token.Red : Token.Yellow;
            const turnNumber = state.turnNumber + 1;
            let history = _.clone(state.history);            

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
        default:
            return state;
    }
}
