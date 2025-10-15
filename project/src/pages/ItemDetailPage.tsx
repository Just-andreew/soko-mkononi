import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Truck } from 'lucide-react';
import Button from '../components/ui/Button';
import QuantityPicker from '../components/ui/QuantityPicker';
import ProductTile from '../components/ui/ProductTile';
import Card from '../components/ui/Card';
import { getProductById, products } from '../data/mockData';
import { useCart } from '../lib/context/CartContext';
import { useToast } from '../lib/context/ToastContext';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = id ? getProductById(id) : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/shop">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.images[0]
      });
    }
    showToast(`${quantity} ${product.name} added to cart`, 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary-600">Shop</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.stock <= 5 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 rounded">
                  Only {product.stock} left
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-medium">{product.rating}</span>
                    <span className="text-gray-600">({product.reviewCount} reviews)</span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    In Stock ({product.stock})
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg"
                  aria-label="Share product"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  className="p-2 text-gray-600 hover:text-red-600 border border-gray-300 rounded-lg"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-primary-600">
                  {product.currency} {product.price}
                </span>
                <span className="text-lg text-gray-500">per {product.unit}</span>
              </div>
              <p className="text-gray-600 mt-1">
                {product.currency} {product.pricePerUnit} per {product.unit}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <QuantityPicker
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={product.stock}
                  />
                </div>
                <div className="flex-1">
                  <Button
                    size="lg"
                    fullWidth
                    icon={ShoppingCart}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    Add to Cart - {product.currency} {product.price * quantity}
                  </Button>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <Card className="bg-green-50 border-green-200">
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">
                    Free delivery on orders above KES 1,000
                  </p>
                  <p className="text-sm text-green-700">
                    Delivered within 2-4 hours in Parklands area
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductTile key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ItemDetailPage;