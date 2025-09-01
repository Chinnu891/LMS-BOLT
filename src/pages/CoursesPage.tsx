import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import CourseCard from '../components/Course/CourseCard';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Web Development', 'Data Science', 'Mobile Development', 'DevOps', 'AI/ML'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const languages = ['All', 'English', 'Hindi', 'Telugu'];

  const mockCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Master HTML, CSS, JavaScript, React, Node.js and build full-stack applications from scratch.',
      instructor: 'Dr. Sarah Wilson',
      thumbnail: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 2999,
      isFree: false,
      rating: 4.9,
      studentsCount: 12500,
      duration: '40 hours',
      level: 'Beginner' as const,
      languages: ['EN', 'HI'],
      category: 'Web Development'
    },
    {
      id: '2',
      title: 'Python for Data Science',
      description: 'Learn Python programming and data analysis with pandas, NumPy, and machine learning basics.',
      instructor: 'Prof. Mike Johnson',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 0,
      isFree: true,
      rating: 4.8,
      studentsCount: 8900,
      duration: '25 hours',
      level: 'Intermediate' as const,
      languages: ['EN', 'HI', 'TE'],
      category: 'Data Science'
    },
    {
      id: '3',
      title: 'React Native Mobile Development',
      description: 'Build cross-platform mobile apps with React Native, Expo, and native device features.',
      instructor: 'Emily Chen',
      thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 3499,
      isFree: false,
      rating: 4.7,
      studentsCount: 6700,
      duration: '35 hours',
      level: 'Advanced' as const,
      languages: ['EN'],
      category: 'Mobile Development'
    },
    {
      id: '4',
      title: 'DevOps with Docker and Kubernetes',
      description: 'Master containerization, orchestration, and deployment pipelines for modern applications.',
      instructor: 'David Kumar',
      thumbnail: 'https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 4999,
      isFree: false,
      rating: 4.6,
      studentsCount: 4200,
      duration: '30 hours',
      level: 'Advanced' as const,
      languages: ['EN', 'HI'],
      category: 'DevOps'
    },
    {
      id: '5',
      title: 'Machine Learning Fundamentals',
      description: 'Introduction to ML algorithms, neural networks, and practical AI applications.',
      instructor: 'Dr. Priya Sharma',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 0,
      isFree: true,
      rating: 4.9,
      studentsCount: 15600,
      duration: '45 hours',
      level: 'Intermediate' as const,
      languages: ['EN', 'HI', 'TE'],
      category: 'AI/ML'
    },
    {
      id: '6',
      title: 'Full-Stack JavaScript Development',
      description: 'End-to-end JavaScript development with MERN stack and modern deployment practices.',
      instructor: 'Alex Rodriguez',
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 3999,
      isFree: false,
      rating: 4.8,
      studentsCount: 9800,
      duration: '50 hours',
      level: 'Intermediate' as const,
      languages: ['EN'],
      category: 'Web Development'
    }
  ];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'free' && course.isFree) ||
                        (selectedPrice === 'paid' && !course.isFree);
    const matchesLanguage = selectedLanguage === 'all' || 
                           course.languages.some(lang => 
                             lang.toLowerCase() === selectedLanguage.toLowerCase().slice(0, 2)
                           );

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Courses</h1>
          <p className="text-lg text-gray-600">
            Discover world-class courses from expert instructors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat === 'All' ? 'all' : cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {levels.map(level => (
                <option key={level} value={level === 'All' ? 'all' : level}>{level}</option>
              ))}
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map(lang => (
                <option key={lang} value={lang === 'All' ? 'all' : lang}>{lang}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredCourses.length} courses
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className={
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-6'
        }>
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}