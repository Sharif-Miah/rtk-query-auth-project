"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useGetProductsQuery } from "@/redux/features/api/product/productApi";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";

// Types
interface Product {
  thumbnail: string;
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
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">({rating})</span>
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={400}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
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

        <StarRating rating={product.rating} reviews={0} />

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  thumbnail: product.thumbnail,
                  quantity: 1,
                }),
              )
            }
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition flex items-center gap-2"
          >
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
  const { data: products, isLoading, isError } = useGetProductsQuery({});

  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "beauty", "fragrances", "furniture", "groceries"];

  // FIXED: Correct filtering logic
  const filteredProducts =
    filter === "All"
      ? products?.products || []
      : products?.products?.filter(
          (product: Product) => product.category === filter,
        ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
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
              className="w-full px-6 py-4 rounded-full text-white border border-white outline-none"
            />
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b py-7">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition cursor-pointer ${
                  filter === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-600">
              Error loading products. Please try again.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">ShopHub</h3>
          <p className="text-gray-400 mb-6">
            Your one-stop shop for amazing products
          </p>
          <div className="flex items-center justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Contact Us
            </a>
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
