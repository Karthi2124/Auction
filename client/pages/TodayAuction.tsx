import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Trophy, Filter, Play } from 'lucide-react';
import Header from '@/components/Header';

export default function TodayAuction() {
  const navigate = useNavigate();
  const [filterPosition, setFilterPosition] = useState('');

  const todayAuctions = [
    {
      id: 1,
      name: 'Cricket Premier League - Morning Session',
      sport: 'Cricket',
      startTime: '09:00 AM',
      endTime: '12:00 PM',
      teams: 8,
      players: 45,
      status: 'live',
      progress: 65,
    },
    {
      id: 2,
      name: 'IPL 2024 - Afternoon Auction',
      sport: 'Cricket',
      startTime: '02:00 PM',
      endTime: '06:00 PM',
      teams: 10,
      players: 120,
      status: 'upcoming',
      progress: 0,
    },
    {
      id: 3,
      name: 'Football Tournament Auction',
      sport: 'Football',
      startTime: '07:00 PM',
      endTime: '10:00 PM',
      teams: 6,
      players: 50,
      status: 'upcoming',
      progress: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 animate-pulse';
      case 'upcoming':
        return 'bg-blue-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Today's Auctions</h1>
            <p className="text-slate-600 mt-1">Live and upcoming auctions for today</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
              <p className="text-slate-600 text-sm font-medium">Live Auctions</p>
              <p className="text-3xl font-bold text-red-600 mt-2">1</p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
              <p className="text-slate-600 text-sm font-medium">Upcoming Today</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">2</p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
              <p className="text-slate-600 text-sm font-medium">Total Teams</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">24</p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
              <p className="text-slate-600 text-sm font-medium">Total Players</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">215</p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-4 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <Filter className="w-5 h-5 text-slate-600" />
              <select
                value={filterPosition}
                onChange={(e) => setFilterPosition(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">All Sports Types</option>
                <option value="cricket">Cricket</option>
                <option value="football">Football</option>
                <option value="kabaddi">Kabaddi</option>
                <option value="basketball">Basketball</option>
              </select>
            </div>
          </div>

          {/* Auctions Grid */}
          <div className="space-y-4">
            {todayAuctions.map((auction) => (
              <div
                key={auction.id}
                className="bg-white rounded-lg shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Auction Header */}
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(auction.status)}`}>
                          <span className={`w-2 h-2 rounded-full ${getStatusDot(auction.status)}`} />
                          {auction.status === 'live' ? 'LIVE NOW' : 'UPCOMING'}
                        </span>
                        <span className="text-xs font-medium text-slate-500">{auction.sport}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{auction.name}</h3>
                    </div>
                    <button
                      onClick={() => navigate(`/auction-panel/${auction.id}`)}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap"
                    >
                      <Play className="w-4 h-4" />
                      Enter Auction
                    </button>
                  </div>
                </div>

                {/* Progress Bar (for live auctions) */}
                {auction.status === 'live' && (
                  <div className="px-6 py-3 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Auction Progress</span>
                      <span className="text-sm font-semibold text-slate-900">{auction.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-300 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${auction.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Auction Details */}
                <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-600">Time</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {auction.startTime} - {auction.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-600">Teams</p>
                      <p className="text-sm font-semibold text-slate-900">{auction.teams}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-600">Players</p>
                      <p className="text-sm font-semibold text-slate-900">{auction.players}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {todayAuctions.length === 0 && (
            <div className="bg-white rounded-lg shadow-lg border border-slate-100 px-8 py-12 text-center">
              <Clock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                No auctions today
              </h3>
              <p className="text-slate-600 text-sm">
                Check back later or browse upcoming auctions
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
