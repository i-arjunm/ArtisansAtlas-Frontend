export interface Review {
  id: string;
  user: {
    name: string;
    image: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  images: string[];
  category: string;
  inStock: boolean;
  reviews: Review[];
  artisan: {
    id: string;
    name: string;
    location: string;
    rating: number;
    sales: number;
    image: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Artisan {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  location: string;
  bio: string;
  specialties: string[];
  rating: number;
  sales: number;
  joinedDate: string;
  products: Product[];
  reviews: Review[];
  contact: {
    email: string;
    phone?: string;
    website?: string;
    social: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  };
}