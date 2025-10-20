import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart3,
  Plus,
  Settings,
  User
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { orders } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  // Calculate KPIs from mock data
  const today = new Date().toISOString().split('T')[0];
  const todaysOrders = orders.filter(order => 
    order.createdAt.startsWith(today)
  );
  
  const stats = {
    todaysOrders: todaysOrders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Welcome back, Brian
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your store today
        </p>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/admin/orders">
          <div className="text-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
            <ShoppingBag className="h-8 w-8 text-primary-500 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">View Orders</h3>
            <p className="text-sm text-gray-600">{stats.pending} pending</p>
          </div>
        </Link>

        <Link to="/admin/products">
          <div className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Package className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">Products</h3>
            <p className="text-sm text-gray-600">Manage inventory</p>
          </div>
        </Link>

        <Link to="/admin/reports">
          <div className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <BarChart3 className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">Reports</h3>
            <p className="text-sm text-gray-600">Sales & analytics</p>
          </div>
        </Link>

        <Link to="/admin/products?action=add">
          <div className="text-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <Plus className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">Add Product</h3>
            <p className="text-sm text-gray-600">Quick add new item</p>
          </div>
        </Link>
        </div>
      </Card>

      {/* Key Stats */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todaysOrders}</p>
            </div>
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
            </div>
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">KES {stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
        </div>
      </Card>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Recent Orders</h3>
            <Link to="/admin/orders">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-primary-600">#{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">KES {order.total}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {order.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Management */}
        <Card>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <div className="space-y-3">
            <Link to="/admin/customers">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Users className="h-5 w-5 text-purple-500" />
                <span className="font-medium">View Customers</span>
              </div>
            </Link>
            
            <Link to="/admin/reports">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <span className="font-medium">Sales Reports</span>
              </div>
            </Link>
            
            <Link to="/admin/settings">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Business Settings</span>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;