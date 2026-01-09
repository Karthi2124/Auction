import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const email = (location.state as any)?.email || 'your@email.com';

  useEffect(() => {
    if (timeLeft === 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, '');
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(
        `input[data-index="${index + 1}"]`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[data-index="${index - 1}"]`
      ) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleResendOTP = () => {
    setTimeLeft(300);
    setIsExpired(false);
    setOtp(['', '', '', '', '', '']);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Verify Email</h1>
            <p className="text-slate-600 text-sm">We've sent a code to your email</p>
          </div>

          {/* Email Display */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-slate-400" />
            <span className="text-slate-700 font-medium text-sm truncate">{email}</span>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  data-index={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  autoFocus={index === 0}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              ))}
            </div>

            {/* Timer */}
            {!isExpired ? (
              <div className="text-center">
                <p className="text-sm text-slate-600">
                  Code expires in{' '}
                  <span className="font-semibold text-emerald-600">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-red-600 font-medium">Code has expired</p>
              </div>
            )}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={!isOtpComplete || loading || isExpired}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="text-center mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-3">Didn't receive the code?</p>
            <button
              onClick={handleResendOTP}
              disabled={!isExpired}
              className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Resend Code
            </button>
          </div>

          {/* Back to Sign In */}
          <button
            type="button"
            onClick={() => navigate('/sign-in')}
            className="w-full mt-4 text-slate-600 hover:text-slate-700 font-medium text-sm py-2 rounded-lg hover:bg-slate-50 transition"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
