import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (!password) {
      setError('Please enter password');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        'http://localhost:5000/api/auth/signin',
        { email, password }
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      alert('Login successful');

      navigate('/dashboard');

    } catch (err: any) {
      setError(
        err?.response?.data?.msg ||
        'Invalid credentials'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    alert('Google login coming soon 🙂');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600 text-sm">
              Sign in to your auction account
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border rounded-lg"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
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

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700
              hover:from-blue-700 hover:to-blue-800
              disabled:opacity-50 text-white font-semibold
              py-2.5 rounded-lg transition"
            >
              {loading
                ? 'Signing in...'
                : 'Sign In'}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">
                or
              </span>
            </div>
          </div>

          {/* GOOGLE */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full border py-2.5 rounded-lg
            hover:bg-slate-50 font-medium"
          >
            Continue with Google
          </button>

          {/* SIGNUP */}
          <p className="text-center text-sm mt-6">
            Don't have an account?{' '}
            <button
              onClick={() =>
                navigate('/sign-up')
              }
              className="text-blue-600 font-semibold"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
