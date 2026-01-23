'use client';

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Header = () => {

 const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );


  return (
      <nav className=" px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <Link href="/">Shop Prosper.</Link>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white text-sm">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-300 transition">
            products
          </Link>
          <Link href="/login" className="hover:text-gray-300 transition">
            Login
          </Link>
          <Link href="/register" className="hover:text-gray-300 transition">
            Register
          </Link>
        </div>
        <div className="flex items-center  gap-4">
          <Link href="/shoppingcart" className="relative">
            <ShoppingCart className="w-6 h-6 text-white" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
