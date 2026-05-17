'use client';

import { useState, useCallback } from 'react';
import type { GeoCoordinates } from '@/types';

interface GeolocationState {
  readonly coordinates: GeoCoordinates | null;
  readonly isLoading: boolean;
  readonly error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    isLoading: false,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: 'geolocation_not_supported',
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          isLoading: false,
          error: null,
        });
      },
      (error) => {
        let errorKey: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorKey = 'geolocation_denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorKey = 'geolocation_unavailable';
            break;
          case error.TIMEOUT:
            errorKey = 'geolocation_timeout';
            break;
          default:
            errorKey = 'geolocation_error';
        }
        setState({
          coordinates: null,
          isLoading: false,
          error: errorKey,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  const clearLocation = useCallback(() => {
    setState({
      coordinates: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    requestLocation,
    clearLocation,
  } as const;
}
