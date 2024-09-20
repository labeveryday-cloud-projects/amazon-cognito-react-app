// Import React and hooks for side effects and state management
import React, { useEffect, useState } from 'react';
// Import routing components from react-router-dom
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// Import Amplify for AWS Cognito integration
import { Amplify } from 'aws-amplify';
// Import Cognito authentication functions
import { getCurrentUser, signOut as amplifySignOut } from '@aws-amplify/auth';
// Import Cognito configuration
import awsconfig from './aws-exports';
// Import components for different pages
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';

// Configure Amplify with AWS settings
Amplify.configure(awsconfig);

// ProtectedRoute component to handle authentication
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check authentication state on component mount
  useEffect(() => {
    checkAuthState();
  }, []);

  // Function to check if user is authenticated
  async function checkAuthState() {
    try {
      const currentUser = await getCurrentUser();
      setIsAuthenticated(true);
      setUser(currentUser);
    } catch (error) {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  // Function to handle user sign out
  const signOut = async () => {
    try {
      await amplifySignOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  // Clone child component and pass props
  return React.cloneElement(children, { signOut, user });
}

// Main App component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Protected routes wrapped in ProtectedRoute component */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

// Export the App component as the default export of this module.
// This allows other files to import this component using:
// import App from './App';
// The 'default' keyword means this is the primary export of the file
export default App;
