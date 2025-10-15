import React, { useState } from 'react';
import { Download, TrendingUp, Calendar, BarChart3, PieChart } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { orders, products, categories } from '../../data/mockData';
import { useToast } from '../../lib/context/ToastContext';

const AdminReports: React.FC = () => {
  const [dateRange, setDateRange] = useState('7');
  const { showToast } = useToast();

  // Calculate metrics based on mock data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalRevenue / orders.length;
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCategories = categories.length;

  // Sales by category
  const salesByCategory = categories.map(category => {
    const categoryOrders = orders.filter(order => 
      order.items.some(item => {
        const product = products.find(p => p.name === item.name);
        return product?.categoryId === category.id;
      })
    );
    const totalSales = categoryOrders.reduce((sum, order) => sum + order.total, 0);
    
    return {
      name: category.name,
      sales: totalSales,
      orders: categoryOrders.length
    };
  }).sort((a, b) => b.sales - a.sales);

  // Top selling products
  const topProducts = products
    .map(product => {
      const productOrders = orders.filter(order =>
        order.items.some(item => item.name === product.name)
      );
      const totalQuantity = productOrders.reduce((sum, order) => {
        const item = order.items.find(i => i.name === product.name);
        return sum + (item?.quantity || 0);
      }, 0);
      
      return {
        ...product,
        totalSold: totalQuantity,
        revenue: totalQuantity * product.price
      };
    })
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5);

  const exportReport = (type: string) => {
    let data: any[] = [];
    let filename = '';

    switch (type) {
      case 'sales':
        data = orders.map(order => [
          order.id,
          order.customer.name,
          order.total,
          order.status,
          order.createdAt
        ]);
        filename = 'sales-report.csv';
        break;
      case 'inventory':
        data = products.map(product => [
          product.name,
          getCategoryName(product.categoryId),
          product.price,
          product.stock,
          product.stock <= 5 ? 'Low Stock' : 'In Stock'
        ]);
        filename = 'inventory-report.csv';
        break;
      case 'customers':
        data = Array.from(new Set(orders.map(o => o.customer.email)))
          .map(email => {
            const customerOrders = orders.filter(o => o.customer.email === email);
            const totalSpent = customerOrders.reduce((sum, o) => sum + o.total, 0);
            return [
              customerOrders[0].customer.name,
              email,
              customerOrders[0].customer.phone,
              customerOrders.length,
              totalSpent
            ];
          });
        filename = 'customers-report.csv';
        break;
    }

    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} report exported successfully!`, 'success');
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-gray-900">
          Reports & Analytics
        </h1>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-primary-600">
                KES {totalRevenue.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">+12.5%</span>
            <span className="text-sm text-gray-600 ml-1">from last period</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Order Value</p>
              <p className="text-2xl font-bold text-blue-600">
                KES {Math.round(averageOrderValue)}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">+8.2%</span>
            <span className="text-sm text-gray-600 ml-1">from last period</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-green-600">{totalOrders}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">+15.3%</span>
            <span className="text-sm text-gray-600 ml-1">from last period</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Products Sold</p>
              <p className="text-2xl font-bold text-yellow-600">
                {orders.reduce((sum, order) => 
                  sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
                )}
              </p>
            </div>
            <PieChart className="h-8 w-8 text-yellow-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">+23.1%</span>
            <span className="text-sm text-gray-600 ml-1">from last period</span>
          </div>
        </Card>
      </div>

      {/* Export Reports */}
      <Card>
        <h3 className="font-semibold text-lg mb-4">Export Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            icon={Download}
            onClick={() => exportReport('sales')}
            fullWidth
          >
            Sales Report (CSV)
          </Button>
          <Button
            variant="outline"
            icon={Download}
            onClick={() => exportReport('inventory')}
            fullWidth
          >
            Inventory Report (CSV)
          </Button>
          <Button
            variant="outline"
            icon={Download}
            onClick={() => exportReport('customers')}
            fullWidth
          >
            Customer Report (CSV)
          </Button>
        </div>
      </Card>

      {/* Sales by Category */}
      <Card>
        <h3 className="font-semibold text-lg mb-4">Sales by Category</h3>
        <div className="space-y-4">
          {salesByCategory.map((category, index) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-sm text-gray-600">{category.orders} orders</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary-600">
                  KES {category.sales.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  {((category.sales / totalRevenue) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Selling Products */}
      <Card>
        <h3 className="font-semibold text-lg mb-4">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium text-gray-600">Product</th>
                <th className="text-left py-3 font-medium text-gray-600">Category</th>
                <th className="text-left py-3 font-medium text-gray-600">Units Sold</th>
                <th className="text-left py-3 font-medium text-gray-600">Revenue</th>
                <th className="text-left py-3 font-medium text-gray-600">Current Stock</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-gray-600">
                    {getCategoryName(product.categoryId)}
                  </td>
                  <td className="py-3 font-medium">
                    {product.totalSold}
                  </td>
                  <td className="py-3 font-medium text-primary-600">
                    KES {product.revenue.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <span className={`font-medium ${
                      product.stock <= 5 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Order Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-lg mb-4">Order Status Breakdown</h3>
          <div className="space-y-3">
            {[
              { status: 'delivered', label: 'Delivered', color: 'bg-green-500' },
              { status: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-blue-500' },
              { status: 'processing', label: 'Processing', color: 'bg-yellow-500' },
              { status: 'pending', label: 'Pending', color: 'bg-orange-500' }
            ].map(({ status, label, color }) => {
              const count = orders.filter(o => o.status === status).length;
              const percentage = (count / orders.length) * 100;
              
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${color}`} />
                    <span>{label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{count}</span>
                    <span className="text-sm text-gray-600">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg mb-4">Inventory Alerts</h3>
          <div className="space-y-3">
            {products
              .filter(product => product.stock <= 5)
              .slice(0, 5)
              .map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-red-900">{product.name}</p>
                      <p className="text-sm text-red-700">Low stock alert</p>
                    </div>
                  </div>
                  <span className="font-bold text-red-600">
                    {product.stock} left
                  </span>
                </div>
              ))}
            {products.filter(product => product.stock <= 5).length === 0 && (
              <p className="text-gray-500 text-center py-4">
                All products are well stocked! 🎉
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;