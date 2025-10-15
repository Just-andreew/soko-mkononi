import React, { useState } from 'react';
import { Eye, Phone, MessageCircle, Filter, Download } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { orders } from '../../data/mockData';
import { useToast } from '../../lib/context/ToastContext';

const AdminOrders: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const filteredOrders = orders.filter(order => {
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesSearch = !searchQuery || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // Mock status update - replace with actual API call
    showToast(`Order ${orderId} marked as ${newStatus.replace('_', ' ')}`, 'success');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace('+', '')}`, '_blank');
  };

  const exportOrders = () => {
    // Mock CSV export - replace with actual export functionality
    const csv = filteredOrders.map(order => 
      `${order.id},${order.customer.name},${order.customer.phone},${order.status},${order.total},${order.createdAt}`
    ).join('\n');
    
    const blob = new Blob([`Order ID,Customer Name,Phone,Status,Total,Date\n${csv}`], 
      { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    showToast('Orders exported successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-gray-900">
          Orders
        </h1>
        <Button
          icon={Download}
          onClick={exportOrders}
          variant="outline"
        >
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search orders, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <Button variant="outline" icon={Filter}>
            Advanced Filters
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium text-gray-600">Order ID</th>
                <th className="text-left py-3 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 font-medium text-gray-600">Items</th>
                <th className="text-left py-3 font-medium text-gray-600">Total</th>
                <th className="text-left py-3 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-3 font-medium text-primary-600">
                    #{order.id}
                  </td>
                  <td className="py-3">
                    <div>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm text-gray-600">{order.customer.phone}</p>
                      <p className="text-sm text-gray-600">{order.address.area}</p>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="text-sm">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index}>
                          {item.name} x{item.quantity}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-gray-500">
                          +{order.items.length - 2} more
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 font-medium">
                    KES {order.total}
                  </td>
                  <td className="py-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button
                        className="text-gray-600 hover:text-primary-600"
                        title="View Order Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleCall(order.customer.phone)}
                        className="text-gray-600 hover:text-green-600"
                        title="Call Customer"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleWhatsApp(order.customer.phone)}
                        className="text-gray-600 hover:text-blue-600"
                        title="WhatsApp Customer"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found matching your criteria</p>
          </div>
        )}
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-bold text-orange-600">
            {orders.filter(o => o.status === 'pending').length}
          </p>
          <p className="text-sm text-gray-600">Pending Orders</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter(o => o.status === 'processing').length}
          </p>
          <p className="text-sm text-gray-600">Processing</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {orders.filter(o => o.status === 'out_for_delivery').length}
          </p>
          <p className="text-sm text-gray-600">Out for Delivery</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
          <p className="text-sm text-gray-600">Delivered</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrders;