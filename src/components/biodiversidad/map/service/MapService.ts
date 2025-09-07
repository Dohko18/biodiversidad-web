import maplibregl, {LngLat} from 'maplibre-gl';
import {MapInfo} from "../model/MapInfo";

export interface MapConfig {
    container: HTMLElement;
    center?: [number, number];
    zoom?: number;
}


class MapService {
    private map: maplibregl.Map | null = null;
    private isInitialized = false;

    initialize(config: MapConfig): maplibregl.Map {
        try {
            const defaultConfig = {
                center: [-74.0, 4.6] as [number, number], // Bogotá
                zoom: 6,
                ...config
            };

            console.log('MapService: Creando mapa con configuración:', defaultConfig);

            // Crear el mapa
            this.map = new maplibregl.Map({
                container: defaultConfig.container,
                style: 'https://tiles.openfreemap.org/styles/bright',
                center: defaultConfig.center,
                zoom: defaultConfig.zoom,
            });

            // Agregar controles básicos
            this.map.addControl(new maplibregl.NavigationControl(), 'top-right');
            this.map.addControl(new maplibregl.ScaleControl());

            // Event listener para cuando se carga
            this.map.on('load', () => {
                this.isInitialized = true;
                console.log('MapService: Mapa cargado completamente');
            });

            // Event listener para errores
            this.map.on('error', (e) => {
                console.error('MapService: Error en el mapa:', e);
            });

            console.log('MapService: Mapa inicializado correctamente');
            return this.map;

        } catch (error) {
            console.error('MapService: Error al inicializar el mapa:', error);
            throw error;
        }
    }

    isMapInitialized(): boolean {
        return this.isInitialized && this.map !== null;
    }

    getMapInfo(): MapInfo | null {
        if (!this.map) return null;
        return {
            center: this.map.getCenter(),
            zoom: this.map.getZoom(),
            bearing: this.map.getBearing(),
            pitch: this.map.getPitch(),
            isLoaded: this.isInitialized
        };
    }

    destroy(): void {
        if (this.map) {
            console.log('MapService: Destruyendo mapa...');
            this.map.remove();
            this.map = null;
            this.isInitialized = false;
            console.log('MapService: Mapa destruido completamente');
        }
    }
}

export const mapService = new MapService();
export default MapService;