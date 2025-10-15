import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../data/mockData';

interface CategoryChipProps {
  category: Category;
  isSelected?: boolean;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ category, isSelected = false }) => {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className={`
        flex flex-col items-center justify-center min-w-[100px] p-3 rounded-lg border transition-all duration-200
        ${isSelected 
          ? 'bg-primary-50 border-primary-200 text-primary-700' 
          : 'bg-white border-gray-200 hover:border-primary-300 hover:bg-primary-50'
        }
      `}
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-12 h-12 rounded-full object-cover mb-2"
        loading="lazy"
      />
      <span className="text-sm font-medium text-center">{category.name}</span>
    </Link>
  );
};

export default CategoryChip;