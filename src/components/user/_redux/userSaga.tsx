import {all, put, takeEvery} from "redux-saga/effects";
import {UserService} from "../../../core/services/UserService";
import {
    findUserErrorReducer,
    findUserReducer,
    findUserSuccessReducer,
    logoutUserErrorReducer,
    logoutUserReducer,
    logoutUserSuccessReducer,
    updateUserErrorReducer,
    updateUserReducer,
    updateUserSuccessReducer,
} from "./userReducer";
import {userActionType} from "./userAction";
import {AxiosResponse} from "axios";
import {UserModel} from "../../../core/models/UserModel";

const userService = new UserService();

export function* updateUserSaga(action: any) {
    try {
        yield put(updateUserReducer(action.payload));
        const response: AxiosResponse<UserModel, any> = yield userService.update(
            action.payload.id,
            action.payload
        );
        yield put(updateUserSuccessReducer(response.data));
    } catch (e) {
        yield put(updateUserErrorReducer(e));
    }
}

export function* findUserSaga(action: any) {
    try {
        yield put(findUserReducer(action.payload));
        const response: AxiosResponse<UserModel, any> =
            yield userService.principal();
        yield put(findUserSuccessReducer(response.data));
    } catch (e) {
        yield put(findUserErrorReducer(e));
    }
}

export function* logoutUserSaga(action: any) {
    try {
        yield put(logoutUserReducer(action.payload));
        const response: AxiosResponse<void, any> = yield userService.logout();
        yield put(logoutUserSuccessReducer(response.data));
    } catch (e) {
        yield put(logoutUserErrorReducer(e));
    }
}

export function* user_WatchAsync() {
    yield all([
        takeEvery(userActionType.updateAction, updateUserSaga),
        takeEvery(userActionType.findAction, findUserSaga),
        takeEvery(userActionType.logoutAction, logoutUserSaga),
    ]);
}
