import React, { useState } from 'react'; 
import { NavLink } from 'react-router-dom';
import logo from './../media/logo.bd96ab9e.webp';

export const NavBar = ({ isLoggedIn, username, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define navigation links
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  // Additional links based on login status
  const loggedInLinks = [
    { to: '/history', label: 'History' },
    { to: '/map', label: 'Show Map' },
    { to: '#', label: 'Logout', onClick: handleLogout }, // Handle logout with onClick
    { to: '#', label: `Welcome, ${username}`, isWelcome: true }, // Display welcome message
  ];

  return (
    <header className="bg-blue-600 text-white shadow-md fixed w-full z-50">
      <nav className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center text-2xl font-bold">
          <img src={logo} className="w-12 h-12 rounded-full mr-2" alt="Logo" />
          <span className="text-white">Trace Point</span>
        </NavLink>

        {/* Hamburger Menu Button for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <ul className={`md:flex space-x-8 text-lg font-medium ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink to={link.to} className="text-gray-200 hover:text-white">
                {link.label}
              </NavLink>
            </li>
          ))}

          {/* Conditionally Render Links based on login status */}
          {isLoggedIn ? (
            <>
              {loggedInLinks.map((link) => (
                <li key={link.label}>
                  {link.isWelcome ? (
                    <span className="text-white font-semibold">{link.label}</span>
                  ) : (
                    <NavLink 
                      to={link.to} 
                      className="text-gray-200 hover:text-white" 
                      onClick={link.onClick} // Attach click handler for logout
                    >
                      {link.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="text-gray-200 hover:text-white">
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className="text-gray-200 hover:text-white">
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
