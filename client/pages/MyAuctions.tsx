import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Trophy, MoreVertical, Plus, Settings, Users2, Layers, Copy } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';

export default function MyAuctions() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');
  const [selectedAuction, setSelectedAuction] = useState<number | null>(null);
  const [showManageMenu, setShowManageMenu] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const auctions = [
    {
      id: 1,
      name: 'Cricket Premier League',
      status: 'active',
      teams: 8,
      date: '2024-03-15',
      value: '$25,000',
      code: 'CPL123',
      totalPlayers: 120,
      categories: 3,
    },
    {
      id: 2,
      name: 'T20 Championship',
      status: 'upcoming',
      teams: 6,
      date: '2024-03-20',
      value: '$15,000',
      code: 'T20456',
      totalPlayers: 80,
      categories: 2,
    },
    {
      id: 3,
      name: 'Test Series Auction',
      status: 'completed',
      teams: 4,
      date: '2024-03-10',
      value: '$8,000',
      code: 'TSA789',
      totalPlayers: 60,
      categories: 2,
    },
    {
      id: 4,
      name: 'World Cup Fantasy',
      status: 'active',
      teams: 12,
      date: '2024-03-18',
      value: '$32,000',
      code: 'WCF000',
      totalPlayers: 200,
      categories: 4,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-slate-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredAuctions = auctions.filter(auction => {
    if (activeTab === 'all') return true;
    return auction.status === activeTab;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const managementOptions = [
    { label: 'Manage Auction', icon: Settings },
    { label: 'Manage Teams', icon: Users2 },
    { label: 'Manage Players', icon: Users },
    { label: 'Manage Categories', icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Auctions</h1>
              <p className="text-slate-600 mt-1">Create, manage, and monitor your auction events</p>
            </div>
            <button
              onClick={() => navigate('/create-auction')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Create New
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-md border border-slate-100 mb-8 overflow-hidden">
            <div className="flex border-b border-slate-200">
              {[
                { value: 'all' as const, label: 'All Auctions', count: auctions.length },
                { value: 'active' as const, label: 'Active', count: auctions.filter(a => a.status === 'active').length },
                { value: 'upcoming' as const, label: 'Upcoming', count: auctions.filter(a => a.status === 'upcoming').length },
                { value: 'completed' as const, label: 'Completed', count: auctions.filter(a => a.status === 'completed').length },
              ].map(tab => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex-1 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.value
                      ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label} <span className="ml-2 text-sm font-semibold">({tab.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Auctions Grid */}
          {filteredAuctions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuctions.map((auction) => (
                <div
                  key={auction.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-100 hover:border-slate-200 overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                        {auction.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(auction.status)}`}>
                          <span className={`w-2 h-2 rounded-full ${getStatusDot(auction.status)}`} />
                          {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {/* More Options */}
                    <div className="relative">
                      <button
                        onClick={() => setShowManageMenu(showManageMenu === auction.id ? null : auction.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-400"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Management Menu */}
                      {showManageMenu === auction.id && (
                        <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
                          {managementOptions.map((option, idx) => {
                            const Icon = option.icon;
                            return (
                              <button
                                key={idx}
                                className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition first:rounded-t-lg last:rounded-b-lg border-b border-slate-100 last:border-b-0"
                              >
                                <Icon className="w-4 h-4 text-slate-500" />
                                <span className="font-medium text-sm">{option.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-6 py-4 space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600">Teams</p>
                        <p className="text-lg font-bold text-slate-900">{auction.teams}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600">Players</p>
                        <p className="text-lg font-bold text-slate-900">{auction.totalPlayers}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600">Categories</p>
                        <p className="text-lg font-bold text-slate-900">{auction.categories}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600">Value</p>
                        <p className="text-lg font-bold text-slate-900">{auction.value}</p>
                      </div>
                    </div>

                    {/* Date and Code */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{auction.date}</span>
                      </div>

                      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                        <span className="text-sm font-mono font-semibold text-blue-900">{auction.code}</span>
                        <button
                          onClick={() => handleCopyCode(auction.code)}
                          className="text-blue-600 hover:text-blue-700 transition"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-slate-50 flex gap-3 border-t border-slate-100">
                    <button 
                      onClick={() => navigate(`/auction-panel/${auction.id}`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-sm transition"
                    >
                      {auction.status === 'completed' ? 'View Results' : 'Enter Auction'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-8 py-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-slate-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                No {activeTab !== 'all' ? activeTab : ''} auctions
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                Create your first auction to get started
              </p>
              <button
                onClick={() => navigate('/create-auction')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all"
              >
                Create Your First Auction
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
