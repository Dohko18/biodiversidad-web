export enum linearProgressActionType {
    showAction = "linearProgress/showAction",
    hideAction = "linearProgress/hideAction"
}

const linearProgressAction = {
    linearProgress_ShowAction: () => ({
        type: linearProgressActionType.showAction,
    }),
    linearProgress_HideAction: () => ({
        type: linearProgressActionType.hideAction,
    }),
};
