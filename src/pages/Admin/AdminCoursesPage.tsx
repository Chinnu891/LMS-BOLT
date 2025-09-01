import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock,
  Youtube,
  Languages,
  Plus,
  MoreVertical
} from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

export default function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const mockCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Sarah Wilson',
      category: 'Web Development',
      level: 'Beginner',
      price: 2999,
      isFree: false,
      status: 'published',
      enrollments: 1250,
      rating: 4.9,
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-20',
      languages: ['en', 'hi', 'te'],
      lessonsCount: 12,
      videosUploaded: {
        en: 12,
        hi: 10,
        te: 8
      }
    },
    {
      id: '2',
      title: 'Python for Data Science',
      instructor: 'Prof. Mike Johnson',
      category: 'Data Science',
      level: 'Intermediate',
      price: 0,
      isFree: true,
      status: 'pending',
      enrollments: 0,
      rating: 0,
      createdAt: '2024-02-01',
      lastUpdated: '2024-02-01',
      languages: ['en', 'hi'],
      lessonsCount: 15,
      videosUploaded: {
        en: 15,
        hi: 12,
        te: 0
      }
    },
    {
      id: '3',
      title: 'Advanced React Patterns',
      instructor: 'Emily Chen',
      category: 'Web Development',
      level: 'Advanced',
      price: 4999,
      isFree: false,
      status: 'draft',
      enrollments: 0,
      rating: 0,
      createdAt: '2024-02-05',
      lastUpdated: '2024-02-05',
      languages: ['en'],
      lessonsCount: 8,
      videosUploaded: {
        en: 6,
        hi: 0,
        te: 0
      }
    }
  ];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending Review</span>;
      case 'draft':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
      default:
        return null;
    }
  };

  const handleCourseAction = (action: string, courseId: string) => {
    switch (action) {
      case 'approve':
        alert(`Course ${courseId} approved and published`);
        break;
      case 'reject':
        const reason = prompt('Rejection reason:');
        if (reason) {
          alert(`Course ${courseId} rejected: ${reason}`);
        }
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this course?')) {
          alert(`Course ${courseId} deleted`);
        }
        break;
      case 'edit':
        alert(`Editing course ${courseId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
            <p className="text-gray-600">Review and manage all courses on the platform</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Course</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900">245</div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-yellow-600">23</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-green-600">198</div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-600">24</div>
            <div className="text-sm text-gray-600">Drafts</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending Review</option>
              <option value="draft">Draft</option>
              <option value="rejected">Rejected</option>
            </select>

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">
                Showing {filteredCourses.length} courses
              </span>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Videos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.category} • {course.level}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          {course.languages.map(lang => (
                            <span key={lang} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {lang.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{course.instructor}</div>
                      <div className="text-sm text-gray-500">Created {course.createdAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(course.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Youtube className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-gray-900">{course.lessonsCount} lessons</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          EN: {course.videosUploaded.en}, HI: {course.videosUploaded.hi}, TE: {course.videosUploaded.te}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{course.enrollments.toLocaleString()}</div>
                      {course.rating > 0 && (
                        <div className="text-xs text-gray-500">★ {course.rating}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.isFree ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          FREE
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-gray-900">₹{course.price.toLocaleString()}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedCourse(course.id)}
                          className="p-1 text-blue-600 hover:text-blue-700"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        {course.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleCourseAction('approve', course.id)}
                              className="p-1 text-green-600 hover:text-green-700"
                              title="Approve Course"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleCourseAction('reject', course.id)}
                              className="p-1 text-red-600 hover:text-red-700"
                              title="Reject Course"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => handleCourseAction('edit', course.id)}
                          className="p-1 text-gray-600 hover:text-gray-700"
                          title="Edit Course"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        
                        <div className="relative">
                          <button className="p-1 text-gray-600 hover:text-gray-700">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-semibold">Course Details & Video Management</h3>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="max-h-[70vh] overflow-y-auto">
                <CourseVideoManagement 
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
              <Filter className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Course Video Management Component
function CourseVideoManagement({ courseId, onClose }: { courseId: string; onClose: () => void }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' }
  ];

  const courseData = {
    id: courseId,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Dr. Sarah Wilson',
    lessons: [
      {
        id: 'l1',
        title: 'Introduction to Web Development',
        duration: '15 min',
        videos: {
          en: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          hi: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          te: ''
        },
        materials: {
          en: [{ name: 'Lesson 1 Notes.pdf', url: '#' }],
          hi: [{ name: 'पाठ 1 नोट्स.pdf', url: '#' }],
          te: []
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
        },
        materials: {
          en: [{ name: 'HTML Reference.pdf', url: '#' }],
          hi: [],
          te: []
        }
      }
    ]
  };

  const updateVideoUrl = (lessonId: string, language: string, url: string) => {
    // Here you would update the video URL in your backend
    console.log(`Updating lesson ${lessonId} video for ${language}: ${url}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{courseData.title}</h2>
        <p className="text-gray-600">Instructor: {courseData.instructor}</p>
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

      {/* Lessons Management */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Manage Videos for {languages.find(l => l.code === selectedLanguage)?.name}</h3>
        
        {courseData.lessons.map((lesson, index) => (
          <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">Lesson {index + 1}: {lesson.title}</h4>
                <p className="text-sm text-gray-500">{lesson.duration}</p>
              </div>
              <div className="flex items-center space-x-2">
                {lesson.videos[selectedLanguage] ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Youtube className="h-3 w-3 mr-1" />
                    Video Added
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Missing Video
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube URL for {languages.find(l => l.code === selectedLanguage)?.name}
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                    <input
                      type="url"
                      value={lesson.videos[selectedLanguage] || ''}
                      onChange={(e) => updateVideoUrl(lesson.id, selectedLanguage, e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Save
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materials ({languages.find(l => l.code === selectedLanguage)?.name})
                </label>
                <div className="space-y-1">
                  {lesson.materials[selectedLanguage]?.map((material, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <span className="text-blue-600">📄</span>
                      <span className="text-gray-700">{material.name}</span>
                    </div>
                  ))}
                  {lesson.materials[selectedLanguage]?.length === 0 && (
                    <p className="text-sm text-gray-500">No materials added</p>
                  )}
                </div>
              </div>
            </div>

            {/* Video Preview */}
            {lesson.videos[selectedLanguage] && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Video Preview</label>
                <div className="aspect-video max-w-md">
                  <VideoPlayer
                    src={lesson.videos[selectedLanguage]}
                    type="youtube"
                    languages={languages}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleCourseAction('approve', courseId)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Approve Course</span>
          </button>
          <button
            onClick={() => handleCourseAction('reject', courseId)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <XCircle className="h-4 w-4" />
            <span>Reject Course</span>
          </button>
        </div>
        <button
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}