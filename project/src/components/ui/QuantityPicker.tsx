import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({
  value,
  onChange,
  min = 0,
  max = 99,
  size = 'md'
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm'
  };

  const buttonClass = `
    flex items-center justify-center border border-gray-300 
    text-gray-600 hover:bg-gray-50 transition-colors
    ${sizeClasses[size]}
  `;

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min}
        className={`${buttonClass} rounded-l ${value <= min ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </button>
      
      <div className={`flex items-center justify-center border-t border-b border-gray-300 bg-white ${sizeClasses[size]} px-2 font-medium`}>
        {value}
      </div>
      
      <button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max}
        className={`${buttonClass} rounded-r ${value >= max ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
};

export default QuantityPicker;