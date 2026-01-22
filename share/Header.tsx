import { ShoppingCart } from "lucide-react";
import Link from "next/link";


const Header = () => (
  <nav className=" px-6 py-6">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="text-white text-2xl font-bold">Prosper.</div>
      <div className="hidden md:flex items-center gap-8 text-white text-sm">
        <Link href="#" className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link href="/products" className="hover:text-gray-300 transition">
          products
        </Link>
        <Link href="#" className="hover:text-gray-300 transition">
          Services
        </Link>
        <Link href="#" className="hover:text-gray-300 transition">
          Project
        </Link>
        <Link href="/login" className="hover:text-gray-300 transition">
          Login
        </Link>
        <Link href="/register" className="hover:text-gray-300 transition">
          Register
        </Link>
      </div>
      <div className="flex items-center  gap-4">
        <button className="relative">
          <ShoppingCart className="w-6 h-6 text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </div>
  </nav>
);

export default Header;