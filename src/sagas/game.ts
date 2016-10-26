import * as _ from "lodash";
import { put, select, take } from "redux-saga/effects";

import { PLACE_TOKEN, NEW_GAME, gameOver } from "actions/game";
import { Store, Token } from "store/store";
import { getStore } from "store";

import { browserHistory } from 'react-router'
import { push, LOCATION_CHANGE, go, replace } from "react-router-redux";

function getWinner(gameBoard: Token[][]): Token {

    const rotateBoard = _.zip.apply(_, gameBoard);

    // Match 4 in row
    for (let x = 0; x < rotateBoard.length; x++) {
        for (let y = 0; y < rotateBoard[x].length; y++) {

            let match =
                isWinner(rotateBoard, x, y, 1, 0) || // Horizonatal
                isWinner(rotateBoard, x, y, 0, 1) || // Vertical
                isWinner(rotateBoard, x, y, 1, 1) || // Diagonal top-left > bottom-right
                isWinner(rotateBoard, x, y, 1, -1);  // Diagonal bottom-left > top-right

            if (match)
                return rotateBoard[x][y];
        }
    }

    return null;
}

function isWinner(gameBoard, x, y, stepX, stepY) {
    let startValue = gameBoard[x][y];

    if (startValue === Token.Empty)
        return false;

    for (let i = 1; i < 4; i++) {
        let xPos = gameBoard[x + i * stepX]
        if (!xPos)
            return false;

        if (xPos[y + i * stepY] != startValue)
            return false;
    }

    return true;
}

function isDraw(gameBoard: Token[][]): boolean {
    let movesRemaining = 0;

    for (let x = 0; x < gameBoard.length; x++) {
        for (let y = 0; y < gameBoard[x].length; y++) {

            let cellValue = gameBoard[x][y];
            if (cellValue === 0)
                movesRemaining++;
        }
    }

    return movesRemaining === 0;
}

export const getTokenReducer = (state) => state.tokenReducer;

export default function* game(): any {    
    while (yield take(PLACE_TOKEN)) {

        const tokenReducer = yield select<Store>(getTokenReducer);
        const gameBoard = tokenReducer.gameBoard;
        const turnNumber = tokenReducer.turnNumber;
        const winner = getWinner(gameBoard);        

        if (winner) {
            yield put(gameOver(winner));
            getStore().dispatch(replace("/"));
            break;
        }

        if (isDraw(gameBoard)) {
            yield put(gameOver(Token.Empty));
            getStore().dispatch(replace("/"));
            break;
        }

        getStore().dispatch(push("/" + turnNumber));
    }
}