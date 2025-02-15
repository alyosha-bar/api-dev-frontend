import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';



function SidebarLayout() {
  return (
    <div className="layout flex">
      <Sidebar />
      <div className="content flex justify-center items-center w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default SidebarLayout;
