import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Trophy, Filter } from 'lucide-react';
import Header from '@/components/Header';

export default function UpcomingAuction() {
  const navigate = useNavigate();
  const [filterSport, setFilterSport] = useState('');
  const [filterMonth, setFilterMonth] = useState('');

  const upcomingAuctions = [
    {
      id: 1,
      name: 'IPL 2024 Mega Auction',
      sport: 'Cricket',
      date: '2024-03-20',
      month: 'March',
      time: '10:00 AM',
      teams: 10,
      players: 150,
      capacity: 1000,
    },
    {
      id: 2,
      name: 'Domestic Cricket Auction',
      sport: 'Cricket',
      date: '2024-03-25',
      month: 'March',
      time: '02:00 PM',
      teams: 8,
      players: 120,
      capacity: 800,
    },
    {
      id: 3,
      name: 'Football League 2024',
      sport: 'Football',
      date: '2024-04-05',
      month: 'April',
      time: '05:00 PM',
      teams: 12,
      players: 200,
      capacity: 1200,
    },
    {
      id: 4,
      name: 'Kabaddi Championship',
      sport: 'Kabaddi',
      date: '2024-04-15',
      month: 'April',
      time: '04:00 PM',
      teams: 6,
      players: 60,
      capacity: 600,
    },
    {
      id: 5,
      name: 'Basketball Tournament Auction',
      sport: 'Basketball',
      date: '2024-05-10',
      month: 'May',
      time: '06:00 PM',
      teams: 8,
      players: 80,
      capacity: 800,
    },
  ];

  const sports = [
    { value: 'cricket', label: 'Cricket' },
    { value: 'football', label: 'Football' },
    { value: 'kabaddi', label: 'Kabaddi' },
    { value: 'basketball', label: 'Basketball' },
  ];

  const months = [
    { value: 'March', label: 'March 2024' },
    { value: 'April', label: 'April 2024' },
    { value: 'May', label: 'May 2024' },
  ];

  const filteredAuctions = upcomingAuctions.filter(auction => {
    const sportMatch = !filterSport || auction.sport.toLowerCase() === filterSport;
    const monthMatch = !filterMonth || auction.month === filterMonth;
    return sportMatch && monthMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Upcoming Auctions</h1>
            <p className="text-slate-600 mt-1">Browse and join upcoming auction events</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
              <p className="text-slate-600 text-sm font-medium">Total Upcoming</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{filteredAuctions.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
              <p className="text-slate-600 text-sm font-medium">Total Teams</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {filteredAuctions.reduce((sum, a) => sum + a.teams, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
              <p className="text-slate-600 text-sm font-medium">Total Players</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {filteredAuctions.reduce((sum, a) => sum + a.players, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
              <p className="text-slate-600 text-sm font-medium">Capacity</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {filteredAuctions.reduce((sum, a) => sum + a.capacity, 0)}
              </p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-4 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <Filter className="w-5 h-5 text-slate-600" />
              <select
                value={filterSport}
                onChange={(e) => setFilterSport(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">All Sports Types</option>
                {sports.map(sport => (
                  <option key={sport.value} value={sport.value}>{sport.label}</option>
                ))}
              </select>

              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">All Months</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>

              {(filterSport || filterMonth) && (
                <button
                  onClick={() => {
                    setFilterSport('');
                    setFilterMonth('');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Auctions Grid */}
          {filteredAuctions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuctions.map((auction) => {
                const auctionDate = new Date(auction.date);
                const daysFromNow = Math.ceil((auctionDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                return (
                  <div
                    key={auction.id}
                    className="bg-white rounded-lg shadow-md border border-slate-100 hover:shadow-lg transition-all overflow-hidden group cursor-pointer"
                    onClick={() => navigate(`/auction-panel/${auction.id}`)}
                  >
                    {/* Card Header */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-slate-100">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                          {auction.sport}
                        </span>
                        <span className="text-xs font-bold text-slate-600">
                          {daysFromNow} days away
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                        {auction.name}
                      </h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4">
                      {/* Date and Time */}
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-600">Date & Time</p>
                          <p className="text-sm font-semibold text-slate-900">
                            {new Date(auction.date).toLocaleDateString()} at {auction.time}
                          </p>
                        </div>
                      </div>

                      {/* Teams and Players */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3">
                          <Users className="w-4 h-4 text-slate-600" />
                          <div>
                            <p className="text-xs text-slate-600">Teams</p>
                            <p className="text-sm font-bold text-slate-900">{auction.teams}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3">
                          <Trophy className="w-4 h-4 text-slate-600" />
                          <div>
                            <p className="text-xs text-slate-600">Players</p>
                            <p className="text-sm font-bold text-slate-900">{auction.players}</p>
                          </div>
                        </div>
                      </div>

                      {/* Capacity */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-600 font-medium">Capacity: {auction.capacity}</p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg transition-all">
                        Reserve Spot
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg border border-slate-100 px-8 py-12 text-center">
              <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                No matching auctions
              </h3>
              <p className="text-slate-600 text-sm">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
