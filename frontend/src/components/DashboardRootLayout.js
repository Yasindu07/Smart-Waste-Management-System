import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardRootLayout = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
    if (!currentUser) {
      return <Navigate to="/auth/sign-in" />;
    }
  return (
    <div>
      <Header handleSidebarToggle={handleSidebarToggle} />
      <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
      <div style={{ padding: '16px' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardRootLayout