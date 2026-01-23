/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import  { useState } from 'react';
import { CreditCard, Lock, ShoppingBag, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { selectSubtotal, selectTax, selectTotal } from '@/redux/features/cart/cartSelectors';

export default function StripeCheckout() {
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    country: 'US',
    zip: ''
  });

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const orderItems = useSelector((state: RootState) => state.cart.items);
  
  const subtotal = useSelector(selectSubtotal);
  const tax = useSelector(selectTax);
  const total = useSelector(selectTotal);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    }
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    }
    if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  // Function to send confirmation email
  const sendConfirmationEmail = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          orderItems: orderItems,
          subtotal: subtotal,
          tax: tax,
          total: total,
          orderDate: new Date().toLocaleDateString(),
        }),
      });

      if (!response.ok) {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.cardNumber || !formData.expiry || !formData.cvc || !formData.name || !formData.zip) {
      alert('Please fill in all fields');
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      setProcessing(false);
      setSuccess(true);
      
      // Send confirmation email after successful payment
      await sendConfirmationEmail();
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center text-black justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-2">Thank you for your order</p>
          <p className="text-2xl font-bold text-green-600 mb-6">${total.toFixed(2)}</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order confirmation sent to</p>
            <p className="font-semibold text-gray-800">{formData.email}</p>
          </div>
          <Link href="/products">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition w-full">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Secure payment powered by Stripe</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div>
              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              {/* Card Information */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card information
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 1234 1234 1234"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-t-lg text-black focus:border-blue-500 focus:outline-none transition"
                  />
                  <CreditCard className="absolute right-4 top-3 w-6 h-6 text-gray-400" />
                </div>
                <div className="grid grid-cols-2 gap-0">
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="px-4 py-3 border-2 border-t-0 border-r-0 text-black border-gray-200 rounded-bl-lg focus:border-blue-500 focus:outline-none transition"
                  />
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    placeholder="CVC"
                    className="px-4 py-3 border-2 border-t-0 border-gray-200 text-black rounded-br-lg focus:border-blue-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Cardholder Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cardholder name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name on card"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-black focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              {/* Country and ZIP */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-2">
                  Billing address
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-t-lg focus:border-blue-500 focus:outline-none transition mb-0"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="ZIP code"
                  className="w-full px-4 py-3 border-2 border-t-0 text-black border-gray-200 rounded-b-lg focus:border-blue-500 focus:outline-none transition"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={processing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 cursor-pointer" />
                    Pay ${total.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 h-fit lg:sticky lg:top-8">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
            </div>

            <div className="space-y-4 mb-6">
              {orderItems.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Free shipping</span> on orders over $50
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}