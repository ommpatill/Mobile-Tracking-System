import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '750px',
  border: '0',
  marginTop: '20px',
};

const center = {
  // lat: 18.498271827016914, // Swargate, Pune latitude
  // lng: 73.85773779627606,  // Swargate, Pune longitude

  lat: 19.1551  , // Swargate, Pune latitude
  lng: 72.8534,  // Swargate, Pune longitude
};

const GoogleMapComponent = () => {
  console.log("GoogleMapComponent>>>> ")
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyA3E5Oa68_J4t4-4530RD0h_IA532wZn_8', // Replace with your Google Maps API Key
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Add a marker at Swargate, Pune */}
        <Marker position={center} />
      </GoogleMap>
    </div>
  ) : (
    <div>Loading Google Map...</div>
  );
};
// https://maps.googleapis.com/maps/api/js?key=AIzaSyA3E5Oa68_J4t4-4530RD0h_IA532wZn_8&callback=initMap

export default GoogleMapComponent;
