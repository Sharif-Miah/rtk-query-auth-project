"use client";

import React, { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import { selectSubtotal, selectTax, selectTotal } from "@/redux/features/cart/cartSelectors";
import Image from "next/image";
import Link from "next/link";



export default function ShoppingCartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = useSelector(selectSubtotal);
  const tax = useSelector(selectTax);
  const total = useSelector(selectTotal);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            {cartItems.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item: typeof cartItems[number]) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-4 flex gap-4"
              >
                {/* Product Image */}
                <Image
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
                width={96}
                height={96}
                />

                {/* Product Details */}
                <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-blue-600 font-bold text-xl">
                  ${item.price.toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  className="bg-gray-200 text-black cursor-pointer hover:bg-gray-300 p-2 rounded-lg transition"
                  disabled={item.quantity <= 1}
                  >
                  <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-black text-lg w-8 text-center">
                  {item.quantity}
                  </span>
                  <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="bg-gray-200 text-black cursor-pointer hover:bg-gray-300 p-2 rounded-lg transition"
                  >
                  <Plus className="w-4 h-4" />
                  </button>

                  <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-auto bg-red-100 cursor-pointer hover:bg-red-200 text-red-600 p-2 rounded-lg transition"
                  >
                  <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                <p className="text-gray-500 text-sm mb-1">Total</p>
                <p className="font-bold text-xl text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                </div>
              </div>
              ))
            )}
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition mt-4 cursor-pointer">
                Proceed to Checkout
              </button>
            </Link>
            <Link href="/products">
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition mt-3 cursor-pointer">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
