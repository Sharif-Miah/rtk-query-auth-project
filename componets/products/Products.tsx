'use client'

import React, { useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

// Types
interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

interface StarRatingProps {
  rating: number;
  reviews: number;
}

// Star Rating Component
const StarRating: React.FC<StarRatingProps> = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">({reviews})</span>
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
        <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>

        <StarRating rating={product.rating} reviews={product.reviews} />

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Products Page
const ProductsPageComponent = () => {
  const products: Product[] = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      price: 299.99,
      rating: 5,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      category: "Electronics"
    },
    {
      id: 2,
      title: "Smart Watch Series 5",
      price: 399.99,
      rating: 4,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      category: "Wearables"
    },
    {
      id: 3,
      title: "Leather Laptop Bag",
      price: 149.99,
      rating: 5,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      category: "Accessories"
    },
    {
      id: 4,
      title: "Minimalist Desk Lamp",
      price: 79.99,
      rating: 4,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop",
      category: "Home"
    },
    {
      id: 5,
      title: "Professional Camera",
      price: 1299.99,
      rating: 5,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop",
      category: "Electronics"
    },
    {
      id: 6,
      title: "Designer Sunglasses",
      price: 199.99,
      rating: 4,
      reviews: 423,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
      category: "Fashion"
    },
    {
      id: 7,
      title: "Wireless Keyboard",
      price: 129.99,
      rating: 5,
      reviews: 289,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
      category: "Electronics"
    },
    {
      id: 8,
      title: "Running Shoes Pro",
      price: 159.99,
      rating: 5,
      reviews: 512,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      category: "Sports"
    },
    {
      id: 9,
      title: "Ceramic Coffee Mug Set",
      price: 49.99,
      rating: 4,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop",
      category: "Home"
    },
    {
      id: 10,
      title: "Bluetooth Speaker",
      price: 89.99,
      rating: 5,
      reviews: 634,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
      category: "Electronics"
    },
    {
      id: 11,
      title: "Travel Backpack",
      price: 119.99,
      rating: 4,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      category: "Travel"
    },
    {
      id: 12,
      title: "Fitness Tracker Band",
      price: 79.99,
      rating: 4,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=600&fit=crop",
      category: "Wearables"
    }
  ];

  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Electronics", "Wearables", "Fashion", "Home", "Sports", "Travel", "Accessories"];

  const filteredProducts = filter === "All" 
    ? products 
    : products.filter(product => product.category === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">ShopHub</h1>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition">Home</a>
              <a href="#" className="text-gray-900 font-medium">Products</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">Discover Amazing Products</h2>
          <p className="text-xl text-blue-100 mb-8">
            Shop the latest trends and find your perfect match
          </p>
          <div className="max-w-2xl mx-auto">
            <input
              type="search"
              placeholder="Search for products..."
              className="w-full px-6 py-4 rounded-full text-gray-900 outline-none focus:ring-4 focus:ring-blue-300"
            />
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition ${
                  filter === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900">
            {filter === "All" ? "All Products" : filter}
          </h3>
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">ShopHub</h3>
          <p className="text-gray-400 mb-6">
            Your one-stop shop for amazing products
          </p>
          <div className="flex items-center justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            © 2026 ShopHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPageComponent;