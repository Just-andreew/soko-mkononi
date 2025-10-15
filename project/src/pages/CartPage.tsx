import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useCart } from '../lib/context/CartContext';

const CartPage: React.FC = () => {
  const { items, total, itemCount, removeItem, updateQuantity } = useCart();

  const deliveryFee = total > 1000 ? 0 : 50;
  const finalTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add fresh groceries to get started!
            </p>
            <Link to="/shop">
              <Button size="lg">
                Shop Now
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {itemCount} items in your cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="py-6 flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.unit}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:text-primary-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:text-primary-600"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold text-primary-600">
                            KES {item.price * item.quantity}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0">
            <Card>
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">KES {total}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <div className="text-right">
                    {deliveryFee === 0 ? (
                      <div>
                        <span className="font-medium text-green-600">Free</span>
                        <div className="text-xs text-green-600">
                          Orders above KES 1,000
                        </div>
                      </div>
                    ) : (
                      <span className="font-medium">KES {deliveryFee}</span>
                    )}
                  </div>
                </div>
                
                {total <= 1000 && (
                  <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
                    Add KES {1000 - total} more for free delivery
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold text-primary-600">
                      KES {finalTotal}
                    </span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button size="lg" fullWidth>
                  Continue to Checkout
                </Button>
              </Link>
              
              <Link to="/shop" className="block mt-4">
                <Button variant="outline" size="md" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
            </Card>

            {/* Promo Code */}
            <Card className="mt-6">
              <h4 className="font-medium mb-3">Promo Code</h4>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;