export interface InitializeMapPayload {
  container: HTMLElement;
  config?: {
    center?: [number, number];
    zoom?: number;
  };
}

export enum mapActionType {
  initializeAction = "initializeAction",
  destroyAction = "destroyAction",
}


export const mapInitializeAction = (payload: InitializeMapPayload) => ({
  type: mapActionType.initializeAction,
  payload: payload,
});

export const mapDestroyAction = () => ({
  type: mapActionType.destroyAction,
  payload: null,
});

