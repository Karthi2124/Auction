import { useNavigate } from 'react-router-dom';
import { Plus, Gavel, Users, Trophy, Settings, TrendingUp, Clock, Zap } from 'lucide-react';
import Header from '@/components/Header';

export default function Dashboard() {
  const navigate = useNavigate();

  const actionCards = [
    {
      id: 1,
      title: 'Create Auction',
      description: 'Start a new auction event',
      icon: Plus,
      color: 'from-blue-500 to-cyan-500',
      action: () => navigate('/create-auction'),
    },
    {
      id: 2,
      title: 'Join Auction',
      description: 'Enter an existing auction',
      icon: Gavel,
      color: 'from-purple-500 to-pink-500',
      action: () => navigate('/join-auction'),
    },
    {
      id: 3,
      title: 'My Auctions',
      description: 'Manage your auctions',
      icon: Trophy,
      color: 'from-amber-500 to-orange-500',
      action: () => navigate('/my-auctions'),
    },
    {
      id: 4,
      title: 'Profile',
      description: 'View your profile',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      action: () => navigate('/profile'),
    },
  ];

  // Mock auction counts data
  const auctionCounts = {
    activeAuctions: 3,
    upcomingAuctions: 5,
    completedAuctions: 12,
    totalParticipants: 156,
  };

  // Mock live and upcoming auctions
  const liveAuctions = [
    {
      id: 1,
      name: 'Cricket Premier League - Live',
      sport: 'Cricket',
      teams: 8,
      progress: 65,
      timeLeft: '2h 30m',
    },
  ];

  const upcomingAuctions = [
    {
      id: 2,
      name: 'T20 Championship',
      sport: 'Cricket',
      startTime: '02:00 PM',
      date: 'Today',
    },
    {
      id: 3,
      name: 'Football League 2024',
      sport: 'Football',
      startTime: '05:00 PM',
      date: 'Tomorrow',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
            <p className="text-lg text-slate-600">Welcome back! Here's what's happening with your auctions</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-600 text-sm font-medium">Active Auctions</p>
                <Zap className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{auctionCounts.activeAuctions}</p>
              <p className="text-xs text-slate-500 mt-2">Currently running</p>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-600 text-sm font-medium">Upcoming Auctions</p>
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{auctionCounts.upcomingAuctions}</p>
              <p className="text-xs text-slate-500 mt-2">Scheduled soon</p>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-600 text-sm font-medium">Completed</p>
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{auctionCounts.completedAuctions}</p>
              <p className="text-xs text-slate-500 mt-2">All time</p>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-600 text-sm font-medium">Participants</p>
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{auctionCounts.totalParticipants}</p>
              <p className="text-xs text-slate-500 mt-2">Total users</p>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {actionCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <button
                    key={card.id}
                    onClick={card.action}
                    className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200 text-left"
                  >
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative p-6 flex flex-col h-full">
                      {/* Icon Container */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>

                      {/* Text Content */}
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-600 flex-grow">
                        {card.description}
                      </p>

                      {/* Arrow Icon */}
                      <div className="flex items-center gap-2 mt-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300">
                        <span className="text-xs font-semibold uppercase tracking-wide">Open</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>


          {/* Upcoming Auctions Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="px-6 py-8 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900">Upcoming Auctions</h2>
              <p className="text-slate-600 text-sm mt-1">Don't miss these upcoming events</p>
            </div>

            {upcomingAuctions.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {upcomingAuctions.map((auction) => (
                  <div key={auction.id} className="px-6 py-6 hover:bg-slate-50 transition-all cursor-pointer" onClick={() => navigate('/upcoming-auction')}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{auction.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {auction.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {auction.startTime}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                            {auction.sport}
                          </span>
                        </div>
                      </div>
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <Clock className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600">No upcoming auctions scheduled</p>
              </div>
            )}

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => navigate('/upcoming-auction')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
              >
                View all upcoming auctions
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Icon placeholder
function Calendar(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
