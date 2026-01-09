import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    setLoading(true);
    setError('');
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/otp-verification', { state: { email } });
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    // Simulate Google sign in
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V8.5M16.5 2l-6 6" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-600 text-sm">Sign in to your auction account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSendOTP} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">We'll send a one-time code to your email</p>
            </div>

            {/* Password Field - Optional for future use */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-slate-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Send OTP Button */}
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-all mt-6"
            >
              {loading ? 'Sending Code...' : 'Send Verification Code'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">or</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2.5 rounded-lg transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.26620228 9.26149114V13.0369141H8.90492016C8.62477979 14.1395349 7.95408821 15.4104986 6.94360086 16.0368453C5.71120551 16.8118002 4.08856410 17.01935 2.69474631 16.3460695C1.54545466 15.8421722 0.5788101043 14.6128862 0.5788101043 12.582857C0.5788101043 11.1272571 1.25896516 9.92728975 2.69474631 9.42684464C3.90176761 8.99220055 5.50332000 9.23455553 6.58786899 10.3888822L8.81669950 8.08670893C7.02232200 6.38946899 4.56105715 5.52908403 2.23125289 5.52908403C0.939508768 5.52908403 -0.218472550 5.80890137 -0.860625735 6.63265306C-0.494193266 6.98990272 -0.860625735 6.63265306 -0.860625735 6.63265306" />
              <path fill="#4285F4" d="M12.3365341 10.0744717C13.1886554 10.0744717 13.9954492 10.3436013 14.6289457 10.8859383V5.42784771H10.4387340V13.6512850H14.6289457V11.7278296C13.9954492 12.2701666 13.1886554 12.5392962 12.3365341 12.5392962Z" />
              <path fill="#34A853" d="M5.26620228 9.26149114V13.0369141H8.90492016C8.62477979 14.1395349 7.95408821 15.4104986 6.94360086 16.0368453C5.71120551 16.8118002 4.08856410 17.01935 2.69474631 16.3460695C1.54545466 15.8421722 0.5788101043 14.6128862 0.5788101043 12.582857C0.5788101043 11.1272571 1.25896516 9.92728975 2.69474631 9.42684464C3.90176761 8.99220055 5.50332000 9.23455553 6.58786899 10.3888822L8.81669950 8.08670893C7.02232200 6.38946899 4.56105715 5.52908403 2.23125289 5.52908403" />
              <path fill="#FBBC04" d="M5.26620228 9.26149114L8.04832000 11.7278296L8.04832000 11.7278296C8.62477979 11.1395349 9.02980857 10.4104986 9.30994893 9.58450532L12.3365341 10.0744717L12.3365341 10.0744717C11.9770099 11.0428849 11.4240635 11.8859383 10.6289457 12.4278296" />
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-slate-600 text-sm mt-6">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/sign-up')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
