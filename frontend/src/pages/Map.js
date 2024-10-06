// src/pages/Map.js
import React from 'react';

const Map = () => {
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold mb-4">Map</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119269.98113236176!2d73.75773779627606!3d18.498271827016914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c014271918c5%3A0xfa3ce63f0c494d3f!2sSwargate%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1727718762982!5m2!1sen!2sin"
        width="1700"
        height="750"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
      <p>Your map will be displayed here.</p>
    </div>
  );
};

export default Map;
