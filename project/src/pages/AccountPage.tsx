import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, ShoppingBag, CreditCard, LogOut, Edit3 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../lib/context/AuthContext';
import { orders } from '../data/mockData';

const AccountPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    navigate('/signin');
    return null;
  }

  const userOrders = orders.filter(order => 
    order.customer.email === user.email
  ).slice(0, 3); // Show recent 3 orders

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            My Account
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your profile, orders, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                {user.isAdmin && (
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full mt-2">
                    Admin
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone:</span>
                  <span className="text-sm font-medium">{user.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member since:</span>
                  <span className="text-sm font-medium">Jan 2024</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button variant="outline" fullWidth icon={Edit3}>
                  Edit Profile
                </Button>
                {user.isAdmin && (
                  <Link to="/admin">
                    <Button fullWidth>
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  fullWidth 
                  icon={LogOut}
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="text-center hover:shadow-soft transition-shadow cursor-pointer">
                <ShoppingBag className="h-8 w-8 text-primary-500 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">Order History</h3>
                <p className="text-sm text-gray-600">{userOrders.length} orders</p>
              </Card>
              
              <Card className="text-center hover:shadow-soft transition-shadow cursor-pointer">
                <MapPin className="h-8 w-8 text-primary-500 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">Addresses</h3>
                <p className="text-sm text-gray-600">1 saved</p>
              </Card>
              
              <Card className="text-center hover:shadow-soft transition-shadow cursor-pointer">
                <CreditCard className="h-8 w-8 text-primary-500 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">Payment</h3>
                <p className="text-sm text-gray-600">M-Pesa</p>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Recent Orders</h3>
                <Link to="/orders" className="text-primary-600 hover:text-primary-700 text-sm">
                  View All
                </Link>
              </div>
              
              {userOrders.length > 0 ? (
                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">Order #{order.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.name} x{item.quantity}
                            </span>
                            <span className="font-medium">
                              KES {item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-sm text-gray-500">
                            +{order.items.length - 2} more items
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                        <span className="font-semibold">
                          Total: KES {order.total}
                        </span>
                        <div className="space-x-2">
                          <Link to={`/track/${order.id}`}>
                            <Button size="sm" variant="outline">
                              Track
                            </Button>
                          </Link>
                          <Button size="sm">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
                  <Link to="/shop">
                    <Button>Start Shopping</Button>
                  </Link>
                </div>
              )}
            </Card>

            {/* Saved Addresses */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Delivery Addresses</h3>
                <Button size="sm" variant="outline">
                  Add New
                </Button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Home</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Parklands Road, Block 15, Apt 204<br />
                      Parklands, Nairobi
                    </p>
                    <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded mt-2">
                      Default
                    </span>
                  </div>
                  <Button size="sm" variant="ghost" icon={Edit3} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;