import * as _ from "lodash";
import {put, select, take} from "redux-saga/effects";

import {PLACE_TOKEN, gameOver} from "actions/game";
import {Store, Token} from "store/store";

function getWinner(gameBoard: Token[][]): Token {
    const verticalWinner = _.chain(gameBoard)
        .filter(g => _.uniq(g).length === 1 && g[0] !== Token.Empty)
        .map(g => g[0])
        .value();

    if (verticalWinner.length) {
        return verticalWinner[0];
    }

    return null;
}

export default function* game(): any {
    while (yield take(PLACE_TOKEN)) {
        const gameBoard = yield select<Store>(s => s.gameBoard);
        const winner = getWinner(gameBoard);
        if (winner) {
            yield put(gameOver(winner));
            break;
        }
    }
}
