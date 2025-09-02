import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Bell, 
  Play, 
  Pause,
  RotateCcw,
  Settings,
  User,
  BookOpen,
  Trophy,
  Heart
} from 'lucide-react';

export default function MobileApp() {
  const [isOffline, setIsOffline] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'New lesson available', course: 'Web Development', time: '2 min ago', read: false },
    { id: '2', title: 'Assignment due tomorrow', course: 'Python Basics', time: '1 hour ago', read: false },
    { id: '3', title: 'Certificate earned!', course: 'JavaScript', time: '2 hours ago', read: true },
  ]);

  const downloadedCourses = [
    {
      id: '1',
      title: 'Web Development Basics',
      progress: 65,
      downloadedLessons: 8,
      totalLessons: 12,
      size: '2.4 GB'
    },
    {
      id: '2',
      title: 'Python Fundamentals',
      progress: 30,
      downloadedLessons: 5,
      totalLessons: 15,
      size: '1.8 GB'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">DCODE Mobile App</h2>
        <p className="text-gray-600 mb-6">Learn anywhere, anytime with our mobile application</p>
        
        <div className="flex justify-center space-x-4">
          <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
            <Download className="h-5 w-5" />
            <span>Download for iOS</span>
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Download for Android</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Mobile Mockups */}
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Home Screen */}
            <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl">
              <div className="bg-white rounded-2xl h-[600px] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between text-xs">
                  <span>9:41 AM</span>
                  <div className="flex items-center space-x-1">
                    {isOffline ? <WifiOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
                    <span>100%</span>
                  </div>
                </div>

                {/* App Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">DCODE</h3>
                      <p className="text-blue-100 text-sm">Welcome back, John!</p>
                    </div>
                    <div className="relative">
                      <Bell className="h-6 w-6" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {isOffline && (
                    <div className="mt-3 bg-orange-500/20 border border-orange-400 rounded-lg p-2">
                      <div className="flex items-center space-x-2">
                        <WifiOff className="h-4 w-4" />
                        <span className="text-sm">Offline Mode - Downloaded content available</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="p-4 grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">5</div>
                    <div className="text-xs text-gray-600">Courses</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <Trophy className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">1,250</div>
                    <div className="text-xs text-gray-600">XP</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <span className="text-xl mb-1 block">🔥</span>
                    <div className="text-lg font-bold text-gray-900">7</div>
                    <div className="text-xs text-gray-600">Streak</div>
                  </div>
                </div>

                {/* Continue Learning */}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Continue Learning</h4>
                  <div className="space-y-3">
                    {downloadedCourses.map((course) => (
                      <div key={course.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-sm text-gray-900">{course.title}</h5>
                          <Play className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                          <span>{course.progress}% complete</span>
                          <span>{course.downloadedLessons}/{course.totalLessons} downloaded</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-blue-600 h-1 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Player Screen */}
            <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl">
              <div className="bg-black rounded-2xl h-[600px] overflow-hidden">
                {/* Video Player */}
                <div className="relative h-64 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-2 opacity-80" />
                    <p className="text-sm">React Hooks Explained</p>
                  </div>
                  
                  {/* Mobile Video Controls */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 rounded-lg p-3">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-3">
                          <Pause className="h-5 w-5" />
                          <span className="text-sm">15:30 / 25:45</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RotateCcw className="h-4 w-4" />
                          <Settings className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-1 mt-2">
                        <div className="bg-white h-1 rounded-full w-3/5"></div>
                      </div>
                    </div>
                  </div>

                  {/* Offline Indicator */}
                  {isOffline && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>Offline</span>
                    </div>
                  )}
                </div>

                {/* Lesson Info */}
                <div className="bg-white p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Understanding React Hooks</h3>
                  <p className="text-sm text-gray-600 mb-3">Learn how to use useState and useEffect hooks effectively</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Lesson 3 of 12</span>
                      <span>25 min</span>
                    </div>
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                </div>

                {/* Navigation */}
                <div className="bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <button className="flex items-center space-x-2 text-gray-600">
                      <span className="text-sm">← Previous</span>
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                      Next Lesson →
                    </button>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="bg-white border-t border-gray-200 p-4">
                  <div className="flex items-center justify-around">
                    <div className="text-center">
                      <BookOpen className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                      <span className="text-xs text-gray-600">Courses</span>
                    </div>
                    <div className="text-center">
                      <Download className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-600">Downloads</span>
                    </div>
                    <div className="text-center">
                      <Trophy className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-600">Progress</span>
                    </div>
                    <div className="text-center">
                      <User className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-600">Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Features */}
        <div className="space-y-6">
          {/* Offline Learning */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Download className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Offline Learning</h3>
                <p className="text-sm text-gray-600">Download courses for offline access</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {downloadedCourses.map((course) => (
                <div key={course.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{course.title}</span>
                    <span className="text-xs text-gray-500">{course.size}</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">
                    {course.downloadedLessons} of {course.totalLessons} lessons downloaded
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-green-600 h-1 rounded-full"
                      style={{ width: `${(course.downloadedLessons / course.totalLessons) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
                isOffline 
                  ? 'bg-orange-600 text-white hover:bg-orange-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {isOffline ? 'Go Online' : 'Switch to Offline Mode'}
            </button>
          </div>

          {/* Push Notifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Smart Notifications</h3>
                <p className="text-sm text-gray-600">AI-powered learning reminders</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg border ${
                  notification.read ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-xs text-gray-600">{notification.course}</p>
                    </div>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Features List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Mobile Features</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Download className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Offline Learning</div>
                  <div className="text-xs text-gray-600">Download courses for offline access</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bell className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Smart Notifications</div>
                  <div className="text-xs text-gray-600">AI-powered learning reminders</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Optimized Player</div>
                  <div className="text-xs text-gray-600">Mobile-first video experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}