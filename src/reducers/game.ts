import * as _ from "lodash";

import {GAME_OVER, GameAction, NEW_GAME, PLACE_TOKEN} from "actions/game";
import {Store, Token} from "store/store";

const initialState = <Store> {
    gameBoard: [
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
    ],
    turn: Token.Yellow,
    winner: null,
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
            return Object.assign({}, state, { gameBoard, turn });
        default:
            return state;
    }
}
