import { supabase } from '../supabaseClient';
import { User, UpdateUserProfileRequest } from '../../types/supabase';

// Fetch user profile by ID
export const fetchUserProfile = async (userId: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // User not found
      }
      throw new Error(`Failed to fetch user profile: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: UpdateUserProfileRequest): Promise<User> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update user profile: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Fetch all customers for admin view
export const fetchAllCustomers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'customer')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch customers: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Update user role (admin only)
export const updateUserRole = async (userId: string, role: 'customer' | 'admin'): Promise<void> => {
  try {
    const { error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to update user role: ${error.message}`);
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};