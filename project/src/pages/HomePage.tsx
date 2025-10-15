import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import CategoryChip from '../components/ui/CategoryChip';
import ProductTile from '../components/ui/ProductTile';
import Card from '../components/ui/Card';
import { categories, getTopPickProducts } from '../data/mockData';
import { useBusiness } from '../lib/context/BusinessContext';

const HomePage: React.FC = () => {
  const topProducts = getTopPickProducts();
  const { businessSettings } = useBusiness();

  const handleWhatsApp = () => {
    window.open('https://wa.me/254712345678', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+254712345678';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 md:py-24"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-32 h-32 bg-primary-100 rounded-full opacity-20"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-accent-200 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary-200 rounded-full opacity-25"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-slide-up">
              <p className="text-primary-600 font-medium mb-4 text-lg">Soko Mtaani</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
                Your one-stop grocery shop
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get fresh groceries delivered straight to you in Parklands and environs
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button size="lg" className="text-lg px-8 shadow-lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="lg"
                    icon={Phone}
                    onClick={handleCall}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    icon={MessageCircle}
                    onClick={handleWhatsApp}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative animate-fade-in">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Fresh groceries and produce"
                  className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-soft"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-card">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-900">Fresh Daily</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Tagline */}
      <section className="relative -mt-8 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/95 backdrop-blur-sm text-center animate-fade-in border border-primary-100">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <p className="text-gray-700 font-medium">
                Free delivery on orders above KES 1,000
              </p>
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            </div>
          </Card>
        </div>
      </section>

      {/* Three Hovering Tiles */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
              Shop by Popular Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most loved products, handpicked for freshness and quality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/shop?sort=popular"
              className="group"
            >
              <Card hoverable className="text-center group-hover:shadow-soft transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                  Best Sellers
                </h3>
                <p className="text-gray-600 text-sm">
                  Most loved by our customers
                </p>
              </Card>
            </Link>

            <Link
              to="/shop?category=fruits"
              className="group"
            >
              <Card hoverable className="text-center group-hover:shadow-soft transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍎</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                  Fresh Fruits
                </h3>
                <p className="text-gray-600 text-sm">
                  Sweet seasonal fruits
                </p>
              </Card>
            </Link>

            <Link
              to="/shop?category=vegetables"
              className="group"
            >
              <Card hoverable className="text-center group-hover:shadow-soft transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥬</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                  Fresh Vegetables
                </h3>
                <p className="text-gray-600 text-sm">
                  Farm fresh vegetables
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-semibold text-gray-900">
              Your one-stop grocery shop
              Shop by Category
            </h2>
            <Link to="/shop">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <div key={category.id} className="flex-shrink-0">
                <CategoryChip category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-semibold text-gray-900">
              Top Picks for You
            </h2>
            <Link to="/shop">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {topProducts.map((product) => (
              <ProductTile key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About & Contact */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">SM</span>
            </div>
            <h2 className="text-3xl font-display font-semibold text-gray-900 mb-4">
              Meet {businessSettings.ownerName}, Your Local Grocer
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're a local Parklands vendor delivering fresh produce since 2020. 
              Our mission is to bring you the freshest groceries at the best prices, 
              delivered right to your doorstep.
            </p>
          </div>

          <Card className="max-w-md mx-auto">
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500" />
                <span>+254 712 345 678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-primary-500" />
                <span>WhatsApp Available</span>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Operating Hours:</strong></p>
                <p>Mon - Sat: 7:00 AM - 8:00 PM</p>
                <p>Sunday: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <Button
                size="sm"
                icon={Phone}
                onClick={handleCall}
                fullWidth
              >
                Call Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={MessageCircle}
                onClick={handleWhatsApp}
                fullWidth
              >
                WhatsApp
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;