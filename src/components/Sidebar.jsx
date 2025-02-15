import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const params = useParams()

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`h-full bg-white transition-width duration-300 border-r-2 ${
          isMinimized ? 'w-20' : 'w-64'
        } flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between">
          <span className="font-bold text-lg">{isMinimized ? 'SB' : 'Sidebar'}</span>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded hover:bg-gray-200"
          >
            {isMinimized ? '>' : '<'}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-grow p-4">
          <ul>
            <li className="my-2 p-2 hover:bg-gray-200 rounded text-sm"><Link to={`${params.id}`} className="my-2 p-2 hover:bg-gray-200 rounded text-sm">{isMinimized ? '🏠' : 'Usage Dashboard'}</Link></li>
            <li className="my-2 p-2 hover:bg-gray-200 rounded text-sm"><Link to={`settings/${params.id}`} className="my-2 p-2 hover:bg-gray-200 rounded text-sm">{isMinimized ? '🏠' : 'API settings'}</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
