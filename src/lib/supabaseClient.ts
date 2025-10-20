import { createClient } from '@supabase/supabase-js';
import { Product } from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// Helper function to check if user is admin
export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    
    return data?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};


// Helper functions for product management

// Fetch all products
export const getProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  return data;
};

// Fetch a single product by ID
export const getProductById = async (id: string) => {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
  return data;
};

// Add a new product
export const addProduct = async (product: Product) => {
  const { data, error } = await supabase.from('products').insert([product]);
  if (error) {
    console.error('Error adding product:', error);
    throw error;
  }
  return data;
};

// Update an existing product
export const updateProduct = async (id: string, product: Partial<Product>) => {
  const { data, error } = await supabase.from('products').update(product).eq('id', id);
  if (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
  return data;
};

// Delete a product
export const deleteProduct = async (id: string) => {
  const { data, error } = await supabase.from('products').delete().eq('id', id);
  if (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
  return data;
};