import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Trophy, Clock, CheckCircle } from 'lucide-react';
import CourseCard from '../../components/Course/CourseCard';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

export default function MyCoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const enrolledCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Master HTML, CSS, JavaScript, React, Node.js and build full-stack applications.',
      instructor: 'Dr. Sarah Wilson',
      thumbnail: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 2999,
      isFree: false,
      rating: 4.9,
      studentsCount: 12500,
      duration: '40 hours',
      level: 'Beginner' as const,
      languages: ['EN', 'HI'],
      category: 'Web Development',
      progress: 65,
      lessonsCompleted: 8,
      totalLessons: 12,
      enrolledAt: '2024-01-15',
      lessons: [
        {
          id: 'l1',
          title: 'Introduction to HTML',
          duration: '15 min',
          completed: true,
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          id: 'l2',
          title: 'CSS Fundamentals',
          duration: '25 min',
          completed: true,
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          id: 'l3',
          title: 'JavaScript Basics',
          duration: '30 min',
          completed: false,
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
      ]
    },
    {
      id: '2',
      title: 'Python for Data Science',
      description: 'Learn Python programming and data analysis with pandas, NumPy, and machine learning.',
      instructor: 'Prof. Mike Johnson',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 0,
      isFree: true,
      rating: 4.8,
      studentsCount: 8900,
      duration: '25 hours',
      level: 'Intermediate' as const,
      languages: ['EN', 'HI', 'TE'],
      category: 'Data Science',
      progress: 30,
      lessonsCompleted: 4,
      totalLessons: 15,
      enrolledAt: '2024-02-01',
      lessons: [
        {
          id: 'l4',
          title: 'Python Introduction',
          duration: '20 min',
          completed: true,
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
      ]
    }
  ];

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
    setSelectedLesson(null);
  };

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLesson(lessonId);
  };

  const selectedCourseData = enrolledCourses.find(c => c.id === selectedCourse);
  const selectedLessonData = selectedCourseData?.lessons.find(l => l.id === selectedLesson);

  if (selectedCourse && selectedLesson && selectedLessonData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center space-x-2 text-sm">
            <button
              onClick={() => {
                setSelectedCourse(null);
                setSelectedLesson(null);
              }}
              className="text-blue-600 hover:text-blue-700"
            >
              My Courses
            </button>
            <span className="text-gray-500">/</span>
            <button
              onClick={() => setSelectedLesson(null)}
              className="text-blue-600 hover:text-blue-700"
            >
              {selectedCourseData?.title}
            </button>
            <span className="text-gray-500">/</span>
            <span className="text-gray-900">{selectedLessonData.title}</span>
          </nav>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <VideoPlayer
                  src={selectedLessonData.videoUrl}
                  type="youtube"
                  languages={[
                    { code: 'en', name: 'English' },
                    { code: 'hi', name: 'Hindi' },
                    { code: 'te', name: 'Telugu' }
                  ]}
                  onProgress={(seconds) => console.log('Progress:', seconds)}
                  onComplete={() => {
                    console.log('Lesson completed');
                    // Add XP and mark as completed
                  }}
                />
                
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedLessonData.title}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    Course: {selectedCourseData?.title}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedLessonData.duration}</span>
                    </div>
                    {selectedLessonData.completed && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
                <div className="space-y-2">
                  {selectedCourseData?.lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonSelect(lesson.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedLesson === lesson.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          lesson.completed
                            ? 'bg-green-500 text-white'
                            : selectedLesson === lesson.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {lesson.completed ? <CheckCircle className="h-3 w-3" /> : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{lesson.title}</div>
                          <div className="text-xs text-gray-500">{lesson.duration}</div>
                        </div>
                        {selectedLesson === lesson.id && (
                          <Play className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCourse && selectedCourseData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center space-x-2 text-sm">
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-blue-600 hover:text-blue-700"
            >
              My Courses
            </button>
            <span className="text-gray-500">/</span>
            <span className="text-gray-900">{selectedCourseData.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <img
                  src={selectedCourseData.thumbnail}
                  alt={selectedCourseData.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedCourseData.title}
                  </h1>
                  <p className="text-gray-600 mb-6">
                    {selectedCourseData.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedCourseData.progress}%
                      </div>
                      <div className="text-sm text-gray-600">Progress</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {selectedCourseData.lessonsCompleted}/{selectedCourseData.totalLessons}
                      </div>
                      <div className="text-sm text-gray-600">Lessons</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${selectedCourseData.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lessons List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
              <div className="space-y-3">
                {selectedCourseData.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson.id)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        lesson.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {lesson.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{lesson.title}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <Clock className="h-3 w-3" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                      <Play className="h-4 w-4 text-blue-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</div>
                <div className="text-sm text-gray-600">Enrolled Courses</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {enrolledCourses.reduce((total, course) => total + course.lessonsCompleted, 0)}
                </div>
                <div className="text-sm text-gray-600">Lessons Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(enrolledCourses.reduce((total, course) => total + course.progress, 0) / enrolledCourses.length)}%
                </div>
                <div className="text-sm text-gray-600">Avg Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">28h</div>
                <div className="text-sm text-gray-600">Time Invested</div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCourseSelect(course.id)}
              >
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-blue-600 font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    {course.lessonsCompleted} of {course.totalLessons} lessons completed
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Enrolled Courses */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Enrolled Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                showProgress={true}
                progress={course.progress}
              />
            ))}
          </div>
        </div>

        {enrolledCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course</p>
            <Link
              to="/courses"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}