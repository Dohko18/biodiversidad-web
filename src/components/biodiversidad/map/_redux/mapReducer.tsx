import { createSlice } from "@reduxjs/toolkit";
import {MapState} from "../model";

const initialState: MapState = {
  isInitialized: false,
  isLoading: false,
  error: null,
  mapInfo: null
};

const mapSlice = createSlice({
  name: "map",
  initialState: initialState,
  reducers: {
    initializeMapReducer: (state, action) => ({
      ...state,
      isLoading: true,
      error: null,
    }),

    initializeMapSuccessReducer: (state, action) => ({
      ...state,
      isLoading: false,
      isInitialized: true,
      mapInfo: { ...action.payload },
      error: null,
    }),

    initializeMapErrorReducer: (state, action) => ({
      ...state,
      isLoading: false,
      isInitialized: false,
      error: action.payload.message,
    }),
    

    destroyMapReducer: (state, action) => ({
      ...state,
      isInitialized: false,
      isLoading: false,
      error: null,
      mapInfo: null,
    }),

    clearMapErrorReducer: (state, action) => ({
      ...state,
      error: null,
    }),
  },
});

export const {
  initializeMapReducer,
  initializeMapSuccessReducer,
  initializeMapErrorReducer,
  destroyMapReducer,
} = mapSlice.actions;

export default mapSlice.reducer;