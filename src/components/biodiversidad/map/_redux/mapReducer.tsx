import { createSlice } from "@reduxjs/toolkit";

export interface MapModel {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  mapInfo: {
    center: { lng: number; lat: number } | null;
    zoom: number;
    bearing: number;
    pitch: number;
    isLoaded: boolean;
  } | null;
}

const initialState: MapModel = {
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
  clearMapErrorReducer,
} = mapSlice.actions;

export default mapSlice.reducer;