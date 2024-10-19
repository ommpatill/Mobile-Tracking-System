import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import GPSLiveLocation from '../components/GPSLiveLocation'; // Adjusted import path

const containerStyle = {
  width: '100%',
  height: '750px',
  border: '0',
  marginTop: '20px',
};

let center = {
  lat: 18.4597,  // Swargate, Pune latitude
  lng: 73.8839,  // Swargate, Pune longitude
};



const GoogleMapComponent = (currentLocation) => {
  console.log(currentLocation);

  //console.log("GoogleMapComponent>>>> ", currentLocation);

  const [latitude, setLatitude] = useState()
const [longitude, setLongitude] = useState()
const[currentLocation1, setCurrentLocation1]=useState();

// useEffect(() => {
//   const geo = navigator.geolocation;

//   if (geo) {
//     const getLocation = () => {
//       geo.getCurrentPosition(
//         (position) => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//                const c = {
//     lat: position.coords.latitude,  // Swargate, Pune latitude
//     lng: position.coords.longitude,  // Swargate, Pune longitude
//   };
//   setCurrentLocation1(c);
//         },
//         (error) => console.error('Error getting location:', error),
//         {
//           enableHighAccuracy: true,
//           timeout: 5000,
//           maximumAge: 0,
//         }
//       );
//     };

//     getLocation();
//     const locationInterval = setInterval(getLocation, 300000);

//     return () => clearInterval(locationInterval);
//   } else {
//     console.error('Geolocation is not supported by this browser.');
//   }
// }, []);


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyA3E5Oa68_J4t4-4530RD0h_IA532wZn_8', // Replace with your Google Maps API Key
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    console.log(currentLocation1,"currentLocation1 from callback......", currentLocation)
    const bounds = new window.google.maps.LatLngBounds(currentLocation?.currentLocation);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  //console.log("isLoaded:: ", isLoaded,"    lat: ",latitude, "    long: ", longitude , "  c: ",currentLocation1 )
  return (isLoaded  ) ? (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation1}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Add a marker at Swargate, Pune */}
        {/* <Marker position={currentLocation?.currentLocation} /> */}
        <Marker position={currentLocation?.currentLocation} />
      </GoogleMap>

      {/* Add GPSLiveLocation component with styling */}
      <div className="gps-live-location" style={{ marginTop: '20px', padding: '10px', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', borderRadius: '5px', width: '90%' }}>
        <h3 className="text-lg font-semibold">Live GPS Location</h3>
        <GPSLiveLocation />
      </div>
    </div>
  ) : (
    <div>Loading Google Map...</div>
  );
};

export default GoogleMapComponent;
