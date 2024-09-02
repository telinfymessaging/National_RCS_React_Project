'use client';

import React, { useState, ReactNode } from 'react';
import Navbar from '../compoents/navbar/navbar';
import Sidebar from '../compoents/sidebar/sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar isOpen={isSidebarOpen} onMenuClick={handleMenuClick} />
      <div style={{ flexGrow: 1 }}>
        <Navbar onMenuClick={handleMenuClick} isOpen={isSidebarOpen} />
        
        <main style={{ padding: isSidebarOpen?'46px': '56px', backgroundColor: '#f4f6f8', height: 'auto', transition: 'margin-left  0.5s',marginLeft: isSidebarOpen ? '345px' : '0', }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
