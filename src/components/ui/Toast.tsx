import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../../lib/context/ToastContext';

interface ToastProps extends ToastMessage {
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const iconColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400'
  };

  const Icon = icons[type];

  return (
    <div className={`flex items-start p-4 rounded-lg border max-w-sm animate-scale-in ${colors[type]}`}>
      <Icon className={`h-5 w-5 mt-0.5 mr-3 ${iconColors[type]}`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-3 text-gray-400 hover:text-gray-600"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;