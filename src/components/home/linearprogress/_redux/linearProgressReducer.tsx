import {createSlice} from "@reduxjs/toolkit";

export interface LinearProgressStateModel {
    showIndex: number;
}

const defaultValue = (): LinearProgressStateModel => ({
    showIndex: 0,
})

const linearProgressReducer = createSlice({
    name: "linearProgress",
    initialState: defaultValue(),
    reducers: {
        linearProgress_ShowReducer: (state, action) => ({
            ...state,
            showIndex: state.showIndex + 1
        }),
        linearProgress_HideReducer: (state, action) => ({
            ...state,
            showIndex: (state.showIndex > 0) ? state.showIndex - 1 : 0
        })
    },
});

export const {
    linearProgress_ShowReducer,
    linearProgress_HideReducer
} = linearProgressReducer.actions;

export default linearProgressReducer.reducer;
