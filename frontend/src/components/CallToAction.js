import React from 'react';
import EmbeddedMap from './EmbeddedMap'; // Import the EmbeddedMap component

const CallToAction = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Embedded Google Map Component */}
      <EmbeddedMap />

      {/* Call to Action Button */}
      <button
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700"
        onClick={() => {
          alert('Get Started Button Clicked');
        }}
      >
        Get Started
      </button>
    </div>
  );
};

export default CallToAction;
