import React, { useState } from 'react';
import { Heart, Play, Clock, Star, Users, Trash2 } from 'lucide-react';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

export default function FavouritesPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const favouriteCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Sarah Wilson',
      thumbnail: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      students: 12500,
      duration: '40 hours',
      previewVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      languages: [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'te', name: 'Telugu' }
      ],
      addedAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Python for Data Science',
      instructor: 'Prof. Mike Johnson',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      students: 8900,
      duration: '25 hours',
      previewVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      languages: [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' }
      ],
      addedAt: '2024-01-18'
    },
    {
      id: '3',
      title: 'React Native Mobile Development',
      instructor: 'Emily Chen',
      thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      students: 6700,
      duration: '35 hours',
      previewVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      languages: [
        { code: 'en', name: 'English' }
      ],
      addedAt: '2024-01-15'
    }
  ];

  const removeFavourite = (courseId: string) => {
    if (confirm('Remove this course from your favourites?')) {
      // Here you would make an API call to remove from favourites
      console.log(`Removing course ${courseId} from favourites`);
      alert('Course removed from favourites');
    }
  };

  const playVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favourites</h1>
          <p className="text-gray-600">Your saved courses for quick access</p>
        </div>

        {selectedVideo && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <VideoPlayer
                src={selectedVideo}
                type="youtube"
                languages={[
                  { code: 'en', name: 'English' },
                  { code: 'hi', name: 'Hindi' },
                  { code: 'te', name: 'Telugu' }
                ]}
                onProgress={(seconds) => console.log('Favourite video progress:', seconds)}
              />
              <div className="p-4">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Back to Favourites
                </button>
              </div>
            </div>
          </div>
        )}

        {!selectedVideo && (
          <>
            {favouriteCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favouriteCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => playVideo(course.previewVideo)}
                          className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <Play className="h-8 w-8" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFavourite(course.id)}
                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">by {course.instructor}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-xs text-gray-500">Added {course.addedAt}</span>
                        </div>
                        <button
                          onClick={() => playVideo(course.previewVideo)}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                        >
                          <Play className="h-4 w-4" />
                          <span>Watch Preview</span>
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {course.languages.map(lang => (
                          <span key={lang.code} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {lang.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No favourites yet</h3>
                <p className="text-gray-600 mb-6">Save courses you're interested in to access them quickly</p>
                <a
                  href="/courses"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Courses
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}