import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { UserDropdown, Sidebar } from '../utils';
import vaiyda from '../assets/vaidya.png';

function Header() {
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50 h-20 w-full">
      <div className="relative flex items-center justify-center h-full max-w-8xl mx-auto">
        {/* Left Section - Sidebar Button (Viewport Extreme Left) */}
        <div className="absolute left-4 flex items-center justify-start">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Center Section - Logo */}
        <div className="flex items-center justify-center">
          <Link to="/" className="flex items-center justify-center">
            <img 
              src={vaiyda} 
              alt="Vaidya" 
              className="h-24 w-24 object-contain"
            />
          </Link>
        </div>

        {/* Right Section - Buttons (Viewport Extreme Right) */}
        <div className="absolute right-4 flex items-center justify-end space-x-4">
          <Link
            to="/appointment"
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition hidden lg:block"
          >
            Make an Appointment
          </Link>
          {user ? ( 
            <UserDropdown />
          ) : (
            <Link
              to="/login"
              className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
}

export default Header;