import {all, put, takeEvery} from "redux-saga/effects";
import {linearProgressActionType} from "./linearProgressAction";
import {linearProgress_HideReducer, linearProgress_ShowReducer} from "./linearProgressReducer";

export function* linearProgress_ShowSaga(action: any) {
    yield put(linearProgress_ShowReducer(action.payload));
}

export function* linearProgress_HideSaga(action: any) {
    yield put(linearProgress_HideReducer(action.payload));
}

export function* linearProgress_WatchAsync() {
    yield all([
        takeEvery(linearProgressActionType.showAction, linearProgress_ShowSaga),
        takeEvery(linearProgressActionType.hideAction, linearProgress_HideSaga),
    ]);
}
