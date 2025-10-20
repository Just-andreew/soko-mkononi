import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '../../lib/context/AuthContext';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Check if user is admin
  if (!user?.isAdmin) {
    return <Navigate to="/signin" replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isCurrentPath = (href: string) => {
    return location.pathname === href || (href !== '/admin' && location.pathname.startsWith(href));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 lg:relative bg-white w-64 transform transition-transform duration-200 ease-in-out z-50 shadow-lg flex-shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="font-display font-semibold text-lg text-gray-900">
                Admin
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${isCurrentPath(item.href)
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User info */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <Link
              to="/admin/settings"
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 w-full mb-2"
              onClick={() => setIsSidebarOpen(false)}
            >
              <User className="h-4 w-4" />
              <span>Edit Profile</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 w-full"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/"
              className="text-sm text-gray-600 hover:text-primary-600"
            >
              ← Back to Store
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;