import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  TrendingUp, 
  Award,
  Bell,
  BarChart3,
  Calendar,
  Eye
} from 'lucide-react';

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7');

  const stats = {
    totalUsers: 15420,
    totalCourses: 245,
    totalRevenue: 2845000,
    activeUsers: 8900,
    newSignups: 156,
    courseSubmissions: 23,
    pendingPayments: 12,
    avgRating: 4.8,
  };

  const recentActivity = [
    { type: 'user', action: 'New instructor registered', user: 'Dr. Sarah Wilson', time: '2 hours ago' },
    { type: 'course', action: 'Course submitted for review', course: 'Advanced React Patterns', time: '4 hours ago' },
    { type: 'payment', action: 'Payment processed', amount: '₹2,999', time: '6 hours ago' },
    { type: 'certificate', action: 'Certificate issued', user: 'Rahul Kumar', time: '8 hours ago' },
  ];

  const topCourses = [
    { title: 'Complete Web Development', enrollments: 1250, revenue: 375000, rating: 4.9 },
    { title: 'Python for Data Science', enrollments: 890, revenue: 0, rating: 4.8 },
    { title: 'React Native Development', enrollments: 670, revenue: 234300, rating: 4.7 },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4 text-blue-500" />;
      case 'course': return <BookOpen className="h-4 w-4 text-green-500" />;
      case 'payment': return <CreditCard className="h-4 w-4 text-purple-500" />;
      case 'certificate': return <Award className="h-4 w-4 text-yellow-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your DCODE platform</p>
        </div>

        {/* Period Selection */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Period:</span>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 3 Months</option>
              <option value="365">Last Year</option>
            </select>
          </div>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Send Notification</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Users</div>
                <div className="text-xs text-green-600 font-medium">+{stats.newSignups} this week</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalCourses}</div>
                <div className="text-sm text-gray-600">Total Courses</div>
                <div className="text-xs text-orange-600 font-medium">{stats.courseSubmissions} pending approval</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
                <div className="text-xs text-purple-600 font-medium">{stats.pendingPayments} pending</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Active Users</div>
                <div className="text-xs text-green-600 font-medium">↑ 12% vs last week</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charts and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                <BarChart3 className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Revenue chart visualization</p>
                  <p className="text-sm text-gray-500">Integration with Chart.js recommended</p>
                </div>
              </div>
            </div>

            {/* Top Performing Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Courses</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Course</th>
                      <th className="text-right py-2 text-sm font-medium text-gray-600">Enrollments</th>
                      <th className="text-right py-2 text-sm font-medium text-gray-600">Revenue</th>
                      <th className="text-right py-2 text-sm font-medium text-gray-600">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCourses.map((course, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3">
                          <div className="font-medium text-gray-900">{course.title}</div>
                        </td>
                        <td className="py-3 text-right text-gray-600">{course.enrollments.toLocaleString()}</td>
                        <td className="py-3 text-right text-gray-600">
                          {course.revenue > 0 ? `₹${(course.revenue / 100000).toFixed(1)}L` : 'Free'}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <span className="text-gray-900 font-medium">{course.rating}</span>
                            <span className="text-yellow-400">★</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Create Instructor</div>
                  <div className="text-xs text-gray-500">Add new instructor account</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Review Courses</div>
                  <div className="text-xs text-gray-500">{stats.courseSubmissions} pending</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Manage Badges</div>
                  <div className="text-xs text-gray-500">Configure XP rules</div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600 truncate">
                        {activity.user || activity.course || activity.amount}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment Gateway</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Video Streaming</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Monitoring
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}