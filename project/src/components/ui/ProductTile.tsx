import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import Button from './Button';
import QuantityPicker from './QuantityPicker';
import { useCart } from '../../lib/context/CartContext';
import { Product } from '../../data/mockData';

interface ProductTileProps {
  product: Product;
  showQuantity?: boolean;
}

const ProductTile: React.FC<ProductTileProps> = ({ product, showQuantity = false }) => {
  const { addItem, items } = useCart();
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.images[0]
    });
  };

  return (
    <Link to={`/item/${product.id}`} className="group">
      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-card hover:shadow-soft transition-all duration-200 group-hover:scale-[1.02]">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          {product.stock <= 5 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Low Stock
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 group-hover:text-primary-600">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-semibold text-primary-600">
                {product.currency} {product.price}
              </span>
              <span className="text-sm text-gray-500">· {product.unit}</span>
            </div>
            <div className="text-xs text-gray-500">
              {product.currency} {product.pricePerUnit} per {product.unit}
            </div>
          </div>

          {/* Add to Cart */}
          {showQuantity && quantity > 0 ? (
            <QuantityPicker
              value={quantity}
              onChange={() => {}} // Handled by cart context
              size="sm"
            />
          ) : (
            <Button
              size="sm"
              fullWidth
              icon={ShoppingCart}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductTile;