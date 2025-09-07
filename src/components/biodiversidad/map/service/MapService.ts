import maplibregl from 'maplibre-gl';

export interface MapConfig {
    container: HTMLElement;
    center?: [number, number];
    zoom?: number;
}

class MapService {
    private map: maplibregl.Map | null = null;
    private isInitialized = false;

    /**
     * Inicializa el mapa
     */
    initialize(config: MapConfig): maplibregl.Map {
        // Si ya existe un mapa, destruirlo primero
        try {
            // Configuración por defecto para Colombia
            const defaultConfig = {
                center: [-74.0, 4.6] as [number, number], // Bogotá
                zoom: 6,
                ...config
            };

            console.log('MapService: Creando mapa con configuración:', defaultConfig);

            // Crear el mapa
            this.map = new maplibregl.Map({
                container: defaultConfig.container,
                style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
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

    /**
     * Verifica si el mapa está inicializado
     */
    isMapInitialized(): boolean {
        return this.isInitialized && this.map !== null;
    }

    /**
     * Obtiene información básica del mapa
     */
    getMapInfo() {
        if (!this.map) return null;

        return {
            center: this.map.getCenter(),
            zoom: this.map.getZoom(),
            bearing: this.map.getBearing(),
            pitch: this.map.getPitch(),
            isLoaded: this.isInitialized
        };
    }

    /**
     * Destruye el mapa y limpia recursos
     */
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

// Instancia singleton
export const mapService = new MapService();
export default MapService;