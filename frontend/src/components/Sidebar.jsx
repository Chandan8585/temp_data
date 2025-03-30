import React from 'react';
import { useSidebar } from '../context/SidebarContext';

const menuItems = [
  { icon: 'fa-th', label: 'Dashboard' },
  { icon: 'fa-clock', label: 'Orders' },
  { icon: 'fa-shopping-bag', label: 'Products' },
  { icon: 'fa-bookmark', label: 'Favorites' },
  { icon: 'fa-comment-alt', label: 'Messages' }
];

const bottomItems = [
  { icon: 'fa-cog', label: 'Settings' },
  { icon: 'fa-sign-out-alt', label: 'Logout' }
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
        <button 
          className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white"
          onClick={toggleSidebar}
        >
          <i className={`fas ${expanded ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className="w-full rounded-lg flex items-center hover:bg-gray-100 p-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500">
              <i className={`fas ${item.icon}`}></i>
            </div>
            {expanded && (
              <span className="ml-3 text-sm font-medium text-gray-700">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="flex flex-col items-center space-y-6">
        {bottomItems.map((item, index) => (
          <div 
            key={index}
            className="w-full rounded-lg flex items-center hover:bg-gray-100 p-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500">
              <i className={`fas ${item.icon}`}></i>
            </div>
            {expanded && (
              <span className="ml-3 text-sm font-medium text-gray-700">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
