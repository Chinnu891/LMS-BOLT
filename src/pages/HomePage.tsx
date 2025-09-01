import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { 
  Play, 
  Star, 
  Users, 
  BookOpen, 
  Trophy, 
  Award, 
  TrendingUp,
  Globe,
  Shield,
  Zap,
  X
} from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const { stats } = useGame();
  const [showDemo, setShowDemo] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const features = [
    {
      icon: Globe,
      title: 'Multi-Language Learning',
      description: 'Learn in English, Hindi, or Telugu with seamless language switching'
    },
    {
      icon: Trophy,
      title: 'Gamified Experience',
      description: 'Earn XP, unlock badges, and climb the leaderboard as you learn'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure payments with Razorpay integration'
    },
    {
      icon: Zap,
      title: '3D Interactive UI',
      description: 'Immersive learning experience with modern 3D interfaces'
    }
  ];

  const topCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Sarah Wilson',
      thumbnail: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      students: 12500,
      price: 2999,
      isFree: false
    },
    {
      id: '2',
      title: 'Python for Data Science',
      instructor: 'Prof. Mike Johnson',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      students: 8900,
      price: 0,
      isFree: true
    },
    {
      id: '3',
      title: 'Mobile App Development with React Native',
      instructor: 'Emily Chen',
      thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      students: 6700,
      price: 3499,
      isFree: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Learn Code in
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  3D Experience
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Master programming with our interactive 3D learning platform. 
                Multi-language support, gamification, and expert instructors.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/courses"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
                >
                  Start Learning Now
                </Link>
                <button
                  onClick={() => setShowDemo(true)}
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {user && (
                <button
                  onClick={() => setShowProgress(true)}
                  className="mt-6 text-blue-300 hover:text-white underline decoration-dotted underline-offset-4 transition-colors duration-200"
                >
                  View Your Progress →
                </button>
              )}
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/10 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm text-blue-200">Courses</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                      <Users className="h-8 w-8 mx-auto mb-2 text-green-300" />
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-sm text-green-200">Students</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                      <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-sm text-yellow-200">Success Rate</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                      <Award className="h-8 w-8 mx-auto mb-2 text-purple-300" />
                      <div className="text-2xl font-bold">10K+</div>
                      <div className="text-sm text-purple-200">Certificates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose DCODE?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of online learning with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Top Rated Courses
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of students learning from the best instructors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    {course.isFree ? (
                      <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        FREE
                      </span>
                    ) : (
                      <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        ₹{course.price}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">by {course.instructor}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Link
                      to={`/courses/${course.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View Course →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <BookOpen className="h-5 w-5" />
              <span>Explore All Courses</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning with DCODE. 
            Get access to premium courses and start building your future today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              to="/courses"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">DCODE Platform Demo</h3>
              <button
                onClick={() => setShowDemo(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-video bg-gray-900">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Progress Modal */}
      {showProgress && user && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">Your Progress</h3>
              <button
                onClick={() => setShowProgress(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        className="w-24 h-24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${(stats.xp % 300) / 300 * 62.83} 62.83`}
                        className="text-blue-600"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{stats.level}</div>
                        <div className="text-xs text-gray-500">Level</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{stats.xp} Total XP</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Current Streak</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-orange-500 text-xl">🔥</span>
                      <span className="font-semibold">{stats.streak} days</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificates</span>
                    <span className="font-semibold">{stats.certificates}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Badges Earned</span>
                    <span className="font-semibold">{stats.badges.filter(b => b.earned).length}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Recent Badges</h4>
                <div className="grid grid-cols-2 gap-3">
                  {stats.badges.filter(b => b.earned).slice(0, 4).map((badge) => (
                    <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{badge.name}</div>
                        <div className="text-xs text-gray-500">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}