import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react'; // Removed unused 'Upload'
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useToast } from '../../lib/context/ToastContext';
import {
  getProducts,
  addProduct,
  deleteProduct,
} from '../../lib/supabaseClient';
import { Product } from '../../data/mockData';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { showToast } = useToast();

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    unit: '',
    categoryId: '',
    stock: 0,
    tags: [], // Fixed: Initialize as an empty array
    images: [],
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const products = await getProducts();
      setProducts(products);
    } catch {
      console.error('Failed to fetch products'); // Removed unused 'error'
    } finally {
      setLoading(false);
    }
  };

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts();
  }, []); // Removed 'fetchProducts' from dependency array as it's now top-level

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct(newProduct as Product);
      showToast('Product added successfully!', 'success');
      setShowAddModal(false);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        unit: '',
        categoryId: '',
        stock: 0,
        tags: [],
        images: [],
      });
      fetchProducts(); // Refresh product list
    } catch {
      console.error('Failed to add product'); // Removed unused 'error'
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        showToast('Product deleted successfully!', 'success');
        fetchProducts(); // Refresh product list
      } catch {
        console.error('Failed to delete product'); // Removed unused 'error'
      }
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-gray-900">Products</h1>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>
          Add Product
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Products Table */}
      <Card>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-medium text-gray-600">Product</th>
                  <th className="text-left py-3 font-medium text-gray-600">Price</th>
                  <th className="text-left py-3 font-medium text-gray-600">Stock</th>
                  <th className="text-left py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100">
                    <td className="py-3">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.unit}</p>
                    </td>
                    <td className="py-3 font-medium">KES {product.price}</td>
                    <td className="py-3">
                      <span
                        className={`font-medium ${
                          product.stock <= 5 ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button
                          className="text-gray-600 hover:text-primary-600"
                          title="Edit Product"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-gray-600 hover:text-red-600"
                          title="Delete Product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add New Product</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct((prev) => ({ ...prev, price: parseFloat(e.target.value) }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex space-x-3">
                <Button type="submit" fullWidth>
                  Add Product
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;