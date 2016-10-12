import testSaga from "redux-saga-test-plan";
import * as test from "tape";

import {PLACE_TOKEN, gameOver, placeToken} from "actions/game";
import game from "sagas/game";
import {Token} from "store/store";

test("Vertical win", t => {
    const saga = testSaga(game);

    const board = [
        [Token.Red, Token.Red, Token.Red, Token.Red],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
    ];

    saga.next().take(PLACE_TOKEN)
        .next(placeToken(0))
        .next(board).put(gameOver(Token.Red));

    t.end();
});

test("Horizontal win", t => {
    const saga = testSaga(game);

    const board = [
        [Token.Red, Token.Empty, Token.Empty, Token.Empty],
        [Token.Red, Token.Empty, Token.Empty, Token.Empty],
        [Token.Red, Token.Empty, Token.Empty, Token.Empty],
        [Token.Red, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
    ];

    saga.next().take(PLACE_TOKEN)
        .next(placeToken(0))
        .next(board).put(gameOver(Token.Red));

    t.end();
});

test("Diagonal win", t => {
    const saga = testSaga(game);

    const board = [
        [Token.Red, Token.Empty, Token.Empty, Token.Empty],
        [Token.Yellow, Token.Red, Token.Empty, Token.Empty],
        [Token.Red, Token.Red, Token.Red, Token.Empty],
        [Token.Yellow, Token.Yellow, Token.Yellow, Token.Red],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
        [Token.Empty, Token.Empty, Token.Empty, Token.Empty],
    ];

    saga.next().take(PLACE_TOKEN)
        .next(placeToken(0))
        .next(board).put(gameOver(Token.Red));

    t.end();
});
