// Database types for Supabase integration

export interface User {
  id: string;
  name: string | null;
  phone: string | null;
  address: string | null;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  total: number;
  created_at: string;
  // Joined data
  user?: User;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  // Product details (from mockData)
  product_name?: string;
  product_unit?: string;
  product_image?: string;
}

export interface CreateOrderRequest {
  user_id: string;
  total: number;
  items: Array<{
    product_id: string;
    quantity: number;
    price: number;
    product_name: string;
    product_unit: string;
    product_image: string;
  }>;
}

export interface UpdateUserProfileRequest {
  name?: string;
  phone?: string;
  address?: string;
}