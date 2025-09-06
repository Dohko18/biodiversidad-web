import {createSlice} from "@reduxjs/toolkit";
import {UserModel} from "../../../core/models/UserModel";
import {ResultModel} from "../../../core/redux/resultModel";

export interface UserStateModel {
  user: UserModel | null;
  selectedCase: any,
  result: ResultModel;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: "",
      mode: "dark",
      roles: new Array<string>()
    },
    result: {},
  } as UserStateModel,
  reducers: {
    updateUserReducer: (state, action) => ({
      ...state,
      result: {
        action: action,
        error: false,
      },
    }),
    updateUserSuccessReducer: (state, action) => ({
      ...state,
      user: {...action.payload},
      result: {
        action: action,
        error: false,
        messageUser: "El usuario se actualizó exitosamente",
      },
    }),
    updateUserErrorReducer: (state, action) => ({
      ...state,
      result: {
        action: action,
        error: true,
        messageInternal: action.payload.message,
        messageUser: "Error al actualizar el usuario",
      },
    }),
    findUserReducer: (state, action) => ({
      ...state,
      result: {
        action: action,
        error: false,
      },
    }),
    findUserSuccessReducer: (state, action) => {
      return ({
        ...state,
        user: {...action.payload},
        result: {
          action: action,
          error: false,
          messageUser: "El usuario se encontró exitosamente",
        },
      });
    },
    findUserErrorReducer: (state, action) => ({
      ...state,
      result: {
        action: action,
        error: true,
        messageInternal: action.payload.message,
        messageUser: "Error al buscar el usuario",
      },
    }),
    logoutUserReducer: (state, action) => ({
      ...state,
      result: {
        action: action,
        error: false,
      },
    }),
    logoutUserSuccessReducer: (state, action) => ({
      ...state,
      user: null,
      result: {
        action: action,
        error: false,
        messageUser: "El usuario cerro sesion exitosamente",
      },
    } as UserStateModel),
    logoutUserErrorReducer: (state, action) => ({
      ...state,
      result: {
        action: action,
        error: true,
        messageInternal: action.payload.message,
        messageUser: "Error al usuario cerrar sesion",
      },
    }),
  },
});

export const {
  updateUserReducer,
  updateUserSuccessReducer,
  updateUserErrorReducer,
  findUserReducer,
  findUserSuccessReducer,
  findUserErrorReducer,
  logoutUserReducer,
  logoutUserSuccessReducer,
  logoutUserErrorReducer,
} = userSlice.actions;

export default userSlice.reducer;
