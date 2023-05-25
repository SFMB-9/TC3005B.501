import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const default_style = {
  width: '100%',
  height: '60vh',
};

const default_center = {
  lat: 19.4326,
  lng: -99.1332,
};

const car_dealerships = [
  { brand: 'Toyota', position: { lat: 19.4226, lng: -99.1676 } },
  { brand: 'Honda', position: { lat: 19.4124, lng: -99.1546 } },
  { brand: 'Ford', position: { lat: 19.4294, lng: -99.1409 } },
  { brand: 'Chevrolet', position: { lat: 19.4257, lng: -99.1710 } },
  { brand: 'Nissan', position: { lat: 19.4191, lng: -99.1539 } },
  { brand: 'Volkswagen', position: { lat: 19.4269, lng: -99.1483 } },
  { brand: 'BMW', position: { lat: 19.4208, lng: -99.1913 } },
  { brand: 'Mercedes-Benz', position: { lat: 19.4106, lng: -99.1782 } },
  { brand: 'Audi', position: { lat: 19.4216, lng: -99.2039 } },
  { brand: 'Mazda', position: { lat: 19.4324, lng: -99.1367 } },
];

const apiKey = 'AIzaSyC4tSvdFzVxcWXJj_c3SNrH8cE9SYml7xc'; // Replace with your actual Google Maps API key

const LocationsMap = ({center = default_center, locationsData = car_dealerships, containerStyle = default_style}) => {
  const mapOptions = {
    disableDefaultUI: true, // Disable default map controls
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={mapOptions}
      >
        {locationsData.map((dealership, index) => (
          <Marker
            key={index}
            position={dealership.position}
            title={`${dealership.brand}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationsMap;