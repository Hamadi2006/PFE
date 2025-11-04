import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Navigation } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PropertyMap = ({ ville: city, adresse: address, latitude, longitude }) => {
  const { t } = useTranslation();
  
  // Check if we have valid coordinates
  const hasValidCoordinates = latitude && longitude && 
    !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude));

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  // Custom marker icon
  const customMarker = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

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
    <div className="relative z-10">
      <MapContainer 
        center={[lat, lng]} 
        zoom={15} 
        className="w-full h-96 rounded-lg shadow-inner"
        style={{ minHeight: '400px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng]} icon={customMarker}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{city?.toUpperCase()}</p>
              <p className="text-xs">{address?.toUpperCase()}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs z-20 pointer-events-auto">
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