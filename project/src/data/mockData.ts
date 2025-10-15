// Mock data for the application

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  unit: string;
  pricePerUnit: number;
  categoryId: string;
  images: string[];
  stock: number;
  tags: string[];
  frequentlyBoughtWith: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    unit: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentMethod: 'mpesa' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'paid' | 'failed';
  address: {
    area: string;
    line: string;
    notes?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const categories: Category[] = [
  {
    id: 'fruits',
    name: 'Fruits',
    slug: 'fruits',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Fresh seasonal fruits'
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    slug: 'vegetables',
    image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Farm fresh vegetables'
  },
  {
    id: 'dairy',
    name: 'Dairy',
    slug: 'dairy',
    image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Fresh milk and dairy products'
  },
  {
    id: 'staples',
    name: 'Staples',
    slug: 'staples',
    image: 'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Rice, flour, and essential staples'
  },
  {
    id: 'snacks',
    name: 'Snacks',
    slug: 'snacks',
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Healthy snacks and treats'
  },
  {
    id: 'drinks',
    name: 'Drinks',
    slug: 'drinks',
    image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Fresh juices and beverages'
  }
];

export const products: Product[] = [
  // Fruits
  {
    id: 'fresh-mangoes',
    name: 'Fresh Mangoes',
    slug: 'fresh-mangoes',
    description: 'Sweet and ripe mangoes from local farms. Perfect for eating fresh or making juice.',
    price: 200,
    currency: 'KES',
    unit: '500g',
    pricePerUnit: 400,
    categoryId: 'fruits',
    images: [
      'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/918940/pexels-photo-918940.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 50,
    tags: ['fruit', 'seasonal', 'vitamin-c'],
    frequentlyBoughtWith: ['bananas', 'oranges'],
    rating: 4.8,
    reviewCount: 24,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'bananas',
    name: 'Bananas',
    slug: 'bananas',
    description: 'Fresh bananas, perfect for breakfast or smoothies. Rich in potassium and natural sugars.',
    price: 120,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 120,
    categoryId: 'fruits',
    images: [
      'https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 30,
    tags: ['fruit', 'potassium', 'energy'],
    frequentlyBoughtWith: ['fresh-mangoes', 'apples'],
    rating: 4.6,
    reviewCount: 18,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'oranges',
    name: 'Sweet Oranges',
    slug: 'oranges',
    description: 'Juicy sweet oranges packed with vitamin C. Great for fresh juice or eating.',
    price: 180,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 180,
    categoryId: 'fruits',
    images: [
      'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 40,
    tags: ['fruit', 'vitamin-c', 'citrus'],
    frequentlyBoughtWith: ['lemons', 'fresh-mangoes'],
    rating: 4.7,
    reviewCount: 31,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'apples',
    name: 'Red Apples',
    slug: 'apples',
    description: 'Crisp and sweet red apples. Perfect for snacking or adding to salads.',
    price: 250,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 250,
    categoryId: 'fruits',
    images: [
      'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 25,
    tags: ['fruit', 'fiber', 'antioxidants'],
    frequentlyBoughtWith: ['bananas', 'grapes'],
    rating: 4.5,
    reviewCount: 12,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },

  // Vegetables
  {
    id: 'tomatoes',
    name: 'Fresh Tomatoes',
    slug: 'tomatoes',
    description: 'Ripe, juicy tomatoes perfect for cooking, salads, and sauces.',
    price: 100,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 100,
    categoryId: 'vegetables',
    images: [
      'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 60,
    tags: ['vegetable', 'vitamin-c', 'lycopene'],
    frequentlyBoughtWith: ['onions', 'capsicum'],
    rating: 4.9,
    reviewCount: 45,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'onions',
    name: 'Red Onions',
    slug: 'onions',
    description: 'Fresh red onions, essential for cooking. Strong flavor and aroma.',
    price: 80,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 80,
    categoryId: 'vegetables',
    images: [
      'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 45,
    tags: ['vegetable', 'cooking-essential'],
    frequentlyBoughtWith: ['tomatoes', 'garlic'],
    rating: 4.4,
    reviewCount: 29,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'capsicum',
    name: 'Bell Peppers',
    slug: 'capsicum',
    description: 'Colorful bell peppers, great for stir-fries and salads. Sweet and crunchy.',
    price: 200,
    currency: 'KES',
    unit: '500g',
    pricePerUnit: 400,
    categoryId: 'vegetables',
    images: [
      'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 35,
    tags: ['vegetable', 'vitamin-c', 'colorful'],
    frequentlyBoughtWith: ['tomatoes', 'onions'],
    rating: 4.6,
    reviewCount: 16,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'spinach',
    name: 'Fresh Spinach',
    slug: 'spinach',
    description: 'Fresh green spinach leaves, packed with iron and vitamins. Great for salads and cooking.',
    price: 60,
    currency: 'KES',
    unit: '250g',
    pricePerUnit: 240,
    categoryId: 'vegetables',
    images: [
      'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 20,
    tags: ['vegetable', 'iron', 'leafy-green'],
    frequentlyBoughtWith: ['carrots', 'kale'],
    rating: 4.7,
    reviewCount: 22,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },

  // Dairy
  {
    id: 'fresh-milk',
    name: 'Fresh Milk',
    slug: 'fresh-milk',
    description: 'Fresh whole milk from local farms. Rich in calcium and protein.',
    price: 65,
    currency: 'KES',
    unit: '500ml',
    pricePerUnit: 130,
    categoryId: 'dairy',
    images: [
      'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 40,
    tags: ['dairy', 'calcium', 'protein'],
    frequentlyBoughtWith: ['bread', 'eggs'],
    rating: 4.8,
    reviewCount: 38,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'eggs',
    name: 'Farm Eggs',
    slug: 'eggs',
    description: 'Fresh farm eggs from free-range chickens. Perfect for breakfast and baking.',
    price: 300,
    currency: 'KES',
    unit: '30 pieces',
    pricePerUnit: 10,
    categoryId: 'dairy',
    images: [
      'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 50,
    tags: ['protein', 'farm-fresh', 'free-range'],
    frequentlyBoughtWith: ['fresh-milk', 'bread'],
    rating: 4.9,
    reviewCount: 42,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },

  // Staples
  {
    id: 'white-rice',
    name: 'White Rice',
    slug: 'white-rice',
    description: 'Premium quality white rice, perfect for daily meals. Well-cleaned and aromatic.',
    price: 120,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 120,
    categoryId: 'staples',
    images: [
      'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 100,
    tags: ['staple', 'carbohydrate', 'grain'],
    frequentlyBoughtWith: ['cooking-oil', 'salt'],
    rating: 4.5,
    reviewCount: 67,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'wheat-flour',
    name: 'Wheat Flour',
    slug: 'wheat-flour',
    description: 'Fine wheat flour for baking and cooking. Perfect for chapatis, cakes, and bread.',
    price: 110,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 110,
    categoryId: 'staples',
    images: [
      'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stock: 80,
    tags: ['flour', 'baking', 'staple'],
    frequentlyBoughtWith: ['sugar', 'cooking-oil'],
    rating: 4.6,
    reviewCount: 34,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customer: {
      name: 'Sarah Mwangi',
      phone: '+254712345678',
      email: 'sarah@example.com'
    },
    items: [
      { productId: 'fresh-mangoes', name: 'Fresh Mangoes', quantity: 2, price: 200, unit: '500g' },
      { productId: 'tomatoes', name: 'Fresh Tomatoes', quantity: 1, price: 100, unit: '1kg' }
    ],
    subtotal: 500,
    deliveryFee: 50,
    total: 550,
    status: 'out_for_delivery',
    paymentMethod: 'mpesa',
    paymentStatus: 'paid',
    address: {
      area: 'Parklands',
      line: 'Parklands Road, Block 15, Apt 204',
      notes: 'Call when you arrive'
    },
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z'
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'James Kiprotich',
      phone: '+254798765432',
      email: 'james@example.com'
    },
    items: [
      { productId: 'bananas', name: 'Bananas', quantity: 2, price: 120, unit: '1kg' },
      { productId: 'fresh-milk', name: 'Fresh Milk', quantity: 4, price: 65, unit: '500ml' },
      { productId: 'eggs', name: 'Farm Eggs', quantity: 1, price: 300, unit: '30 pieces' }
    ],
    subtotal: 800,
    deliveryFee: 50,
    total: 850,
    status: 'processing',
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'pending',
    address: {
      area: 'Highridge',
      line: 'Highridge Estate, House 42',
      notes: ''
    },
    createdAt: '2024-01-20T15:20:00Z',
    updatedAt: '2024-01-20T15:20:00Z'
  }
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getTopPickProducts = (): Product[] => {
  // Return products sorted by rating, limit to 6
  return products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
};