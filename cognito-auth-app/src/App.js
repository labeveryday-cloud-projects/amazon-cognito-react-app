import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from '@aws-amplify/auth';
import awsconfig from './aws-exports';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';

Amplify.configure(awsconfig);

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/Login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={
          <ProtectedRoute>
          {({ signOut, user }) => (
            <Home signOut={signOut} user={user} />
          )}
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            {({ signOut, user }) => (
            <Profile signOut={signOut} user={user} />
          )}
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;