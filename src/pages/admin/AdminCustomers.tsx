import React, { useState } from 'react';
import { Search, Eye, Phone, MessageCircle, Download } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { orders } from '../../data/mockData';
import { useToast } from '../../lib/context/ToastContext';

const AdminCustomers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  // Extract unique customers from orders
  const customers = orders.reduce((acc, order) => {
    const existingCustomer = acc.find(c => c.email === order.customer.email);
    if (existingCustomer) {
      existingCustomer.totalOrders += 1;
      existingCustomer.totalSpent += order.total;
      existingCustomer.lastOrderDate = new Date(order.createdAt) > new Date(existingCustomer.lastOrderDate) 
        ? order.createdAt 
        : existingCustomer.lastOrderDate;
    } else {
      acc.push({
        id: `customer-${acc.length + 1}`,
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
        totalOrders: 1,
        totalSpent: order.total,
        lastOrderDate: order.createdAt,
        status: 'active'
      });
    }
    return acc;
  }, [] as any[]);

  const filteredCustomers = customers.filter(customer => {
    const query = searchQuery.toLowerCase();
    return customer.name.toLowerCase().includes(query) ||
           customer.email.toLowerCase().includes(query) ||
           customer.phone.includes(query);
  });

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace('+', '')}`, '_blank');
  };

  const exportCustomers = () => {
    const csv = filteredCustomers.map(customer => 
      `${customer.name},${customer.email},${customer.phone},${customer.totalOrders},${customer.totalSpent},${customer.lastOrderDate}`
    ).join('\n');
    
    const blob = new Blob([`Name,Email,Phone,Total Orders,Total Spent,Last Order Date\n${csv}`], 
      { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
    showToast('Customers exported successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-gray-900">
          Customers
        </h1>
        <Button
          icon={Download}
          onClick={exportCustomers}
          variant="outline"
        >
          Export CSV
        </Button>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-bold text-primary-600">{customers.length}</p>
          <p className="text-sm text-gray-600">Total Customers</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {customers.filter(c => c.status === 'active').length}
          </p>
          <p className="text-sm text-gray-600">Active Customers</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            KES {Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}
          </p>
          <p className="text-sm text-gray-600">Avg. Order Value</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {Math.round(customers.reduce((sum, c) => sum + c.totalOrders, 0) / customers.length)}
          </p>
          <p className="text-sm text-gray-600">Avg. Orders per Customer</p>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Customers Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 font-medium text-gray-600">Contact</th>
                <th className="text-left py-3 font-medium text-gray-600">Orders</th>
                <th className="text-left py-3 font-medium text-gray-600">Total Spent</th>
                <th className="text-left py-3 font-medium text-gray-600">Last Order</th>
                <th className="text-left py-3 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-primary-600">
                          {customer.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-gray-600">
                    {customer.phone}
                  </td>
                  <td className="py-3 font-medium">
                    {customer.totalOrders}
                  </td>
                  <td className="py-3 font-medium text-primary-600">
                    KES {customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-3 text-gray-600 text-sm">
                    {new Date(customer.lastOrderDate).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button
                        className="text-gray-600 hover:text-primary-600"
                        title="View Customer Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleCall(customer.phone)}
                        className="text-gray-600 hover:text-green-600"
                        title="Call Customer"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleWhatsApp(customer.phone)}
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

        {filteredCustomers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No customers found matching your search</p>
          </div>
        )}
      </Card>

      {/* Top Customers */}
      <Card>
        <h3 className="font-semibold text-lg mb-4">Top Customers by Spending</h3>
        <div className="space-y-3">
          {customers
            .sort((a, b) => b.totalSpent - a.totalSpent)
            .slice(0, 5)
            .map((customer, index) => (
              <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-gray-600">{customer.totalOrders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary-600">
                    KES {customer.totalSpent.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Avg: KES {Math.round(customer.totalSpent / customer.totalOrders)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminCustomers;