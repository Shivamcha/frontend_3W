import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import UserSubmissionForm from './components/UserSubmissionForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication

  // Function to handle login
  const handleLogin = (username, password) => {
    // Static credentials
    const staticUsername = 'admin';
    const staticPassword = 'admin@123';

    // Check credentials
    if (username === staticUsername && password === staticPassword) {
      setIsAuthenticated(true); // Set authentication to true
    } else {
      alert('Invalid username or password'); // Handle invalid login
    }
  };

  return (
    <Router>
      <div>
        {/* Show Navbar only when the user is NOT authenticated */}
        {!isAuthenticated && <Navbar />}

        <Routes>
          {/* Login Route - Show Navbar and Login page */}
          <Route 
            path="/" 
            element={
              isAuthenticated 
                ? <Navigate to="/admin-dashboard" />  // Redirect to Admin Dashboard after login
                : <Login onLogin={handleLogin} />  // Show Login page if not authenticated
            } 
          />
          
          {/* Protected Route for UserSubmissionForm */}
          <Route 
            path="/insert-record" 
            element={!isAuthenticated ? <UserSubmissionForm /> : <Navigate to="/" />} 
          />
          
          {/* Protected Admin Dashboard Route */}
          <Route 
            path="/admin-dashboard" 
            element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
