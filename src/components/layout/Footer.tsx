import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="font-display font-semibold text-lg">Soko Mtaani</span>
            </div>
            <p className="text-neutral-300 text-sm mb-4">
              Your one-stop grocery shop delivering fresh produce to Parklands and environs.
            </p>
            <div className="flex space-x-3">
              <a
                href="tel:+254712345678"
                className="text-neutral-300 hover:text-primary-400 transition-colors"
                aria-label="Call us"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/254712345678"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-primary-400 transition-colors"
                aria-label="WhatsApp us"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@sokomotaani.co.ke"
                className="text-neutral-300 hover:text-primary-400 transition-colors"
                aria-label="Email us"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-neutral-300 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/shop?category=fruits" className="text-neutral-300 hover:text-white transition-colors">
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/shop?category=vegetables" className="text-neutral-300 hover:text-white transition-colors">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/shop?category=dairy" className="text-neutral-300 hover:text-white transition-colors">
                  Dairy
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-neutral-300 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-neutral-300 text-sm">
                    Parklands Road, Nairobi<br />
                    Near Parklands Sports Club
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <p className="text-neutral-300 text-sm">+254 712 345 678</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <p className="text-neutral-300 text-sm">info@sokomotaani.co.ke</p>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Operating Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary-400" />
                <div>
                  <p className="text-neutral-300 text-sm">
                    <span className="block">Mon - Sat: 7:00 AM - 8:00 PM</span>
                    <span className="block">Sunday: 8:00 AM - 6:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary-600 rounded-lg">
              <p className="text-white text-sm font-medium">
                Free delivery for orders above KES 5,000
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2024 Soko Mtaani. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;