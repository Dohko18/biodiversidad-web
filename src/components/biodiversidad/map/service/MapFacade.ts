
import {MapConfig, mapService} from './MapService';
import {MapInfo} from "../model";
import maplibregl from "maplibre-gl";

class MapFacade {

    init(config: MapConfig): maplibregl.Map{
        return mapService.initialize(config);
    }

    getInfo(): MapInfo | null {
        return mapService.getMapInfo();
    }

    destroy(): void {
        mapService.destroy()
    }

}

export const mapFacade = new MapFacade();