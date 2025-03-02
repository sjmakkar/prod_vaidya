import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
function Sidebar({ isOpen, toggleSidebar }) {

  const { user } = useContext(AuthContext);
 
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between py-6 px-4">
          <h1>Menu</h1>
          <button onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/prescription"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600"
              >
                Prescription
              </Link>
            </li>
            <li>
              <Link
                to="/appointment"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600"
              >
                Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/doctors"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600"
              >
                Doctors
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600"
              >
                Contact
              </Link>
            </li>
            {user && user.roleId === 2 && (
            <li>
              <Link
                to="/admin-portal"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600"
              >
                Admin
              </Link>
            </li>
          )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
