import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Youtube,
  Languages,
  Users,
  Star,
  Clock,
  MoreVertical
} from 'lucide-react';

export default function ManageCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const instructorCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Master HTML, CSS, JavaScript, React, Node.js and build full-stack applications.',
      status: 'published',
      students: 1250,
      rating: 4.9,
      reviews: 284,
      price: 2999,
      isFree: false,
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20',
      thumbnail: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=400',
      lessons: 12,
      videosUploaded: {
        en: 12,
        hi: 10,
        te: 8
      },
      languages: ['en', 'hi', 'te']
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      description: 'Deep dive into React design patterns, hooks, and performance optimization.',
      status: 'published',
      students: 680,
      rating: 4.8,
      reviews: 156,
      price: 4999,
      isFree: false,
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-18',
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
      lessons: 8,
      videosUploaded: {
        en: 8,
        hi: 6,
        te: 0
      },
      languages: ['en', 'hi']
    },
    {
      id: '3',
      title: 'JavaScript Testing Fundamentals',
      description: 'Learn testing strategies with Jest, React Testing Library, and Cypress.',
      status: 'draft',
      students: 0,
      rating: 0,
      reviews: 0,
      price: 3499,
      isFree: false,
      createdAt: '2024-02-01',
      lastUpdated: '2024-02-01',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
      lessons: 10,
      videosUploaded: {
        en: 3,
        hi: 0,
        te: 0
      },
      languages: ['en']
    }
  ];

  const filteredCourses = instructorCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Under Review</span>;
      case 'draft':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
      default:
        return null;
    }
  };

  const getVideoCompletionPercentage = (uploaded: any, totalLessons: number) => {
    const totalVideos = totalLessons * 3; // 3 languages
    const uploadedVideos = Object.values(uploaded).reduce((a: number, b: number) => a + b, 0);
    return Math.round((uploadedVideos / totalVideos) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Courses</h1>
            <p className="text-gray-600">Create and manage your course content</p>
          </div>
          <Link
            to="/instructor/courses/create"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Course</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900">{instructorCourses.length}</div>
            <div className="text-sm text-gray-600">Total Courses</div>
            <div className="text-xs text-blue-600">{instructorCourses.filter(c => c.status === 'published').length} published</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900">
              {instructorCourses.reduce((total, course) => total + course.students, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Students</div>
            <div className="text-xs text-green-600">↑ 15% this month</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900">
              {(instructorCourses.reduce((total, course) => total + course.rating * course.reviews, 0) / 
                instructorCourses.reduce((total, course) => total + course.reviews, 0) || 0).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
            <div className="text-xs text-yellow-600">
              {instructorCourses.reduce((total, course) => total + course.reviews, 0)} reviews
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  {getStatusBadge(course.status)}
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-black/60 text-white px-2 py-1 rounded text-xs">
                    {getVideoCompletionPercentage(course.videosUploaded, course.lessons)}% videos
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Video Upload Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Video Upload Progress</span>
                    <span className="text-blue-600 font-medium">
                      {getVideoCompletionPercentage(course.videosUploaded, course.lessons)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-gray-900 font-medium">EN</div>
                      <div className="text-gray-500">{course.videosUploaded.en}/{course.lessons}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-900 font-medium">HI</div>
                      <div className="text-gray-500">{course.videosUploaded.hi}/{course.lessons}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-900 font-medium">TE</div>
                      <div className="text-gray-500">{course.videosUploaded.te}/{course.lessons}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    {course.rating > 0 && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    {course.isFree ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      <span className="text-gray-900 font-medium">₹{course.price.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedCourse(course.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-1"
                  >
                    <Youtube className="h-4 w-4" />
                    <span>Manage Videos</span>
                  </button>
                  <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Management Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-semibold">Manage Course Videos</h3>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="max-h-[70vh] overflow-y-auto">
                <CourseVideoEditor 
                  courseId={selectedCourse}
                  onClose={() => setSelectedCourse(null)}
                />
              </div>
            </div>
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">Create your first course or adjust your search</p>
            <Link
              to="/instructor/courses/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Course Video Editor Component
function CourseVideoEditor({ courseId, onClose }: { courseId: string; onClose: () => void }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [videoUrls, setVideoUrls] = useState<Record<string, Record<string, string>>>({});

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' }
  ];

  const courseData = {
    id: courseId,
    title: 'Complete Web Development Bootcamp',
    lessons: [
      {
        id: 'l1',
        title: 'Introduction to Web Development',
        duration: '15 min',
        videos: {
          en: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          hi: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          te: ''
        }
      },
      {
        id: 'l2',
        title: 'HTML Fundamentals',
        duration: '25 min',
        videos: {
          en: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          hi: '',
          te: ''
        }
      },
      {
        id: 'l3',
        title: 'CSS Styling and Layouts',
        duration: '30 min',
        videos: {
          en: '',
          hi: '',
          te: ''
        }
      }
    ]
  };

  const updateVideoUrl = (lessonId: string, language: string, url: string) => {
    setVideoUrls(prev => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        [language]: url
      }
    }));
  };

  const saveAllVideos = () => {
    // Here you would send all video URLs to your backend
    console.log('Saving video URLs:', videoUrls);
    alert('All video URLs saved successfully!');
    onClose();
  };

  const bulkUploadVideos = () => {
    const urls = prompt('Enter YouTube URLs separated by commas (in order: EN, HI, TE):');
    if (urls) {
      const urlList = urls.split(',').map(url => url.trim());
      // Process bulk upload
      alert('Bulk upload initiated for ' + urlList.length + ' videos');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{courseData.title}</h2>
          <p className="text-gray-600">Manage YouTube video URLs for all languages</p>
        </div>
        <button
          onClick={bulkUploadVideos}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Youtube className="h-4 w-4" />
          <span>Bulk Upload</span>
        </button>
      </div>

      {/* Language Selector */}
      <div className="flex items-center space-x-4 mb-6">
        <Languages className="h-5 w-5 text-gray-500" />
        <div className="flex space-x-2">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedLanguage === lang.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Video Management */}
      <div className="space-y-4 mb-8">
        {courseData.lessons.map((lesson, index) => (
          <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">
                  Lesson {index + 1}: {lesson.title}
                </h4>
                <p className="text-sm text-gray-500 flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.duration}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {lesson.videos[selectedLanguage] ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Youtube className="h-3 w-3 mr-1" />
                    Added
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Missing
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube URL ({languages.find(l => l.code === selectedLanguage)?.name})
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                    <input
                      type="url"
                      value={videoUrls[lesson.id]?.[selectedLanguage] || lesson.videos[selectedLanguage] || ''}
                      onChange={(e) => updateVideoUrl(lesson.id, selectedLanguage, e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <button
                    onClick={() => console.log('Saving individual video')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Status for All Languages
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map(lang => (
                    <div key={lang.code} className={`p-2 rounded text-center text-xs ${
                      lesson.videos[lang.code] 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <div className="font-medium">{lang.code.toUpperCase()}</div>
                      <div>{lesson.videos[lang.code] ? '✓' : '✗'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Preview */}
            {(videoUrls[lesson.id]?.[selectedLanguage] || lesson.videos[selectedLanguage]) && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                <div className="aspect-video max-w-md bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${(videoUrls[lesson.id]?.[selectedLanguage] || lesson.videos[selectedLanguage]).split('v=')[1]?.split('&')[0]}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="text-sm text-gray-600">
          Save your YouTube URLs to update course content across all languages
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveAllVideos}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}