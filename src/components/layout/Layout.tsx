import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SignupPopup from '../ui/SignupPopup';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <SignupPopup />
    </div>
  );
};

export default Layout;