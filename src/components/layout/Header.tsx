import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  Phone,
  MessageCircle
} from 'lucide-react';
import { useCart } from '../../lib/context/CartContext';
import { useAuth } from '../../lib/context/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/254712345678', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+254712345678';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SM</span>
            </div>
            <span className="font-display font-semibold text-lg text-gray-900">
              Soko Mtaani
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for groceries..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                aria-label="Search for groceries"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-500"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Quick Contact */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCall}
                className="p-2 text-gray-600 hover:text-primary-500 transition-colors"
                aria-label="Call us"
              >
                <Phone className="h-4 w-4" />
              </button>
              <button
                onClick={handleWhatsApp}
                className="p-2 text-gray-600 hover:text-primary-500 transition-colors"
                aria-label="WhatsApp us"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
            </div>

            {/* Auth/Account */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/account"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-500"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-primary-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/signin" className="text-sm text-gray-700 hover:text-primary-500">
                  Sign In
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-primary-500 transition-colors"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary-500"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 animate-fade-in">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for groceries..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  aria-label="Search for groceries"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <Link
                to="/shop"
                className="block text-gray-700 hover:text-primary-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              
              {/* Quick Contact */}
              <div className="flex items-center space-x-4 py-2">
                <button
                  onClick={handleCall}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-500"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call</span>
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-500"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Auth Links */}
              {isAuthenticated ? (
                <div className="border-t border-gray-100 pt-3 space-y-3">
                  <Link
                    to="/account"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-primary-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-3 space-y-3">
                  <Link
                    to="/signin"
                    className="block text-gray-700 hover:text-primary-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button size="sm" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="flex items-center justify-between py-2 border-t border-gray-100 pt-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                </div>
                {itemCount > 0 && (
                  <span className="bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;