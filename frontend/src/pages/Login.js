import React from 'react';
import LoginForm from '../components/LoginForm'; // Import the updated LoginForm component

const Login = ({ setUsername, setIsLoggedIn }) => {
  // Function to handle successful login and set the user as logged in
  const handleLoginSuccess = (username) => {
    console.log("username...",username)
    setUsername(username);  // Set the logged-in username
    setIsLoggedIn(true);    // Update login state
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Sign In</h2>
        {/* Pass the handleLoginSuccess function to the LoginForm */}
        <LoginForm onSuccess={handleLoginSuccess} /> 
      </div>
    </div>
  );
};

export default Login;
