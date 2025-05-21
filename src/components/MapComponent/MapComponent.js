import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css'

const MapComponent = ({ data }) => {
  const mapContainerRef = useRef(null);   // for DOM element
  const mapInstanceRef = useRef(null);    // for Leaflet map instance
  const markerRef = useRef(null);

  const position = [Number(data.lat), Number(data.lon)];

  // Initialize the map once
  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(position, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstanceRef.current);

      markerRef.current = L.marker(position).addTo(mapInstanceRef.current);
    }
  }, []);

  // Update position if data changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(position, 13);

      if (markerRef.current) {
        markerRef.current.setLatLng(position)
          .bindPopup(data.address || 'No address provided')
          .openPopup();
      } else {
        markerRef.current = L.marker(position)
          .addTo(mapInstanceRef.current)
          .bindPopup(data.address || 'No address provided')
          .openPopup();
      }
    }
  }, [data.lat, data.lon, data.address]);


  return (
    <div
      id="map"
      ref={mapContainerRef}
    />
  );
};

export default MapComponent;
