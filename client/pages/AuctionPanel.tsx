import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users, DollarSign, Clock, Copy, Check } from 'lucide-react';
import Header from '@/components/Header';

export default function AuctionPanel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  const auctionData = {
    id: 1,
    name: 'Cricket Premier League',
    code: 'ABC123',
    description: 'Premier cricket auction event for 2024',
    status: 'active',
    startDate: '2024-03-15',
    totalBudget: 25000,
    spentBudget: 18500,
    teams: 8,
    players: [
      { id: 1, name: 'Player 1', team: 'Team A', price: 50000 },
      { id: 2, name: 'Player 2', team: 'Team B', price: 35000 },
      { id: 3, name: 'Player 3', team: 'Team C', price: 28000 },
    ],
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(auctionData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const remainingBudget = auctionData.totalBudget - auctionData.spentBudget;
  const spentPercentage = (auctionData.spentBudget / auctionData.totalBudget) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/my-auctions')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-8 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to My Auctions
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{auctionData.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 border border-green-300 rounded-full text-xs font-medium">
                    Active
                  </span>
                  <p className="text-slate-600">
                    Code:{' '}
                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1 font-semibold text-slate-900 hover:bg-slate-100 px-2 py-1 rounded transition"
                    >
                      {auctionData.code}
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Budget</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    ${auctionData.totalBudget.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Spent</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    ${auctionData.spentBudget.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Remaining</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    ${remainingBudget.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Teams</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {auctionData.teams}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Budget Progress */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Budget Allocation</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Budget Usage</span>
                <span className="text-sm font-semibold text-slate-900">
                  {spentPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${spentPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>${auctionData.spentBudget.toLocaleString()} spent</span>
                <span>${remainingBudget.toLocaleString()} remaining</span>
              </div>
            </div>
          </div>

          {/* Players Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Players</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Player Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Team
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {auctionData.players.map((player, index) => (
                    <tr
                      key={player.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {player.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{player.team}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        ${player.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-blue-600 hover:text-blue-700 font-medium transition">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
