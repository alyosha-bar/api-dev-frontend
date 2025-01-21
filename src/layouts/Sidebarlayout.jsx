import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';



function SidebarLayout() {
  return (
    <div className="layout flex">
      <Sidebar />
      <div className="content">
        {/* Nested route components will render here */}
        <Outlet />
      </div>
    </div>
  );
}

export default SidebarLayout;
