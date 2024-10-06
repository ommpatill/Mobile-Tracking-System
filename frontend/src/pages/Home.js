import React from 'react';

// import EmbeddedMap from '../components/EmbeddedMap'; // Correct import for EmbeddedMap

function Home({ showMapButtonRef, username }) {
  // Function to handle "Get Started" button click and scroll to "Show Map" button
  const handleGetStartedClick = () => {
    if (showMapButtonRef && showMapButtonRef.current) {
      showMapButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Welcome Message for Logged-in Users */}
      {username && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Welcome back, {username}!</strong>
          <span className="block sm:inline"> We’re glad to have you here.</span>
        </div>
      )}

      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">Welcome to Tracker</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Tracker is a powerful mobile tracking system that helps you stay connected with your devices in real-time.
          Locate, monitor, and manage your mobile devices effortlessly.
        </p>

        {/* Call to Action Button with Scroll Functionality */}
        <button
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={handleGetStartedClick} // Attach the scroll function to this button
        >
          Get Started
        </button>
      </div>
    </main>
  );
}

export default Home;
