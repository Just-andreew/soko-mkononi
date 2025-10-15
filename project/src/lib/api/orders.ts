import { supabase } from '../supabaseClient';
import { Order, OrderItem, CreateOrderRequest } from '../../types/supabase';

// Create a new order with items
export const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
  try {
    // Insert the main order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.user_id,
        total: orderData.total,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // Insert order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      throw new Error(`Failed to create order items: ${itemsError.message}`);
    }

    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Fetch orders for a specific user
export const fetchUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_id,
          quantity,
          price
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch user orders: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

// Fetch all orders for admin view
export const fetchAllOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        users (
          id,
          name,
          phone,
          address
        ),
        order_items (
          id,
          product_id,
          quantity,
          price
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch all orders: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      throw new Error(`Failed to update order status: ${error.message}`);
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Fetch single order by ID
export const fetchOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        users (
          id,
          name,
          phone,
          address
        ),
        order_items (
          id,
          product_id,
          quantity,
          price
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Order not found
      }
      throw new Error(`Failed to fetch order: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};