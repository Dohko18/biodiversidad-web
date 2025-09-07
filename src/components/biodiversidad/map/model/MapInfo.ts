import {LngLat} from "maplibre-gl";

export interface MapInfo {
    center: { lng: number; lat: number } | null;
    zoom: number;
    bearing: number;
    pitch: number;
    isLoaded: boolean;
};