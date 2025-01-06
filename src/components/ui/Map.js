import React, { useEffect, useRef } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem'
};

const defaultCenter = {
  lat: 51.5074,
  lng: -0.1278
};

let isScriptLoaded = false;
let googleMapsPromise = null;

const loadGoogleMapsScript = () => {
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise((resolve) => {
    if (window.google && window.google.maps) {
      resolve(window.google.maps);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBot6X_4AWynj9PqlntTGdyCAhz8PE_EjY&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = () => {
      resolve(window.google.maps);
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
};

export default function Map({ location = defaultCenter }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const maps = await loadGoogleMapsScript();
        
        if (!mapRef.current) return;

        const center = {
          lat: Number(location.lat),
          lng: Number(location.lng)
        };

        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new maps.Map(mapRef.current, {
            center,
            zoom: 15,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true
          });
        } else {
          mapInstanceRef.current.setCenter(center);
        }

        // Clear existing markers
        if (mapInstanceRef.current._markers) {
          mapInstanceRef.current._markers.forEach(marker => marker.setMap(null));
        }
        mapInstanceRef.current._markers = [];

        // Add new marker
        const marker = new maps.Marker({
          position: center,
          map: mapInstanceRef.current,
          animation: maps.Animation.DROP
        });

        mapInstanceRef.current._markers.push(marker);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current && mapInstanceRef.current._markers) {
        mapInstanceRef.current._markers.forEach(marker => marker.setMap(null));
      }
    };
  }, [location]);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapRef}
        style={containerStyle}
        className="bg-gray-100 rounded-lg"
      >
        {!mapInstanceRef.current && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
              <span className="text-gray-600">Loading map...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
