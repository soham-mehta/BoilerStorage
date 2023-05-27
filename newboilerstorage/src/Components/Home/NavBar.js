// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Boxlet</h1>
        <div className="ml-auto">
          <Link to="/login" className="text-xl font-medium text-gray-500 hover:text-gray-900 px-4">Login</Link>
          <Link to="/signup" className="text-xl font-medium text-gray-500 hover:text-gray-900 px-4">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
