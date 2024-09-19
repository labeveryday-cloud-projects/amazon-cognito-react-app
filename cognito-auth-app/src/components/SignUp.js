// Import necessary dependencies
import React, { useState } from 'react';
import { signUp, confirmSignUp } from '@aws-amplify/auth';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  // State variables for form inputs and UI control
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle initial sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Attempt to sign up using AWS Amplify
      await signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      setShowConfirmation(true); // Show confirmation code input
    } catch (error) {
      console.log('error signing up:', error);
      setError(error.message || 'An error occurred during sign up');
    }
  };

  // Handle confirmation of sign up
  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Confirm sign up using AWS Amplify
      await confirmSignUp({ username, confirmationCode });
      navigate('/login'); // Redirect to login page on success
    } catch (error) {
      console.log('error confirming sign up', error);
      setError(error.message || 'An error occurred during confirmation');
    }
  };

  return (
    // Main container with gradient background
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center">
      {/* Sign up form card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {/* Display error message if any */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {/* Conditional rendering based on sign up stage */}
        {!showConfirmation ? (
          // Initial sign up form
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Username input field */}
            <div>
              <label htmlFor="username" className="block mb-1">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            {/* Email input field */}
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            {/* Password input field */}
            <div>
              <label htmlFor="password" className="block mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        ) : (
          // Confirmation code form
          <form onSubmit={handleConfirmSignUp} className="space-y-4">
            {/* Confirmation code input field */}
            <div>
              <label htmlFor="confirmationCode" className="block mb-1">Confirmation Code</label>
              <input
                type="text"
                id="confirmationCode"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            {/* Submit button for confirmation */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Confirm Sign Up
            </button>
          </form>
        )}
        {/* Link to login page */}
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;