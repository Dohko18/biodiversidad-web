import React, { useEffect, useRef } from 'react';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { GlobalStore } from 'redux-micro-frontend';
import { mapDestroyAction, mapInitializeAction } from './_redux/mapAction';
import {MapState} from "./model";

interface BasicMapProps {
    center?: [number, number];
    zoom?: number;
    height?: string;
    onMapReady?: () => void;
}

const MapComponent: React.FC<BasicMapProps> = ({
    center = [-74.0, 4.6], // Bogotá por defecto
    zoom = 6,
    height = 'calc(100vh - 90px)',
    onMapReady
}) => {

    const mapContainer = useRef<HTMLDivElement>(null);
    const globalStore = GlobalStore.Get();

    // Selector para el estado del mapa
    const map = useSelector((state: { map: MapState }) => state.map);

    // Effect cuando el mapa se inicializa correctamente
    useEffect(() => {
        if (map.isInitialized && onMapReady) {
            console.log('MapComponent: Mapa listo para usar, ejecutando callback');
            onMapReady();
        }
    }, [map.isInitialized, onMapReady]);

    useEffect(() => {
        
        const shouldInitialize = mapContainer.current && 
                                 !map.isLoading && 
                                 !map.isInitialized;

        if (shouldInitialize) {
            console.log('INICIANDO INICIALIZACIÓN DEL MAPA');

            const action = mapInitializeAction({
                container: mapContainer.current,
                config: {
                    center,
                    zoom
                }
            });

            globalStore.DispatchAction("map", action);
        } 
        return () => {
           if (map.isInitialized || map.isLoading) {
               globalStore.DispatchAction("map", mapDestroyAction());
           }
       };
    },
    [map]);

    return (
        <Box
            sx={{
                position: 'relative',
                height: height,
                width: '100%',
                borderRadius: 1,
                overflow: 'hidden',
                border: '1px solid #ddd',
                backgroundColor: '#f5f5f5'
            }}
        >
            {/* Contenedor del mapa */}
            <div
                ref={mapContainer}
                style={{
                    height: '100%',
                    width: '100%'
                }}
            />

            {/* Overlay de loading */}
            {map.isLoading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        zIndex: 1000
                    }}
                >
                    <CircularProgress size={32} />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Cargando mapa...
                    </Typography>
                </Box>
            )}

            {/* Mensaje de error */}
            {map.error && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        right: 16,
                        zIndex: 1000
                    }}
                >
                    <Alert severity="error" >
                        <strong>Error del mapa:</strong> {map.error}
                    </Alert>
                </Box>
            )}
            {process.env.NODE_ENV === 'development' && map.isInitialized && map.mapInfo && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        padding: 1,
                        borderRadius: 1,
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        zIndex: 1000
                    }}
                >
                    <div>Zoom: {map.mapInfo.zoom?.toFixed(1)}</div>
                    <div>
                        Centro: {map.mapInfo.center?.lng.toFixed(3)}, {map.mapInfo.center?.lat.toFixed(3)}
                    </div>
                    <div>Estado: {map.isInitialized ? 'Inicializado' : 'Cargando'}</div>
                </Box>
            )}
        </Box>
    );
};

export default MapComponent;