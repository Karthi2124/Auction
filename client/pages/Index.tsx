import { useNavigate } from 'react-router-dom';
import { Gavel, Zap, Trophy, Users, ArrowRight } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Gavel className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white hidden sm:block">Auction Hub</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/sign-in')}
                className="text-slate-300 hover:text-white font-medium transition"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/sign-up')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-blue-900/50 border border-blue-700 text-blue-300 rounded-full text-sm font-semibold">
              Welcome to the Future of Auctions
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Bid. Win. Celebrate.
          </h1>

          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Experience the thrill of competitive auctions. Create events, invite friends, and manage your bids all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => navigate('/sign-up')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/sign-in')}
              className="flex items-center gap-2 border border-slate-600 hover:border-slate-500 text-white font-bold px-8 py-4 rounded-lg transition-all hover:bg-slate-800"
            >
              Sign In
            </button>
          </div>

          {/* Hero Image / Visual */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 p-8 sm:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                    <Gavel className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Create Auctions</h3>
                  <p className="text-slate-400 text-sm text-center">
                    Set up your own auction events with custom rules and budgets
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Compete & Win</h3>
                  <p className="text-slate-400 text-sm text-center">
                    Bid against others and claim victory in thrilling competitions
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Invite Friends</h3>
                  <p className="text-slate-400 text-sm text-center">
                    Share auction codes and invite your friends to participate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-slate-400 text-lg">Everything you need to run successful auctions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Real-time bidding and instant notifications' },
              { icon: Trophy, title: 'Leaderboards', desc: 'Track rankings and achievements' },
              { icon: Users, title: 'Social', desc: 'Connect and compete with friends' },
              { icon: Gavel, title: 'Full Control', desc: 'Manage every aspect of your auctions' },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-slate-700/50 border border-slate-600 rounded-2xl p-6 hover:border-blue-500 transition-all group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Auctioning?</h2>
          <p className="text-xl text-slate-300 mb-10">
            Join thousands of users enjoying exciting auctions. Sign up for free today.
          </p>
          <button
            onClick={() => navigate('/sign-up')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-10 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Create Your Account
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>&copy; 2024 Auction Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
