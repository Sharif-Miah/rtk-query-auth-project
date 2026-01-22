'use client';
import { useLoginMutation } from "@/redux/features/api/auth/authApi";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleLogin = async (credentials: { username: string; password: string }) => {
    try {
      const response = await login(credentials).unwrap();
      console.log("Login successful:", response);
      router.push('/'); // Redirect to dashboard on successful login
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Sign In</h2>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            <Mail strokeWidth={1} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            <Lock strokeWidth={1} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Remember Me</span>
          </label>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
            Forgot Password ?
          </a>
        </div>

        <button
          onClick={() => handleLogin({ username: email, password })}
          className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition duration-200"
        >
          Sign In
        </button>

        <div className="text-center">
          <span className="text-sm text-gray-600">Not a member? </span>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Sign Up now
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm
