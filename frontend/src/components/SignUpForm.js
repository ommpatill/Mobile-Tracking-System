import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const navigate = useNavigate(); // For navigation

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check for username availability when user changes the username field
    if (name === 'username') {
      checkUsernameAvailability(value);
    }
  };

  // Check username availability
  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/check-username/${username}`);
      setUsernameAvailable(response.data.available);
    } catch (error) {
      setUsernameAvailable(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }

    console.log("signup handlesubmit.... ", formData

    )
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      setSuccess(response.data.message || 'Sign up successful! Please verify your email.');
      setError('');

      // Redirect to login page after signup success
      navigate('/login'); 
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="mb-4">
        <label className="block text-left text-gray-700">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-left text-gray-700">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-left text-gray-700">Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-left text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-left text-gray-700">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border rounded-lg ${!usernameAvailable ? 'border-red-500' : ''}`}
        />
        {!usernameAvailable && (
          <p className="text-red-500 mt-2">Username is not available. Please choose another one.</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-left text-gray-700">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-left text-gray-700">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Sign Up
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-green-500">{success}</p>}
    </form>
  );
};

export default SignUpForm;
