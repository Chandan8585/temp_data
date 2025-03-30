import { useSidebar } from '@/context/SidebarContext';
import React from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
    { icon: 'fa-home', label: 'Home', path: '/' }, // Home page
    { icon: 'fa-user', label: 'Login', path: '/profile' }, // User profile or login
    { icon: 'fa-shopping-bag', label: 'Products', path: '/signup' }, // Products or signup
    { icon: 'fa-bookmark', label: 'Favorites', path: '/login' }, // Saved items or favorites
    { icon: 'fa-envelope', label: 'Messages', path: '/order' } // Messages or orders
  ];
  

const bottomItems = [
  { icon: 'fa-cog', label: 'Settings', path: '/settings' },
  { icon: 'fa-sign-out-alt', label: 'Logout', path: '/logout' }
];

const Sidebar = () => {
  const { expanded, toggleSidebar } = useSidebar();

  return (
    <div 
      className={`bg-white shadow-md h-screen fixed transition-all duration-300 py-4 px-2 z-10 flex flex-col justify-between ${
        expanded ? 'w-56' : 'w-16'
      }`}
      data-expanded={expanded}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Toggle Button */}
        <button onClick={toggleSidebar}>
          {expanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.36 6.64a1 1 0 1 1 1.41 1.41L13.41 14l6.36 6.36a1 1 0 0 1-1.41 1.41L12 15.41l-6.36 6.36a1 1 0 0 1-1.41-1.41L10.59 14 4.24 7.64a1 1 0 0 1 1.41-1.41L12 12.59z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 6h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 5h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 5h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z" />
            </svg>
          )}
        </button>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <Link 
            to={item.path} 
            key={index} 
            className="w-full rounded-lg flex items-center hover:bg-gray-100 p-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500">
              <i className={`fas ${item.icon}`}></i>
            </div>
            {expanded && (
              <span className="ml-3 text-sm font-medium text-gray-700">{item.label}</span>
            )}
          </Link>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="flex flex-col items-center space-y-6">
        {bottomItems.map((item, index) => (
          <Link 
            to={item.path} 
            key={index} 
            className="w-full rounded-lg flex items-center hover:bg-gray-100 p-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500">
              <i className={`fas ${item.icon}`}></i>
            </div>
            {expanded && (
              <span className="ml-3 text-sm font-medium text-gray-700">{item.label}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
