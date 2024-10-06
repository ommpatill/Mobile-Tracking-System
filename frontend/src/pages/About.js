import React from 'react';

const About = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">About Tracker</h1>
        <p className="text-gray-600 mb-4">
          Tracker is a powerful mobile tracking system designed to help you stay connected with your devices in real-time.
          Our application provides seamless location tracking, device monitoring, and management features to ensure you
          have complete control over your mobile devices.
        </p>
        <p className="text-gray-600">
          With Tracker, you can easily locate your devices, monitor their status, and receive notifications for important
          updates. Whether you are a parent wanting to keep tabs on your child's device or a business looking to manage
          company assets, Tracker is here to help.
        </p>
      </div>
    </main>
  );
};

export default About;
