import React, { useState, useRef, useEffect } from 'react';
// import { Route, Routes, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login'; // Login page
import SignUp from './pages/SignUp'; // SignUp page
import { NavBar } from './components/NavBar';
import EmbeddedMap from './components/EmbeddedMap';
import GoogleMapComponent from './components/GoogleMapComponent';
import History from './pages/History'; // Use History component
import GPSLiveLocation from './components/GPSLiveLocation.jsx'; // Import the GPSLiveLocation component
import UserHistory from './components/UserHistory.jsx';
import LiveLocationTracker from './components/LiveLocationTracker.js';
function App() {
  const [showMap, setShowMap] = useState(false);
  const [username, setUsername] = useState(''); // State to hold the username from login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
  const showMapButtonRef = useRef(null);
  const navigate = useNavigate();
  const[currentLocation, setCurrentLocation]=useState();

  // const geo = navigator.geolocation

  // // Get User Current Location
  // geo.getCurrentPosition(userCoords)
  // function userCoords(position) {
  //   let userLatitude = position.coords.latitude
  //   let userLongitude = position.coords.longitude
  //   // console.log("Latitude: ", userLatitude);
  //   // console.log("Longitude: ", userLongitude);
  //     const c = {
  //   lat: userLatitude,  // Swargate, Pune latitude
  //   lng: userLongitude,  // Swargate, Pune longitude
  // };
  // setCurrentLocation(c);
  // //console.log("current location>>>> ", currentLocation)
  // }


  useEffect(() => {
    console.log("********getting user location********  ")
  const geo = navigator.geolocation;

  if (geo) {
    const getLocation = () => {
      geo.getCurrentPosition(
        (position) => {
        //  setLatitude(position.coords.latitude);
          //setLongitude(position.coords.longitude);
               const c = {
    lat: position.coords.latitude,  // Swargate, Pune latitude
    lng: position.coords.longitude,  // Swargate, Pune longitude
  };
  setCurrentLocation(c);
        },
        (error) => console.error('Error getting location:', error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    };

    getLocation();
    const locationInterval = setInterval(getLocation, 300000);

    return () => clearInterval(locationInterval);
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}, []);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    localStorage.removeItem('username'); // Clear the username
    setIsLoggedIn(false); // Set login state to false
    setUsername(''); // Clear username state
    // Redirect to login page after signup success
    navigate('/'); 
    // navigate('/login'); // Redirect user to login page
    // window.location.href = '/login'; // This will perform a full page reload and navigate to login
    // window.history.pushState({}, '', '/login');
  };

  const handleToggleMap = () => {
    setShowMap((prevShowMap) => !prevShowMap);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} /> {/* Pass isLoggedIn, username, and handleLogout */}

      {/* Define the main routes of your app */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home username={username} showMapButtonRef={showMapButtonRef} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Pass setUsername and setIsLoggedIn as props to Login and SignUp components */}
          <Route path="/login" element={<Login setUsername={(name) => { setUsername(name); localStorage.setItem('username', name); }} setIsLoggedIn={setIsLoggedIn} />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signuptest" element={<SignUp />} />
          <Route path="/profile" element={<div>Profile Page - Welcome, {username}!</div>} /> {/* Add Profile Route */}
          {/* <Route path="/map" element={<EmbeddedMap />} /> another option to show dummy map */}
          <Route path="/map" element={<GoogleMapComponent currentLocation={currentLocation} />} /> {/* Placeholder for Map Route */}
          {/* <Route path="/history" element={<History />} /> Use History component here */}
          <Route path="/history" element={<UserHistory />} /> {/* Use History component here */}
          <Route path="/livegps" element={<GPSLiveLocation />} /> {/* New route for GPSLiveLocation */}
          <Route path="/test" element={<LiveLocationTracker />} /> {/* New route for GPSLiveLocation */}
        </Routes>
      </div>

      {/* Toggle Button for Google Map - Only show if user is logged in */}
      {isLoggedIn && (
        <div className="text-center my-5">
          {/* <button
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700"
            onClick={handleToggleMap}
            ref={showMapButtonRef}
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button> */}
        </div>
      )}

      {/* Conditionally render the embedded map */}
      {showMap && (
        <div className="my-5 flex justify-center">
          <EmbeddedMap />
        </div>
      //   <div className="my-5 flex justify-center">
      //   <GoogleMap />
      // </div>
      )}
    </div>
  );
} 

export default App;
