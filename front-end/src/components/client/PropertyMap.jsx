import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Navigation } from "lucide-react";

const PropertyMap = ({ ville: city, adresse: address, latitude, longitude }) => {
  const { t } = useTranslation();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  
  // Check if we have valid coordinates
  const hasValidCoordinates = latitude && longitude && 
    !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude));

  useEffect(() => {
    // Only initialize map if we have valid coordinates
    if (hasValidCoordinates && mapRef.current && typeof window !== 'undefined') {
      // Check if google is available
      if (typeof window.google !== 'undefined' && window.google.maps) {
        // If map already exists, just update the position
        if (mapInstance.current) {
          const newCenter = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
          mapInstance.current.setCenter(newCenter);
          // Update marker position if needed
          return;
        }
        
        // Create new map instance
        const mapOptions = {
          center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
          zoom: 15,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        };
        
        mapInstance.current = new window.google.maps.Map(mapRef.current, mapOptions);
        
        // Add marker
        new window.google.maps.Marker({
          position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
          map: mapInstance.current,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#0891b2",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2
          }
        });
      }
    }
    
    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
    };
  }, [latitude, longitude, hasValidCoordinates]);

  if (!hasValidCoordinates) {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center p-8">
          <Navigation className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300 font-semibold mb-2">
            {t('propertyMap.mapUnavailable')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {city && address ? `${city}, ${address}` : t('propertyMap.noCoordinates')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg shadow-inner"
        style={{ minHeight: '400px' }}
      />
      
      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-cyan-600 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">
              {city}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;