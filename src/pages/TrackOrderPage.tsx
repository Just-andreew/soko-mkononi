import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, Truck, MapPin, Phone, MessageCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const TrackOrderPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  // Mock order data - replace with actual API call
  const order = {
    id: orderId,
    status: 'out_for_delivery',
    total: 650,
    items: [
      { name: 'Fresh Mangoes', quantity: 2, price: 200 },
      { name: 'Bananas', quantity: 1, price: 120 },
      { name: 'Fresh Milk', quantity: 2, price: 65 }
    ],
    customer: {
      name: 'John Doe',
      phone: '+254712345678',
      address: 'Parklands Road, Block 15, Apt 204'
    },
    timeline: [
      { status: 'Order Placed', time: '10:30 AM', completed: true },
      { status: 'Order Confirmed', time: '10:35 AM', completed: true },
      { status: 'Preparing Order', time: '11:00 AM', completed: true },
      { status: 'Out for Delivery', time: '2:45 PM', completed: true },
      { status: 'Delivered', time: '', completed: false }
    ],
    estimatedDelivery: '4:00 PM'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600';
      case 'out_for_delivery':
        return 'text-blue-600';
      case 'processing':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCall = () => {
    window.location.href = 'tel:+254712345678';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/254712345678', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Track Order #{orderId}
          </h1>
          <div className="flex items-center space-x-4 mt-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
              {order.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className="text-gray-600">
              Total: KES {order.total}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Timeline */}
          <div>
            <Card>
              <h3 className="font-semibold text-lg mb-6">Order Status</h3>
              
              <div className="space-y-6">
                {order.timeline.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {step.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Clock className="h-6 w-6 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.status}
                      </p>
                      {step.time && (
                        <p className="text-sm text-gray-600">{step.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {order.status === 'out_for_delivery' && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Your order is on the way!
                      </p>
                      <p className="text-sm text-blue-700">
                        Estimated delivery: {order.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Map Preview */}
            <Card className="mt-6">
              <h3 className="font-semibold text-lg mb-4">Delivery Location</h3>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p>Static map preview would go here</p>
                  <p className="text-sm">{order.customer.address}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Details */}
          <div>
            <Card>
              <h3 className="font-semibold text-lg mb-4">Order Details</h3>
              
              <div className="space-y-3 mb-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-medium">
                      KES {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary-600">KES {order.total}</span>
                </div>
              </div>
            </Card>

            <Card className="mt-6">
              <h3 className="font-semibold text-lg mb-4">Delivery Address</h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium text-gray-900">{order.customer.name}</p>
                <p>{order.customer.address}</p>
                <p>{order.customer.phone}</p>
              </div>
            </Card>

            <Card className="mt-6">
              <h3 className="font-semibold text-lg mb-4">Need Help?</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  icon={Phone}
                  onClick={handleCall}
                >
                  Call Vendor
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={MessageCircle}
                  onClick={handleWhatsApp}
                >
                  WhatsApp Vendor
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Available Mon-Sat: 7:00 AM - 8:00 PM
              </p>
            </Card>

            <div className="mt-6 text-center">
              <Link to="/shop">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;