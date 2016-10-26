import * as _ from "lodash";
import { put, select, take, call } from "redux-saga/effects";

import { PLACE_TOKEN, NEW_GAME, gameOver, tick } from "actions/game";
import { Store, Token } from "store/store";
import { getStore } from "store";

import { browserHistory } from 'react-router'
import { push, LOCATION_CHANGE, go, replace } from "react-router-redux";

export const state = (state) => state;

const delay = timeout => (new Promise(resolve => {
  setTimeout(resolve, timeout)
}))

export const getTokenReducer = (state) => state.tokenReducer;

export default function* timer(): any {    
    while (true) {

        const tokenReducer = yield select<Store>(getTokenReducer);
        const lastMoveTime = tokenReducer.lastMoveTime;
        const timeleft = Math.floor(((Date.now() - lastMoveTime) / 1000));

        yield call(delay, 100);
        yield put(tick(timeleft));
    }
}