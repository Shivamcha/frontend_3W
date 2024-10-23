import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
        <Link to="/insert-record">Insert Record</Link> 
        </li>
        {/* Add other links here as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
