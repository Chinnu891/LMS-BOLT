import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Clock, Users, BookOpen, Languages } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  price: number;
  isFree: boolean;
  rating: number;
  studentsCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  languages: string[];
  category: string;
}

interface CourseCardProps {
  course: Course;
  onToggleFavourite?: (courseId: string) => void;
  isFavourite?: boolean;
  showProgress?: boolean;
  progress?: number;
}

export default function CourseCard({ 
  course, 
  onToggleFavourite, 
  isFavourite = false,
  showProgress = false,
  progress = 0
}: CourseCardProps) {
  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavourite?.(course.id);
  };

  return (
    <Link 
      to={`/courses/${course.id}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full bg-white/20 backdrop-blur-sm text-white py-2 rounded-lg hover:bg-white/30 transition-colors">
              Preview Course
            </button>
          </div>
        </div>

        {/* Favourite Button */}
        {onToggleFavourite && (
          <button
            onClick={handleFavouriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isFavourite 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavourite ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Price Badge */}
        <div className="absolute top-3 left-3">
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

        {/* Level Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {course.level}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.studentsCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Languages className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              {course.languages.join(', ')}
            </span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {course.category}
          </span>
        </div>

        {showProgress && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="text-blue-600 font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">by {course.instructor}</span>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500">12 lessons</span>
          </div>
        </div>
      </div>
    </Link>
  );
}