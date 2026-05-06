import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import API from "../services/api";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async(e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      }
      window.location = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 w-full max-w-md p-8">
          
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Title and Subtitle */}
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-center text-sm mb-8">Enter your credentials to access your account</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm mb-6">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={login} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <span>→</span>}
            </button>
          </form>

          {/* Contact Administrator */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contact your administrator</a>
          </p>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex justify-center gap-4 pb-8">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Systems Operational</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-gray-600">Secure Session</span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© 2024 NEXUS CRM. INSTITUTIONAL TRUST & PRECISION.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
            <a href="#" className="hover:text-gray-700">Security Compliance</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;