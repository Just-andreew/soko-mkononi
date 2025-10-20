import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import Button from '../components/ui/Button';
import CategoryChip from '../components/ui/CategoryChip';
import ProductTile from '../components/ui/ProductTile';
import Card from '../components/ui/Card';
import { categories, products, searchProducts, getProductsByCategory } from '../data/mockData';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular');
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.categoryId === selectedCategory);
    }

    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // popular
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleCategorySelect = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(newCategory);
    
    const newSearchParams = new URLSearchParams(searchParams);
    if (newCategory) {
      newSearchParams.set('category', newCategory);
    } else {
      newSearchParams.delete('category');
    }
    setSearchParams(newSearchParams);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', newSort);
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    setSortBy('popular');
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Shop Groceries'}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <div key={category.id} className="flex-shrink-0">
                <CategoryChip 
                  category={category} 
                  isSelected={selectedCategory === category.id}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear All
                </button>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (KES)
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>KES 0</span>
                    <span>KES {priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Filters Bar */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="sm"
                icon={SlidersHorizontal}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                  aria-label="List view"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Mobile Filters Panel */}
            {showFilters && (
              <Card className="lg:hidden mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range (KES)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>KES 0</span>
                      <span>KES {priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      fullWidth
                    >
                      Clear All
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      fullWidth
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductTile key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="mt-2">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;