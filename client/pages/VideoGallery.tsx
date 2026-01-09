import { useState } from 'react';
import { Play, Grid, List } from 'lucide-react';
import Header from '@/components/Header';

export default function VideoGallery() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const videos = [
    {
      id: 1,
      title: 'How to Create an Auction',
      description: 'Learn how to create your first auction event step by step',
      category: 'tutorials',
      thumbnail: 'https://via.placeholder.com/400x225?text=How+to+Create',
      duration: '5:30',
      views: 2500,
    },
    {
      id: 2,
      title: 'Auction Tips and Tricks',
      description: 'Advanced strategies for successful bidding',
      category: 'tips',
      thumbnail: 'https://via.placeholder.com/400x225?text=Tips+and+Tricks',
      duration: '8:15',
      views: 1800,
    },
    {
      id: 3,
      title: 'Understanding Bid Mechanics',
      description: 'Deep dive into how bidding works',
      category: 'tutorials',
      thumbnail: 'https://via.placeholder.com/400x225?text=Bid+Mechanics',
      duration: '6:45',
      views: 3200,
    },
    {
      id: 4,
      title: 'Cricket Auction Live Session',
      description: 'Watch a complete cricket auction in action',
      category: 'live',
      thumbnail: 'https://via.placeholder.com/400x225?text=Cricket+Auction',
      duration: '45:20',
      views: 5600,
    },
    {
      id: 5,
      title: 'Managing Your Team Roster',
      description: 'Best practices for team management',
      category: 'tutorials',
      thumbnail: 'https://via.placeholder.com/400x225?text=Team+Management',
      duration: '7:10',
      views: 2100,
    },
    {
      id: 6,
      title: 'Advanced Bidding Strategies',
      description: 'Pro tips for experienced bidders',
      category: 'tips',
      thumbnail: 'https://via.placeholder.com/400x225?text=Advanced+Strategies',
      duration: '9:00',
      views: 1500,
    },
  ];

  const categories = [
    { value: 'all', label: 'All Videos' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'tips', label: 'Tips & Tricks' },
    { value: 'live', label: 'Live Sessions' },
  ];

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(v => v.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Video Gallery</h1>
              <p className="text-slate-600 mt-1">Learn from tutorials and watch live auction sessions</p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8 flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Videos Grid View */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden bg-slate-900 aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                        <Play className="w-6 h-6 ml-1" />
                      </button>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold px-2.5 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full mb-2">
                      {categories.find(c => c.value === video.category)?.label}
                    </span>
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{video.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-lg border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all overflow-hidden flex gap-4 p-4 cursor-pointer group"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden bg-slate-900 rounded-lg w-48 h-28 flex-shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Play className="w-5 h-5 ml-0.5" />
                      </button>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full mb-2">
                        {categories.find(c => c.value === video.category)?.label}
                      </span>
                      <h3 className="font-bold text-slate-900 mb-1">
                        {video.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {video.description}
                      </p>
                    </div>
                    <div className="text-xs text-slate-500">
                      {video.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <div className="bg-white rounded-lg shadow-lg border border-slate-100 px-8 py-12 text-center">
              <Play className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                No videos found
              </h3>
              <p className="text-slate-600 text-sm">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
