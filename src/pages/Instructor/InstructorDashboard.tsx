import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  DollarSign,
  Play,
  Clock,
  Star,
  Eye,
  Edit,
  Youtube,
  Languages,
  Plus
} from 'lucide-react';

export default function InstructorDashboard() {
  const stats = {
    totalCourses: 8,
    totalStudents: 3420,
    totalRevenue: 125000,
    avgRating: 4.7,
    pendingReviews: 12,
    draftCourses: 2,
  };

  const recentCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      students: 1250,
      rating: 4.9,
      revenue: 75000,
      status: 'published',
      lastUpdated: '2024-01-20',
      videosStatus: { en: 12, hi: 10, te: 8 },
      totalLessons: 12
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      students: 680,
      rating: 4.8,
      revenue: 45000,
      status: 'published',
      lastUpdated: '2024-01-18',
      videosStatus: { en: 8, hi: 6, te: 0 },
      totalLessons: 8
    },
    {
      id: '3',
      title: 'JavaScript Testing Fundamentals',
      students: 0,
      rating: 0,
      revenue: 0,
      status: 'draft',
      lastUpdated: '2024-02-01',
      videosStatus: { en: 3, hi: 0, te: 0 },
      totalLessons: 10
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Under Review</span>;
      case 'draft':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Dashboard</h1>
          <p className="text-gray-600">Manage your courses and track performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalCourses}</div>
                <div className="text-sm text-gray-600">Total Courses</div>
                <div className="text-xs text-orange-600">{stats.draftCourses} drafts</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Students</div>
                <div className="text-xs text-green-600">↑ 12% this month</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">₹{(stats.totalRevenue / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
                <div className="text-xs text-purple-600">70% share</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.avgRating}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
                <div className="text-xs text-yellow-600">{stats.pendingReviews} new reviews</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Courses</h2>
                <Link
                  to="/instructor/courses/create"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Course</span>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Course</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Videos</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-600">Students</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-600">Rating</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCourses.map((course) => (
                      <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4">
                          <div>
                            <div className="font-medium text-gray-900">{course.title}</div>
                            <div className="text-sm text-gray-500">Updated {course.lastUpdated}</div>
                          </div>
                        </td>
                        <td className="py-4">
                          {getStatusBadge(course.status)}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <Youtube className="h-4 w-4 text-red-500" />
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {Object.values(course.videosStatus).reduce((a, b) => a + b, 0)}/{course.totalLessons * 3}
                              </div>
                              <div className="text-xs text-gray-500">
                                EN:{course.videosStatus.en} HI:{course.videosStatus.hi} TE:{course.videosStatus.te}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-right">{course.students.toLocaleString()}</td>
                        <td className="py-4 text-right">
                          {course.rating > 0 ? (
                            <div className="flex items-center justify-end space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span>{course.rating}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-700">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-600 hover:text-gray-700">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Performance charts</p>
                  <p className="text-sm text-gray-500">Student engagement and course analytics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/instructor/courses/create"
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors block"
                >
                  <div className="font-medium text-gray-900">Create New Course</div>
                  <div className="text-xs text-gray-500">Upload videos and materials</div>
                </Link>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Bulk Upload Videos</div>
                  <div className="text-xs text-gray-500">Upload multiple YouTube URLs</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Analytics Report</div>
                  <div className="text-xs text-gray-500">Download detailed metrics</div>
                </button>
              </div>
            </div>

            {/* Video Upload Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Video Upload Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Youtube className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">English Videos</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">45/50 Complete</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Youtube className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Hindi Videos</span>
                  </div>
                  <span className="text-sm text-yellow-600 font-medium">32/50 Pending</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Youtube className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Telugu Videos</span>
                  </div>
                  <span className="text-sm text-red-600 font-medium">15/50 Missing</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Play className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New enrollment</p>
                    <p className="text-xs text-gray-600">Web Development Bootcamp</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Youtube className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Video uploaded</p>
                    <p className="text-xs text-gray-600">Hindi version of Lesson 5</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New 5-star review</p>
                    <p className="text-xs text-gray-600">React Patterns course</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}