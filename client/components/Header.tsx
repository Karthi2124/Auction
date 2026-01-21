import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [secondaryMenuOpen, setSecondaryMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/sign-in');
  };

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'My Auctions', href: '/my-auctions' },
    { label: 'Create', href: '/create-auction' },
  ];

  const secondaryMenuItems = [
    { label: 'Today Auction', href: '/today-auction' },
    { label: 'Upcoming Auction', href: '/upcoming-auction' },
    { label: 'Video Gallery', href: '/video-gallery' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V8.5M16.5 2l-6 6" />
              </svg>
            </div> */}
            <span className="font-bold text-xl text-slate-900 hidden sm:block">
              Auction
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map(item => (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className="text-slate-600 hover:text-slate-900 font-medium transition"
              >
                {item.label}
              </button>
            ))}

            {/* Secondary Menu Dropdown */}
            <div className="relative group">
              <button className="text-slate-600 hover:text-slate-900 font-medium transition flex items-center gap-1">
                More
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {secondaryMenuItems.map(item => (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    className="block w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 font-medium transition first:rounded-t-lg last:rounded-b-lg"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center gap-4 pl-4 border-l border-slate-200">
              <button
                onClick={() => navigate('/profile')}
                className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-600"
                title="Profile"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <nav className="space-y-2 mb-4">
              {menuItems.map(item => (
                <button
                  key={item.href}
                  onClick={() => {
                    navigate(item.href);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition font-medium"
                >
                  {item.label}
                </button>
              ))}

              {/* Secondary Menu in Mobile */}
              <div className="pt-2 mt-2 border-t border-slate-200">
                <button
                  onClick={() => setSecondaryMenuOpen(!secondaryMenuOpen)}
                  className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition font-medium flex items-center justify-between"
                >
                  More
                  <ChevronDown className={`w-4 h-4 transition-transform ${secondaryMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {secondaryMenuOpen && (
                  <div className="space-y-1 mt-1 pl-4">
                    {secondaryMenuItems.map(item => (
                      <button
                        key={item.href}
                        onClick={() => {
                          navigate(item.href);
                          setMenuOpen(false);
                          setSecondaryMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition text-sm"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="border-t border-slate-200 pt-4 space-y-2">
              <button
                onClick={() => {
                  navigate('/profile');
                  setMenuOpen(false);
                }}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition font-medium"
              >
                <User className="w-5 h-5" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
