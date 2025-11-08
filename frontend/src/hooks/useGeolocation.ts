import { useState, useEffect } from 'react';

interface GeolocationState {
    loading: boolean;
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number | null;
    longitude: number | null;
    speed: number | null;
    timestamp: number | null;
    error: string | null;
}

interface GeolocationOptions {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
}

/**
 * Custom hook for getting user's geolocation
 */
export function useGeolocation(options: GeolocationOptions = {}) {
    const [state, setState] = useState<GeolocationState>({
        loading: true,
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: null,
        longitude: null,
        speed: null,
        timestamp: null,
        error: null,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: 'Geolocation is not supported by this browser.',
            }));
            return;
        }

        const onSuccess = (position: GeolocationPosition) => {
            setState({
                loading: false,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                speed: position.coords.speed,
                timestamp: position.timestamp,
                error: null,
            });
        };

        const onError = (error: GeolocationPositionError) => {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.message,
            }));
        };

        const watchId = navigator.geolocation.watchPosition(
            onSuccess,
            onError,
            {
                enableHighAccuracy: options.enableHighAccuracy || false,
                timeout: options.timeout || 10000,
                maximumAge: options.maximumAge || 300000, // 5 minutes
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

    return state;
}