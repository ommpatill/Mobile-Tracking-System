import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUsername, onSuccess }) => {  // Accept onSuccess prop
  const [username, setUsernameInput] = useState('');  // State for username input
  const [password, setPassword] = useState('');       // State for password input
  const [error, setError] = useState('');             // State for error messages
  const [success, setSuccess] = useState('');         // State for success messages
  const navigate = useNavigate();                     // For navigation

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [loginData, setLoginData] = useState({

    username: 'u',
    password: 'p',

  });

  const handleSubmit = async (e) => {
    console.log("called...")
    e.preventDefault();
    console.log('Logging in with:', { username, password }); // Log user input

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      //const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      //const response = await axios.post('http://localhost:5000/api/auth/signuptest', formData);

      console.log("response>>>>>>>>>>> ", response)

      // Successful login
      setSuccess(response.data.message);
      setError('');

      // Store token and username in local storage
      localStorage.setItem('token', response.data.token);
      //setUsername(response.data.username);
      onSuccess(response.data.username); // Call onSuccess function
      navigate('/'); // Redirect to homepage after login
    } catch (error) {
      console.error("fs.... ", error)
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Set backend error message
      } else {
        setError('Something went wrong. Please try again.');
      }
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Username input field */}
      <div className="mb-4">
        <label className="block text-left text-gray-700">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsernameInput(e.target.value)} // Update username state
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Password input field */}
      <div className="mb-4">
        <label className="block text-left text-gray-700">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Submit button */}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Login..
      </button>

      {/* Error message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Success message */}
      {success && <p className="mt-4 text-green-500">{success}</p>}
    </form>
  );
};

export default LoginForm;
