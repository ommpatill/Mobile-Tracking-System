// src/pages/SignUp.js
import React from 'react';
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Sign Up</h2>
        <SignUpForm />
      </div>
    </main>
  );
};

export default SignUp;
