// Import necessary dependencies
import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  // State variables for form inputs and error handling
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle sign in form submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Attempt to sign in using AWS Amplify
      await signIn({ username, password });
      navigate('/home'); // Redirect to home page on success
    } catch (error) {
      console.log('error signing in', error);
      setError(error.message || 'An error occurred during sign in');
    }
  };

  return (
    // Main container with gradient background
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center">
      {/* Login form card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Your App</h1>
        {/* Display error message if any */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {/* Sign in form */}
        <form onSubmit={handleSignIn} className="space-y-4">
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;