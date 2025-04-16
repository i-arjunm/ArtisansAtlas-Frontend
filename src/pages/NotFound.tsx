import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">Oops! This page got lost in the marketplace.</p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;