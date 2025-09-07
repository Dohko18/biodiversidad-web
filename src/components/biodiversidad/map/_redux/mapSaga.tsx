import { put, takeEvery, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { mapActionType, InitializeMapPayload } from './mapAction';
import {
    initializeMapReducer,
    initializeMapSuccessReducer,
    initializeMapErrorReducer,
    destroyMapReducer
} from './mapReducer';
import {mapFacade} from "../service/MapFacade";

function* initializeMapSaga(action: PayloadAction<InitializeMapPayload>): SagaIterator {
    try {
        console.log('mapSaga: Iniciando inicialización del mapa...');
        
        yield put(initializeMapReducer(action));
        
        const { container, config } = action.payload;
        const mapConfig = {
            container,
            center: config?.center || [-74.0, 4.6] as [number, number],
            zoom: config?.zoom || 6
        };

        const mapInstance = yield call([mapFacade, 'init'], mapConfig);

        if (mapInstance) {
        
            const mapInfo = yield call([mapFacade, 'getInfo']);

            yield put(initializeMapSuccessReducer(mapInfo));

            console.log('mapSaga: Mapa inicializado correctamente');
        }

    } catch (error) {
        console.error('mapSaga: Error inicializando mapa:', error);

        yield put(initializeMapErrorReducer({
            message: error instanceof Error ? error.message : 'Error desconocido'
        }));
    }
}

function* destroyMapSaga(action: PayloadAction<void>): SagaIterator {
    try {
        console.log('mapSaga: Destruyendo mapa...');
        
        yield call([mapFacade, 'destroy']);
        
        yield put(destroyMapReducer(action));
        
        console.log('mapSaga: Mapa destruido correctamente');
    } catch (error) {
        console.error('mapSaga: Error destruyendo mapa:', error);
        yield put(destroyMapReducer(action));
    }
}

export function* map_WatchAsync(): SagaIterator {
    yield takeEvery(mapActionType.initializeAction, initializeMapSaga);
    yield takeEvery(mapActionType.destroyAction, destroyMapSaga);
}