import React, { useState } from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp } from 'lucide-react';

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7');

  const leaderboardData = [
    {
      rank: 1,
      name: 'Priya Sharma',
      xp: 15420,
      level: 51,
      badges: 28,
      streak: 45,
      avatar: 'PS',
      coursesCompleted: 12
    },
    {
      rank: 2,
      name: 'Arjun Kumar',
      xp: 14850,
      level: 49,
      badges: 25,
      streak: 32,
      avatar: 'AK',
      coursesCompleted: 11
    },
    {
      rank: 3,
      name: 'Sneha Reddy',
      xp: 14200,
      level: 47,
      badges: 23,
      streak: 28,
      avatar: 'SR',
      coursesCompleted: 10
    },
    {
      rank: 4,
      name: 'Rahul Gupta',
      xp: 13750,
      level: 45,
      badges: 22,
      streak: 25,
      avatar: 'RG',
      coursesCompleted: 9
    },
    {
      rank: 5,
      name: 'Anita Patel',
      xp: 13200,
      level: 44,
      badges: 20,
      streak: 22,
      avatar: 'AP',
      coursesCompleted: 8
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return 'h-32';
      case 2: return 'h-24';
      case 3: return 'h-20';
      default: return 'h-16';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Leaderboard</h1>
          <p className="text-lg text-gray-600">See how you rank among fellow learners</p>
        </div>

        {/* Period Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {[
              { value: '7', label: 'Last 7 Days' },
              { value: '30', label: 'Last 30 Days' },
              { value: 'all', label: 'All Time' },
            ].map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <div className="flex items-end justify-center space-x-8 mb-8">
            {/* Second Place */}
            <div className="text-center">
              <div className={`bg-gradient-to-t from-gray-300 to-gray-100 rounded-t-lg ${getPodiumHeight(2)} w-24 flex items-end justify-center pb-4 mb-4`}>
                <span className="text-2xl font-bold text-gray-700">2</span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2 mx-auto">
                {leaderboardData[1].avatar}
              </div>
              <h3 className="font-semibold text-gray-900">{leaderboardData[1].name}</h3>
              <p className="text-sm text-gray-600">{leaderboardData[1].xp.toLocaleString()} XP</p>
            </div>

            {/* First Place */}
            <div className="text-center">
              <div className={`bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-t-lg ${getPodiumHeight(1)} w-24 flex items-end justify-center pb-4 mb-4`}>
                <Crown className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2 mx-auto ring-4 ring-yellow-300">
                {leaderboardData[0].avatar}
              </div>
              <h3 className="font-semibold text-gray-900">{leaderboardData[0].name}</h3>
              <p className="text-sm text-gray-600">{leaderboardData[0].xp.toLocaleString()} XP</p>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-xs text-yellow-600 font-medium">Champion</span>
              </div>
            </div>

            {/* Third Place */}
            <div className="text-center">
              <div className={`bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg ${getPodiumHeight(3)} w-24 flex items-end justify-center pb-4 mb-4`}>
                <span className="text-2xl font-bold text-amber-800">3</span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2 mx-auto">
                {leaderboardData[2].avatar}
              </div>
              <h3 className="font-semibold text-gray-900">{leaderboardData[2].name}</h3>
              <p className="text-sm text-gray-600">{leaderboardData[2].xp.toLocaleString()} XP</p>
            </div>
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Complete Rankings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Learner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    XP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badges
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Streak
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((user, index) => (
                  <tr 
                    key={user.rank}
                    className={`hover:bg-gray-50 transition-colors ${
                      index < 3 ? 'bg-gradient-to-r from-blue-50/50 to-purple-50/50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(user.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                          user.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                          user.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                          user.rank === 3 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                          'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}>
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          {user.rank <= 3 && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs text-yellow-600">Top Performer</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900">{user.level}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {user.xp.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {user.badges} badges
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <span className="text-orange-500">🔥</span>
                        <span className="text-sm font-medium text-gray-900">{user.streak}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{user.coursesCompleted}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2,547</div>
                <div className="text-sm text-gray-600">Total Learners</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">89,450</div>
                <div className="text-sm text-gray-600">XP This Week</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">156</div>
                <div className="text-sm text-gray-600">Badges Earned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}