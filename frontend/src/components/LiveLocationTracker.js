// LiveLocationTracker.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Define your Google Maps API key
const GOOGLE_MAPS_API_KEY = 'AIzaSyA3E5Oa68_J4t4-4530RD0h_IA532wZn_8'; // Replace with your actual API key

const LiveLocationTracker = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: null, lng: null });
  const [mapType, setMapType] = useState('roadmap'); // Default map type

  useEffect(() => {
    const geo = navigator.geolocation;

    // Check if Geolocation is supported
    if (geo) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          updateLocation();
        } else if (permissionStatus.state === 'prompt') {
          geo.getCurrentPosition(
            (position) => {
              const newLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setLocation(newLocation);
              setMapCenter(newLocation);
            },
            (error) => {
              console.error('Error getting location:', error);
              setError(error.message);
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            }
          );
        } else {
          setError('Location permission denied. Please enable location access in your browser settings.');
        }
      });

      const intervalId = setInterval(updateLocation, 5000); // Update location every 5 seconds
      return () => clearInterval(intervalId);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const updateLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(newLocation);
        setMapCenter(newLocation); // Center the map on the user's location
      },
      (error) => {
        console.error('Error getting location:', error);
        setError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const handleRecenter = () => {
    if (location.lat && location.lng) {
      setMapCenter(location);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Live Location Tracker</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Map Type Selection */}
      <div className="mb-4">
        <label htmlFor="mapType" className="block mb-2 text-sm font-medium text-gray-700">
          Select Map Type:
        </label>
        <select
          id="mapType"
          value={mapType}
          onChange={(e) => setMapType(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="roadmap">Roadmap</option>
          <option value="satellite">Satellite</option>
          <option value="terrain">Terrain</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          center={mapCenter.lat && mapCenter.lng ? mapCenter : { lat: 0, lng: 0 }}
          zoom={14}
          mapContainerStyle={{ height: '800px', width: '100%' }}
          mapTypeId={mapType} // Set map type based on the selected option
        >
          {location.lat && location.lng && (
            <Marker position={{ lat: location.lat, lng: location.lng }} />
          )}
        </GoogleMap>
      </LoadScript>

      <div className="flex justify-center mt-4">
        <button 
          onClick={handleRecenter} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Recenter to My Location
        </button>
      </div>
    </div>
  );
};

export default LiveLocationTracker;
