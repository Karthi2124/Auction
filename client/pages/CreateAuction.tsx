import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Calendar, Clock, Settings } from 'lucide-react';
import Header from '@/components/Header';

export default function CreateAuction() {
  const navigate = useNavigate();
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [formData, setFormData] = useState({
    logo: null as File | null,
    sportsType: 'cricket',
    auctionName: '',
    auctionDate: '',
    season: '',
    auctionTime: '',
    pointsPerTeam: '100',
    baseBid: '',
    bidIncreaseBy: '',
    minPlayersPerTeam: '11',
    maxPlayersPerTeam: '15',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sportsTypes = [
    { value: 'cricket', label: 'Cricket' },
    { value: 'football', label: 'Football' },
    { value: 'kabaddi', label: 'Kabaddi' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'hockey', label: 'Hockey' },
  ];

  const seasons = [
    { value: 'ipl', label: 'IPL Season' },
    { value: 'domestic', label: 'Domestic Season' },
    { value: 'international', label: 'International' },
    { value: 'custom', label: 'Custom' },
  ];

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.auctionName || !formData.auctionDate || !formData.auctionTime) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.baseBid || !formData.bidIncreaseBy) {
      setError('Please enter bid information');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/my-auctions');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
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
            <h1 className="text-3xl font-bold text-slate-900">Create New Auction</h1>
            <p className="text-slate-600 mt-1">
              Set up a new auction event with complete details
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="px-8 py-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Logo Upload Section */}
                <div className="border-b border-slate-200 pb-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Auction Logo
                  </h3>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                        <div className="border-2 border-dashed border-slate-300 rounded-lg px-6 py-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                          {logoPreview ? (
                            <div className="space-y-2">
                              <img src={logoPreview} alt="Logo preview" className="h-24 w-24 mx-auto object-cover rounded-lg" />
                              <p className="text-sm text-slate-600">Click to change logo</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                              <p className="font-medium text-slate-700">Drop your logo here</p>
                              <p className="text-xs text-slate-500">or click to browse</p>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-lg p-6">
                      <p className="text-sm font-medium text-slate-700 mb-3">Requirements</p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li>• Format: JPG, PNG</li>
                        <li>• Size: Max 5MB</li>
                        <li>• Dimensions: 500x500px or higher</li>
                        <li>• Square aspect ratio recommended</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="border-b border-slate-200 pb-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Auction Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Auction Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="auctionName"
                        value={formData.auctionName}
                        onChange={handleChange}
                        placeholder="e.g., IPL 2024 Mega Auction"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                      />
                    </div>

                    {/* Sports Type */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Sports Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="sportsType"
                        value={formData.sportsType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                      >
                        {sportsTypes.map(sport => (
                          <option key={sport.value} value={sport.value}>{sport.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Auction Date */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Auction Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                          type="date"
                          name="auctionDate"
                          value={formData.auctionDate}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          required
                        />
                      </div>
                    </div>

                    {/* Auction Time */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Auction Time <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                          type="time"
                          name="auctionTime"
                          value={formData.auctionTime}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          required
                        />
                      </div>
                    </div>

                    {/* Season */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Season <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                      >
                        <option value="">Select a season</option>
                        {seasons.map(season => (
                          <option key={season.value} value={season.value}>{season.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Auction Settings */}
                <div className="border-b border-slate-200 pb-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Auction Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Points Per Team */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Points Per Team
                      </label>
                      <input
                        type="number"
                        name="pointsPerTeam"
                        value={formData.pointsPerTeam}
                        onChange={handleChange}
                        placeholder="100"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>

                    {/* Base Bid */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Base Bid <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-400 font-medium">$</span>
                        <input
                          type="number"
                          name="baseBid"
                          value={formData.baseBid}
                          onChange={handleChange}
                          placeholder="10000"
                          className="w-full pl-7 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          required
                        />
                      </div>
                    </div>

                    {/* Bid Increase By */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Bid Increase By <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-400 font-medium">$</span>
                        <input
                          type="number"
                          name="bidIncreaseBy"
                          value={formData.bidIncreaseBy}
                          onChange={handleChange}
                          placeholder="5000"
                          className="w-full pl-7 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          required
                        />
                      </div>
                    </div>

                    {/* Min Players Per Team */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Min Players Per Team
                      </label>
                      <input
                        type="number"
                        name="minPlayersPerTeam"
                        value={formData.minPlayersPerTeam}
                        onChange={handleChange}
                        placeholder="11"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>

                    {/* Max Players Per Team */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Max Players Per Team
                      </label>
                      <input
                        type="number"
                        name="maxPlayersPerTeam"
                        value={formData.maxPlayersPerTeam}
                        onChange={handleChange}
                        placeholder="15"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">💡 Tip:</span> After creating your auction, you can manage teams, players, categories, and customize the auction settings. You'll receive a unique code to share with other participants.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {loading ? 'Creating Auction...' : 'Create Auction'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
