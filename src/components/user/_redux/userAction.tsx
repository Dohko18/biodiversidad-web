import {UserModel} from "../../../core/models/UserModel";

export enum userActionType {
  updateAction = "updateAction",
  findAction = "findAction",
  logoutAction = "logoutAction",
}

export const userUpdateAction = (user: UserModel) => ({
  type: userActionType.updateAction,
  payload: user,
});

export const userFindAction = () => ({
  type: userActionType.findAction,
  payload: null,
});

export const userLogoutAction = () => ({
  type: userActionType.logoutAction,
  payload: null,
});
