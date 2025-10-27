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
      'https://images.pexels.com/photos/365810/pexels-photo-365810.jpeg?auto=compress&cs=tinysrgb&w=600'
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
  {
    id: 'mangos',
    name: 'Mangos',
    slug: 'mangos',
    description: 'Sweet and ripe mangos',
    price: 130,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 130,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/11552820/pexels-photo-11552820.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'tropical'],
    frequentlyBoughtWith: ['bananas', 'pineapple'],
    rating: 4.5,
    reviewCount: 10,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    slug: 'pineapple',
    description: 'Tropical and tangy pineapple',
    price: 150,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 150,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'tropical'],
    frequentlyBoughtWith: ['mangos', 'dragon-fruit'],
    rating: 4.7,
    reviewCount: 15,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'dragon-fruit',
    name: 'Dragon Fruit',
    slug: 'dragon-fruit',
    description: 'Exotic dragon fruit',
    price: 500,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 500,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/5945902/pexels-photo-5945902.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'exotic'],
    frequentlyBoughtWith: ['mangos', 'kiwi'],
    rating: 4.8,
    reviewCount: 20,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'tangerine',
    name: 'Tangerine',
    slug: 'tangerine',
    description: 'Sweet tangerines',
    price: 500,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 500,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/3903202/pexels-photo-3903202.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'citrus'],
    frequentlyBoughtWith: ['oranges', 'lemons'],
    rating: 4.6,
    reviewCount: 18,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'local-orange',
    name: 'Local Orange',
    slug: 'local-orange',
    description: 'Locally grown oranges',
    price: 100,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 100,
    categoryId: 'fruits',
    images: ['https://thefreshmarket.co.ke/wp-content/uploads/2020/05/local-oranges.jpg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'citrus'],
    frequentlyBoughtWith: ['oranges', 'tangerine'],
    rating: 4.4,
    reviewCount: 25,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'imported-oranges',
    name: 'Imported Oranges',
    slug: 'imported-oranges',
    description: 'Imported oranges',
    price: 300,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 300,
    categoryId: 'fruits',
    images: ['https://www.health.com/thmb/9nsTGcBM-Oln1lL2OTzhCSkuIj8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Health-Stocksy_txp5e95690asrw300_Medium_934585-e870449543284eed8aa4be52fc09a4ed.jpg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'citrus'],
    frequentlyBoughtWith: ['oranges', 'lemons'],
    rating: 4.5,
    reviewCount: 30,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'imported-lemon',
    name: 'Imported Lemon',
    slug: 'imported-lemon',
    description: 'Imported lemons',
    price: 300,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 300,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/266346/pexels-photo-266346.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'citrus'],
    frequentlyBoughtWith: ['oranges', 'tangerine'],
    rating: 4.6,
    reviewCount: 28,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'grapes',
    name: 'Grapes',
    slug: 'grapes',
    description: 'Fresh grapes',
    price: 350,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 350,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'fresh'],
    frequentlyBoughtWith: ['bananas', 'apples'],
    rating: 4.7,
    reviewCount: 35,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'green-grapes',
    name: 'Green Grapes',
    slug: 'green-grapes',
    description: 'Fresh green grapes',
    price: 400,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 400,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/60021/grapes-wine-fruit-vines-60021.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'fresh'],
    frequentlyBoughtWith: ['bananas', 'apples'],
    rating: 4.8,
    reviewCount: 40,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    slug: 'watermelon',
    description: 'Juicy watermelons',
    price: 60,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 60,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/2894205/pexels-photo-2894205.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'citrus'],
    frequentlyBoughtWith: ['oranges', 'tangerine'],
    rating: 4.3,
    reviewCount: 22,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'sweet-melon',
    name: 'Sweet Melon',
    slug: 'sweet-melon',
    description: 'Sweet and juicy melons',
    price: 120,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 120,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/2920403/pexels-photo-2920403.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'fresh'],
    frequentlyBoughtWith: ['bananas', 'apples'],
    rating: 4.5,
    reviewCount: 18,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'canteloupe',
    name: 'Canteloupe',
    slug: 'canteloupe',
    description: 'Fresh canteloupe',
    price: 200,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 200,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/2920403/pexels-photo-2920403.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'fresh'],
    frequentlyBoughtWith: ['bananas', 'apples'],
    rating: 4.6,
    reviewCount: 20,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate',
    slug: 'pomegranate',
    description: 'Juicy pomegranates',
    price: 500,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 500,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/3084219/pexels-photo-3084219.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'fresh'],
    frequentlyBoughtWith: ['bananas', 'apples'],
    rating: 4.9,
    reviewCount: 25,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'kiwi',
    name: 'Kiwi',
    slug: 'kiwi',
    description: 'Exotic kiwi fruits',
    price: 500,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 500,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/5945706/pexels-photo-5945706.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'exotic'],
    frequentlyBoughtWith: ['mangos', 'dragon-fruit'],
    rating: 4.8,
    reviewCount: 30,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'pawpaw',
    name: 'Pawpaw',
    slug: 'pawpaw',
    description: 'Fresh pawpaw',
    price: 150,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 150,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/4113812/pexels-photo-4113812.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'tropical'],
    frequentlyBoughtWith: ['mangos', 'pineapple'],
    rating: 4.5,
    reviewCount: 15,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'avocado',
    name: 'Avocado',
    slug: 'avocado',
    description: 'Creamy avocados',
    price: 100,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 100,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/5945640/pexels-photo-5945640.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'fresh'],
    frequentlyBoughtWith: ['bananas', 'apples'],
    rating: 4.6,
    reviewCount: 20,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'guava',
    name: 'Guava',
    slug: 'guava',
    description: 'Tropical guavas',
    price: 500,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 500,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/14766833/pexels-photo-14766833.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'tropical'],
    frequentlyBoughtWith: ['mangos', 'pineapple'],
    rating: 4.7,
    reviewCount: 25,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    slug: 'strawberry',
    description: 'Fresh strawberries',
    price: 180,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 180,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'fresh'],
    frequentlyBoughtWith: ['bananas', 'apples'],
    rating: 4.6,
    reviewCount: 22,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    slug: 'blueberry',
    description: 'Fresh blueberries',
    price: 350,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 350,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/2539170/pexels-photo-2539170.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'fresh'],
    frequentlyBoughtWith: ['bananas', 'apples'],
    rating: 4.7,
    reviewCount: 20,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'raspberry',
    name: 'Raspberry',
    slug: 'raspberry',
    description: 'Fresh raspberries',
    price: 200,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 200,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/2682661/pexels-photo-2682661.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'fresh'],
    frequentlyBoughtWith: ['bananas', 'apples'],
    rating: 4.6,
    reviewCount: 18,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'gooseberry',
    name: 'Gooseberry',
    slug: 'gooseberry',
    description: 'Fresh gooseberries',
    price: 150,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 150,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/46541/currant-immature-mature-bush-46541.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'fresh'],
    frequentlyBoughtWith: ['bananas', 'apples'],
    rating: 4.5,
    reviewCount: 15,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: 'blackberry',
    name: 'Blackberry',
    slug: 'blackberry',
    description: 'Fresh blackberries',
    price: 300,
    currency: 'KES',
    unit: '1kg',
    pricePerUnit: 300,
    categoryId: 'fruits',
    images: ['https://images.pexels.com/photos/134581/blackberries-bramble-berries-bush-134581.jpeg?auto=compress&cs=tinysrgb&w=600'],
    stock: 100,
    tags: ['fruit', 'fresh'],
    frequentlyBoughtWith: ['bananas', 'apples'],
    rating: 4.7,
    reviewCount: 20,
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
      'https://images.pexels.com/photos/10899480/pexels-photo-10899480.jpeg?auto=compress&cs=tinysrgb&w=600'
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
    price: 400,
    currency: 'KES',
    unit: '500g',
    pricePerUnit: 400,
    categoryId: 'vegetables',
    images: [
      'https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg?auto=compress&cs=tinysrgb&w=600'
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