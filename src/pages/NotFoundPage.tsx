import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="text-center py-16 max-w-md w-full">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-primary-600">404</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <Button size="lg" fullWidth icon={Home}>
              Go Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" size="lg" fullWidth icon={Search}>
              Browse Products
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Need help finding something?
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="tel:+254712345678"
              className="text-primary-600 hover:text-primary-700 text-sm"
            >
              Call us
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="https://wa.me/254712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;