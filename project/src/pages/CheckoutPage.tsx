import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, MapPin, User } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useCart } from '../lib/context/CartContext';
import { useAuth } from '../lib/context/AuthContext';
import { useToast } from '../lib/context/ToastContext';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    area: 'Parklands',
    address: '',
    notes: '',
    paymentMethod: 'mpesa'
  });
  const [isLoading, setIsLoading] = useState(false);

  const deliveryFee = total > 1000 ? 0 : 50;
  const finalTotal = total + deliveryFee;

  const parklandsAreas = [
    'Parklands',
    'Highridge',
    'Santonia',
    'Mountain View',
    'Westlands',
    'Kasarani'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    setIsLoading(true);

    try {
      // Mock order placement - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock M-Pesa STK Push if M-Pesa is selected
      if (formData.paymentMethod === 'mpesa') {
        showToast('M-Pesa STK push sent to your phone', 'info');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      // Generate order ID
      const orderId = 'ORD-' + Date.now().toString().slice(-6);
      
      // Clear cart and redirect to tracking
      clearCart();
      showToast('Order placed successfully!', 'success');
      navigate(`/track/${orderId}`);
      
    } catch (error) {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Checkout
          </h1>
          <p className="text-gray-600 mt-2">
            Complete your order
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Delivery Details */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-center space-x-2 mb-4">
                  <User className="h-5 w-5 text-primary-500" />
                  <h3 className="font-semibold text-lg">Contact Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </Card>

              <Card>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary-500" />
                  <h3 className="font-semibold text-lg">Delivery Address</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Area *
                    </label>
                    <select
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {parklandsAreas.map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Building name, apartment number, street name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="e.g., Call when you arrive, Gate code, etc."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mpesa"
                      checked={formData.paymentMethod === 'mpesa'}
                      onChange={handleInputChange}
                      className="text-primary-500"
                    />
                    <Smartphone className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <div className="font-medium">M-Pesa</div>
                      <div className="text-sm text-gray-600">Pay with M-Pesa mobile money</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash_on_delivery"
                      checked={formData.paymentMethod === 'cash_on_delivery'}
                      onChange={handleInputChange}
                      className="text-primary-500"
                    />
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when you receive your order</div>
                    </div>
                  </label>
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                
                {/* Items */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">
                        KES {item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">KES {total}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `KES ${deliveryFee}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                    <span>Total</span>
                    <span className="text-primary-600">KES {finalTotal}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                  className="mt-6"
                >
                  {isLoading 
                    ? 'Processing...' 
                    : formData.paymentMethod === 'mpesa' 
                      ? `Pay KES ${finalTotal} with M-Pesa`
                      : `Place Order - KES ${finalTotal}`
                  }
                </Button>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;