import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Hash, Search } from 'lucide-react';
import Header from '@/components/Header';

export default function JoinAuction() {
  const navigate = useNavigate();
  const [auctionCode, setAuctionCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!auctionCode.trim()) {
      setError('Please enter an auction code');
      return;
    }

    if (auctionCode.length !== 6) {
      setError('Auction code must be 6 characters');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate(`/auction-panel/join/${auctionCode}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-8 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Join an Auction</h1>
            <p className="text-slate-600 mt-1">
              Enter a code to participate in an existing auction event
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="px-8 py-8 md:p-12">
              {/* Illustration */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Hash className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleJoin} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Enter Auction Code
                  </label>
                  <input
                    type="text"
                    value={auctionCode}
                    onChange={(e) => setAuctionCode(e.target.value.toUpperCase())}
                    placeholder="ABC123"
                    maxLength={6}
                    className="w-full px-4 py-3 text-center text-2xl font-bold letter-spacing tracking-widest border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition uppercase"
                  />
                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <Search className="w-3 h-3" />
                    Get the code from your auction host
                  </p>
                </div>

                {/* Join Button */}
                <button
                  type="submit"
                  disabled={loading || auctionCode.length !== 6}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {loading ? 'Joining Auction...' : 'Join Auction'}
                </button>
              </form>

              {/* Info Section */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">How it works</h3>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                      1
                    </div>
                    <div>
                      <p className="text-slate-900 font-medium text-sm">
                        Get the code from your host
                      </p>
                      <p className="text-slate-600 text-sm">
                        Ask the auction organizer for the invitation code
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                      2
                    </div>
                    <div>
                      <p className="text-slate-900 font-medium text-sm">
                        Enter the code above
                      </p>
                      <p className="text-slate-600 text-sm">
                        Copy the 6-character code into the input field
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                      3
                    </div>
                    <div>
                      <p className="text-slate-900 font-medium text-sm">
                        Join and participate
                      </p>
                      <p className="text-slate-600 text-sm">
                        Start bidding and participating in the auction
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
