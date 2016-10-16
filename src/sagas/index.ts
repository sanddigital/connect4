import { take } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { replace } from "react-router-redux";

import game from "./game";
import { NEW_GAME } from "actions/game";
import { getStore } from '../store';

export default function* root(): any {
    do {
        yield* game();
    } while (yield take(NEW_GAME));
}
