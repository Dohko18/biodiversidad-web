import {configureStore} from "@reduxjs/toolkit";
import {GlobalStore} from "redux-micro-frontend";
import createSagaMiddleware from "@redux-saga/core";
import {all, spawn} from "redux-saga/effects";
import userReducer from "../components/user/_redux/userReducer";
import {user_WatchAsync} from "../components/user/_redux/userSaga";
import linearProgressReducer from "../components/home/linearprogress/_redux/linearProgressReducer";
import {linearProgress_WatchAsync} from "../components/home/linearprogress/_redux/linearProgressSaga";
import mapReducer from "../components/biodiversidad/map/_redux/mapReducer";
import {map_WatchAsync} from "../components/biodiversidad/map/_redux/mapSaga";

export const globalStore = GlobalStore.Get();

const sagaMiddleware = createSagaMiddleware();

const localReducer = {
    user: userReducer,
    linearProgress: linearProgressReducer,
    map: mapReducer,
}

const localWatchSaga = [
    user_WatchAsync,
    linearProgress_WatchAsync,
    map_WatchAsync
]

export const store = configureStore({
    reducer: {
        ...localReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: false,
        serializableCheck: false
    }).concat(sagaMiddleware)
})

console.log(store.getState())

globalStore.RegisterStore("mcr_shell_admin", store)

export default function* rootSaga() {
    yield all([
        ...localWatchSaga,
    ].map((item: any) => spawn(item)))
}

sagaMiddleware.run(rootSaga);

([
    ...Object.keys(localReducer),
]).forEach(storeName => globalStore.RegisterStore(storeName, store))
