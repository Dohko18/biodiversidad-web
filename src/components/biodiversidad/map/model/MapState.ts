import {MapInfo} from "./MapInfo";

export interface MapState {
    isInitialized: boolean;
    isLoading: boolean;
    error: string | null;
    mapInfo: MapInfo | null;
}