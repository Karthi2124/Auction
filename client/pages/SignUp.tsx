import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import axios from 'axios';

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    /* VALIDATION */
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    try {
      setLoading(true);

const res = await axios.post(
  `${API}/api/auth/signup`,
  {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    city: formData.city,
    password: formData.password
  }
);


      alert(res.data.msg);

      navigate('/sign-in');

    } catch (err: any) {
      setError(
        err?.response?.data?.msg ||
        'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              Create Account
            </h1>
            <p className="text-slate-600 text-sm">
              Join our auction community today
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* NAME */}
            <InputField
              icon={<User />}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              label="Full Name"
            />

            {/* PHONE */}
            <InputField
              icon={<Phone />}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              label="Phone Number"
            />

            {/* EMAIL */}
            <InputField
              icon={<Mail />}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              label="Email Address"
              type="email"
            />

            {/* CITY */}
            <InputField
              icon={<MapPin />}
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Chennai"
              label="City"
            />

            {/* PASSWORD */}
            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              show={showPassword}
              toggle={() =>
                setShowPassword(!showPassword)
              }
            />

            {/* CONFIRM PASSWORD */}
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              show={showConfirmPassword}
              toggle={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            />

            {/* TERMS */}
            <div className="flex items-start gap-2 mt-4">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) =>
                  setAgreeTerms(e.target.checked)
                }
                className="mt-1 w-4 h-4"
              />
              <p className="text-sm text-slate-600">
                I agree to Terms & Conditions
              </p>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600
              hover:from-purple-700 hover:to-pink-700
              disabled:opacity-50 text-white
              font-semibold py-2.5 rounded-lg"
            >
              {loading
                ? 'Creating Account...'
                : 'Create Account'}
            </button>
          </form>

          {/* SIGN IN */}
          <p className="text-center text-sm mt-6">
            Already have an account?{' '}
            <button
              onClick={() =>
                navigate('/sign-in')
              }
              className="text-purple-600 font-semibold"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function InputField({
  icon,
  label,
  ...props
}: any) {
  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-slate-400">
          {icon}
        </span>
        <input
          {...props}
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
        />
      </div>
    </div>
  );
}

function PasswordInput({
  label,
  show,
  toggle,
  ...props
}: any) {
  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 text-slate-400" />

        <input
          {...props}
          type={show ? 'text' : 'password'}
          className="w-full pl-10 pr-12 py-2.5 border rounded-lg"
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-3"
        >
          {show ? (
            <EyeOff />
          ) : (
            <Eye />
          )}
        </button>
      </div>
    </div>
  );
}
