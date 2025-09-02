import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useGame } from '../../contexts/GameContext';
import { 
  User, 
  LogOut, 
  Settings, 
  BookOpen, 
  Trophy, 
  Award, 
  Heart,
  BarChart3,
  Users,
  CreditCard,
  Menu,
  X,
  Code2
} from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const { stats } = useGame();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileMenu(false);
  };

  const getNavItems = () => {
    if (!user) {
      return [
        { name: 'Home', path: '/' },
        { name: 'Courses', path: '/courses' },
        { name: 'Features', path: '/features' },
        { name: 'Leaderboard', path: '/leaderboard' },
      ];
    }

    switch (user.role) {
      case 'student':
        return [
          { name: 'Home', path: '/' },
          { name: 'Courses', path: '/courses' },
          { name: 'Features', path: '/features' },
          { name: 'My Courses', path: '/my-courses' },
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'Leaderboard', path: '/leaderboard' },
        ];
      case 'instructor':
        return [
          { name: 'Dashboard', path: '/instructor' },
          { name: 'My Courses', path: '/instructor/courses' },
          { name: 'All Courses', path: '/courses' },
        ];
      case 'admin':
        return [
          { name: 'Admin', path: '/admin' },
          { name: 'Users', path: '/admin/users' },
          { name: 'Courses', path: '/admin/courses' },
          { name: 'Payments', path: '/admin/payments' },
        ];
      default:
        return [];
    }
  };

  const getProfileMenuItems = () => {
    const baseItems = [
      { name: 'Profile', icon: User, action: () => console.log('Profile') },
      { name: 'Settings', icon: Settings, action: () => console.log('Settings') },
    ];

    if (user?.role === 'student') {
      return [
        { name: 'My Courses', icon: BookOpen, action: () => navigate('/my-courses') },
        { name: 'Favourites', icon: Heart, action: () => navigate('/favourites') },
        { name: 'Certificates', icon: Award, action: () => navigate('/certificates') },
        { name: 'Leaderboard', icon: Trophy, action: () => navigate('/leaderboard') },
        ...baseItems,
        { name: 'Logout', icon: LogOut, action: handleLogout },
      ];
    }

    if (user?.role === 'instructor') {
      return [
        { name: 'Dashboard', icon: BarChart3, action: () => navigate('/instructor') },
        { name: 'My Courses', icon: BookOpen, action: () => navigate('/instructor/courses') },
        ...baseItems,
        { name: 'Logout', icon: LogOut, action: handleLogout },
      ];
    }

    if (user?.role === 'admin') {
      return [
        { name: 'Admin Dashboard', icon: BarChart3, action: () => navigate('/admin') },
        { name: 'Users', icon: Users, action: () => navigate('/admin/users') },
        { name: 'Courses', icon: BookOpen, action: () => navigate('/admin/courses') },
        { name: 'Payments', icon: CreditCard, action: () => navigate('/admin/payments') },
        ...baseItems,
        { name: 'Logout', icon: LogOut, action: handleLogout },
      ];
    }

    return [...baseItems, { name: 'Logout', icon: LogOut, action: handleLogout }];
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Code2 className="h-8 w-8 text-blue-600 transform group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 scale-0 group-hover:scale-150 transition-transform duration-300"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DCODE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {getNavItems().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    {user.role === 'student' && (
                      <p className="text-xs text-blue-600">Level {stats.level} • {stats.xp} XP</p>
                    )}
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {getProfileMenuItems().map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {getNavItems().map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMobileMenu(false)}
                  className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                <div className="flex flex-col space-y-2 mt-4 px-4">
                  <Link
                    to="/login"
                    onClick={() => setShowMobileMenu(false)}
                    className="text-center text-gray-700 hover:text-blue-600 font-medium py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setShowMobileMenu(false)}
                    className="text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close profile menu */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        ></div>
      )}
    </header>
  );
}