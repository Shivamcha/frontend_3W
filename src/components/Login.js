import React, { useState } from 'react';
import './Login.css';  // Assuming you will add styles here

function Login({ onLogin }) {  // Added onLogin prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  
  const handleSubmit = (e) => {
    e.preventDefault();
     // Log inputs before calling onLogin
     console.log("Submitted Username:", username);
     console.log("Submitted Password:", password);
 
     // Call the onLogin function passed from App.js with the entered values
     onLogin(username, password);
  };

  return (
    <div className="login-container flex justify-center items-center h-screen bg-gray-100">
      <div className="login-card bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="username" className="block text-lg font-medium mb-2">UserName:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className="block text-lg font-medium mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

       

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg font-medium hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
