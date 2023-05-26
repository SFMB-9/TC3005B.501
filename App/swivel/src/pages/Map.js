/*
Diego Corrales Pinedo
Map component for rendering a map
centered around the given coordinates. 
15/5/2023
*/

import React from 'react';
import L, { marker } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ coordinates }) => {
  const markerIcon = new L.Icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/640px-Map_pin_icon.svg.png",
    iconSize: [30, 35],
    iconAnchor: [1, 35],    
  });

  return (
    <MapContainer center={coordinates} zoom={13} style={{ height: '400px', width: '400px' }} scrollWheelZoom={false} doubleClickZoom={false} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={coordinates} icon={markerIcon}/>
    </MapContainer>
  );
};

export default Map;