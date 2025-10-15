import React, { useState } from 'react';
import { Plus, Edit, Trash2, Upload, Search, Filter, FolderOpen } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { products, categories, Category } from '../../data/mockData';
import { useToast } from '../../lib/context/ToastContext';

const AdminProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const { showToast } = useToast();

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    unit: '',
    categoryId: '',
    stock: 0,
    tags: '',
    images: [] as string[]
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    image: ''
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock add product - replace with actual API call
    showToast('Product added successfully!', 'success');
    setShowAddModal(false);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      unit: '',
      categoryId: '',
      stock: 0,
      tags: '',
      images: []
    });
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock add category - replace with actual API call
    showToast('Category added successfully!', 'success');
    setShowAddCategoryModal(false);
    setNewCategory({ name: '', slug: '', description: '', image: '' });
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This will affect all products in this category.')) {
      // Mock delete - replace with actual API call
      showToast('Category deleted successfully!', 'success');
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const handleCategoryNameChange = (name: string) => {
    setNewCategory(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Mock image upload - in production, upload to cloud storage
      const mockUrls = Array.from(files).map(file => 
        `https://images.pexels.com/photos/1234567/placeholder.jpeg`
      );
      setNewProduct(prev => ({
        ...prev,
        images: [...prev.images, ...mockUrls]
      }));
      showToast('Images uploaded successfully!', 'success');
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Mock delete - replace with actual API call
      showToast('Product deleted successfully!', 'success');
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-gray-900">
          Products
        </h1>
        <div className="flex space-x-3">
          {activeTab === 'products' ? (
            <Button
              icon={Plus}
              onClick={() => setShowAddModal(true)}
            >
              Add Product
            </Button>
          ) : (
            <Button
              icon={Plus}
              onClick={() => setShowAddCategoryModal(true)}
            >
              Add Category
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'products'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'categories'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Categories ({categories.length})
          </button>
        </nav>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <>
          {/* Search and Filters */}
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <Button variant="outline" icon={Filter}>
                More Filters
              </Button>
            </div>
          </Card>

          {/* Products Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-medium text-gray-600">Product</th>
                    <th className="text-left py-3 font-medium text-gray-600">Category</th>
                    <th className="text-left py-3 font-medium text-gray-600">Price</th>
                    <th className="text-left py-3 font-medium text-gray-600">Stock</th>
                    <th className="text-left py-3 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100">
                      <td className="py-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
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
                        KES {product.price}
                      </td>
                      <td className="py-3">
                        <span className={`font-medium ${
                          product.stock <= 5 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProduct(product.id)}
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
            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No products found matching your criteria</p>
              </div>
            )}
          </Card>
        </>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="relative group">
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <button
                      className="p-1 bg-white rounded shadow text-gray-600 hover:text-primary-600"
                      title="Edit Category"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-1 bg-white rounded shadow text-gray-600 hover:text-red-600"
                      title="Delete Category"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">/{category.slug}</span>
                  <span className="text-sm text-primary-600 font-medium">
                    {products.filter(p => p.categoryId === category.id).length} products
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-screen overflow-y-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newProduct.categoryId}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, categoryId: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (KES) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1kg, 500g, 1pc"
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, unit: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., fresh, organic, vitamin-c"
                  value={newProduct.tags}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop images here, or click to select
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="outline" size="sm" type="button">
                      Select Images
                    </Button>
                  </label>
                </div>
                {newProduct.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {newProduct.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                    ))}
                  </div>
                )}
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

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add New Category</h3>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => handleCategoryNameChange(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Fresh Fruits"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, slug: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., fresh-fruits"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated from name</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Brief description of the category"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button type="submit" fullWidth>
                  Add Category
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => setShowAddCategoryModal(false)}
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