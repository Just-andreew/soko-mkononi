import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../../lib/context/AuthContext';

const SignupPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Don't show popup if user is already authenticated
    if (isAuthenticated) return;

    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('signup-popup-shown');
    if (popupShown) return;

    // Show popup after 7 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('signup-popup-shown', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - in production, integrate with your backend
    console.log('Signup:', { email, phone });
    handleClose();
  };

  const handleNoThanks = () => {
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">SM</span>
          </div>
          <h2 className="text-2xl font-display font-semibold text-gray-900 mb-2">
            Welcome to Soko Mtaani
          </h2>
          <p className="text-gray-600">
            Sign up now and get 5% off your first order. Save your address and speed through checkout.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          <div className="space-y-3">
            <Button type="submit" fullWidth>
              Sign Up & Save 5%
            </Button>
            <button
              type="button"
              onClick={handleNoThanks}
              className="w-full text-gray-600 hover:text-gray-800 py-2"
            >
              No thanks
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            By signing up, you agree to our terms and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;