import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import {
  Play,
  Star,
  Users,
  Clock,
  Globe,
  Award,
  Heart,
  BookOpen,
  CheckCircle,
  Lock,
  Languages,
  Share2,
  Download
} from 'lucide-react';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addXP } = useGame();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isFavourite, setIsFavourite] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  // Mock course data - replace with API call
  const course = {
    id: id || '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Master HTML, CSS, JavaScript, React, Node.js and build full-stack applications from scratch. This comprehensive course covers everything you need to become a professional web developer.',
    longDescription: 'This comprehensive web development bootcamp is designed to take you from complete beginner to job-ready developer. You\'ll learn modern web technologies, best practices, and build real-world projects that you can showcase in your portfolio.',
    instructor: {
      name: 'Dr. Sarah Wilson',
      bio: 'Senior Software Engineer with 10+ years experience at Google and Microsoft',
      avatar: 'SW',
      courses: 12,
      students: 25000
    },
    thumbnail: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=1200',
    previewVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    price: 2999,
    isFree: false,
    rating: 4.9,
    reviewsCount: 2847,
    studentsCount: 12500,
    duration: '40 hours',
    level: 'Beginner' as const,
    category: 'Web Development',
    languages: [
      { code: 'en', name: 'English' },
      { code: 'hi', name: 'Hindi' },
      { code: 'te', name: 'Telugu' }
    ],
    whatYouLearn: [
      'Build responsive websites with HTML5, CSS3, and JavaScript',
      'Master React.js and create dynamic single-page applications',
      'Develop backend APIs with Node.js and Express',
      'Work with databases using MongoDB and MySQL',
      'Deploy applications to cloud platforms',
      'Implement user authentication and security best practices'
    ],
    requirements: [
      'Basic computer skills and internet access',
      'No prior programming experience required',
      'Dedication to practice and complete assignments'
    ],
    lessons: [
      {
        id: 'l1',
        title: 'Introduction to Web Development',
        duration: '15 min',
        isPreview: true,
        videos: {
          en: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          hi: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          te: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
      },
      {
        id: 'l2',
        title: 'HTML Fundamentals',
        duration: '25 min',
        isPreview: false,
        videos: {
          en: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          hi: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
      },
      {
        id: 'l3',
        title: 'CSS Styling and Layouts',
        duration: '30 min',
        isPreview: false,
        videos: {
          en: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          hi: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          te: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
      },
      {
        id: 'l4',
        title: 'JavaScript Programming',
        duration: '45 min',
        isPreview: false,
        videos: {
          en: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
      }
    ],
    reviews: [
      {
        id: '1',
        user: 'Priya Sharma',
        rating: 5,
        comment: 'Excellent course! The instructor explains concepts very clearly.',
        date: '2024-01-15',
        helpful: 45
      },
      {
        id: '2',
        user: 'Arjun Kumar',
        rating: 5,
        comment: 'Great content and practical examples. Highly recommended!',
        date: '2024-01-10',
        helpful: 32
      }
    ]
  };

  const isEnrolled = user && true; // Mock enrollment check
  const canAccessLesson = (lesson: any) => isEnrolled || lesson.isPreview;

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      if (course.isFree) {
        // Free enrollment
        setTimeout(() => {
          addXP(10, 'Course enrollment');
          alert('Successfully enrolled in the course!');
          setEnrolling(false);
        }, 1000);
      } else {
        // Paid enrollment - integrate with Razorpay
        // For now, simulate payment
        setTimeout(() => {
          addXP(10, 'Course enrollment');
          alert('Payment successful! You are now enrolled.');
          setEnrolling(false);
        }, 2000);
      }
    } catch (error) {
      setEnrolling(false);
      alert('Enrollment failed. Please try again.');
    }
  };

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
    if (!isFavourite) {
      addXP(5, 'Adding to favourites');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: course.title,
          text: course.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Course link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-sm">
          <Link to="/" className="text-blue-600 hover:text-blue-700">Home</Link>
          <span className="text-gray-500">/</span>
          <Link to="/courses" className="text-blue-600 hover:text-blue-700">Courses</Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900">{course.category}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <VideoPlayer
                src={course.previewVideo}
                type="youtube"
                languages={course.languages}
                onProgress={(seconds) => console.log('Preview progress:', seconds)}
                onComplete={() => {
                  console.log('Preview completed');
                  if (user) addXP(5, 'Watching preview');
                }}
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleFavourite}
                      className={`p-2 rounded-lg transition-colors ${
                        isFavourite
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isFavourite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                    <span>({course.reviewsCount.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.studentsCount.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>{course.languages.length} languages</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                  {course.languages.map(lang => (
                    <span key={lang.code} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {lang.name}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed">{course.description}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', name: 'Overview' },
                    { id: 'syllabus', name: 'Syllabus' },
                    { id: 'instructor', name: 'Instructor' },
                    { id: 'reviews', name: 'Reviews' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">What you'll learn</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.whatYouLearn.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Description</h3>
                      <p className="text-gray-700 leading-relaxed">{course.longDescription}</p>
                    </div>
                  </div>
                )}

                {/* Syllabus Tab */}
                {activeTab === 'syllabus' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Course Content</h3>
                      <div className="flex items-center space-x-2">
                        <Languages className="h-4 w-4 text-gray-500" />
                        <select
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                        >
                          {course.languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {course.lessons.map((lesson, index) => (
                        <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm font-medium text-blue-600">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                <div className="flex items-center space-x-3 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{lesson.duration}</span>
                                  </div>
                                  {lesson.isPreview && (
                                    <span className="text-green-600 font-medium">Free Preview</span>
                                  )}
                                  {lesson.videos[selectedLanguage] && (
                                    <span className="text-blue-600">Available in {course.languages.find(l => l.code === selectedLanguage)?.name}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {!lesson.videos[selectedLanguage] && (
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  Not available in {course.languages.find(l => l.code === selectedLanguage)?.name}
                                </span>
                              )}
                              {canAccessLesson(lesson) ? (
                                <Play className="h-5 w-5 text-blue-600" />
                              ) : (
                                <Lock className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Instructor Tab */}
                {activeTab === 'instructor' && (
                  <div>
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {course.instructor.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{course.instructor.name}</h3>
                        <p className="text-gray-600 mb-3">{course.instructor.bio}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{course.instructor.courses} courses</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{course.instructor.students.toLocaleString()} students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Student Reviews</h3>
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-gray-600">({course.reviewsCount} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {course.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                              {review.user.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="font-medium text-gray-900">{review.user}</span>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <p className="text-gray-700 mb-3">{review.comment}</p>
                              <div className="flex items-center space-x-4 text-sm">
                                <button className="text-gray-500 hover:text-gray-700">
                                  👍 Helpful ({review.helpful})
                                </button>
                                <button className="text-gray-500 hover:text-gray-700">Reply</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                {course.isFree ? (
                  <div className="text-3xl font-bold text-green-600 mb-2">FREE</div>
                ) : (
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">₹{course.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 line-through">₹{(course.price * 1.5).toLocaleString()}</div>
                  </div>
                )}
              </div>

              {isEnrolled ? (
                <Link
                  to="/my-courses"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Go to Course</span>
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enrolling ? 'Processing...' : course.isFree ? 'Start Learning' : 'Enroll Now'}
                </button>
              )}

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">30-day money-back guarantee</p>
              </div>
            </div>

            {/* Course Includes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">This course includes:</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">{course.lessons.length} lessons</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">{course.duration} on-demand video</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Languages className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">{course.languages.length} languages</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Download className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Downloadable resources</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Certificate of completion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Lifetime access</span>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Related Courses</h3>
              <div className="space-y-3">
                {[
                  { title: 'Advanced React Patterns', price: 3999, rating: 4.8 },
                  { title: 'Node.js Backend Development', price: 2499, rating: 4.7 },
                ].map((related, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{related.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{related.rating}</span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">₹{related.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}