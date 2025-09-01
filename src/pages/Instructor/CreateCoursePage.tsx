import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Plus, 
  Trash2, 
  GripVertical, 
  Youtube, 
  FileVideo,
  Languages,
  BookOpen,
  Save
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  order: number;
  videos: {
    [key: string]: {
      type: 'youtube' | 'file';
      url: string;
      duration?: string;
    };
  };
  materials: {
    [key: string]: {
      type: 'pdf' | 'doc';
      url: string;
      name: string;
    }[];
  };
  isPreview: boolean;
}

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    duration: '',
    price: 0,
    isFree: true,
    thumbnail: '',
    previewVideo: '',
  });

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('basic');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
  ];

  const addLesson = () => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: '',
      order: lessons.length + 1,
      videos: {},
      materials: {},
      isPreview: false,
    };
    setLessons([...lessons, newLesson]);
  };

  const updateLesson = (lessonId: string, field: string, value: any) => {
    setLessons(lessons.map(lesson => 
      lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
    ));
  };

  const removeLesson = (lessonId: string) => {
    setLessons(lessons.filter(lesson => lesson.id !== lessonId));
  };

  const addVideoToLesson = (lessonId: string, language: string, type: 'youtube' | 'file', url: string) => {
    setLessons(lessons.map(lesson => 
      lesson.id === lessonId 
        ? {
            ...lesson,
            videos: {
              ...lesson.videos,
              [language]: { type, url }
            }
          }
        : lesson
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!courseData.title || !courseData.description || lessons.length === 0) {
      alert('Please fill in all required fields and add at least one lesson');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Course data:', courseData);
    console.log('Lessons:', lessons);
    
    // Simulate API call
    alert('Course created successfully!');
    navigate('/instructor/courses');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
          <p className="text-gray-600">Build and publish your course with multi-language support</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'basic', name: 'Basic Info', icon: BookOpen },
                  { id: 'content', name: 'Course Content', icon: FileVideo },
                  { id: 'pricing', name: 'Pricing', icon: Save },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      value={courseData.title}
                      onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter course title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={courseData.description}
                      onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe what students will learn"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={courseData.category}
                        onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="DevOps">DevOps</option>
                        <option value="AI/ML">AI/ML</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level
                      </label>
                      <select
                        value={courseData.level}
                        onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={courseData.duration}
                        onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 25 hours"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thumbnail URL
                    </label>
                    <input
                      type="url"
                      value={courseData.thumbnail}
                      onChange={(e) => setCourseData({ ...courseData, thumbnail: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/thumbnail.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview Video URL (YouTube)
                    </label>
                    <input
                      type="url"
                      value={courseData.previewVideo}
                      onChange={(e) => setCourseData({ ...courseData, previewVideo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                </div>
              )}

              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Course Lessons</h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Languages className="h-4 w-4 text-gray-500" />
                        <select
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                        >
                          {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={addLesson}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Lesson</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {lessons.map((lesson, index) => (
                      <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                          <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Lesson title"
                          />
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={lesson.isPreview}
                              onChange={(e) => updateLesson(lesson.id, 'isPreview', e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">Preview</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => removeLesson(lesson.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Video Upload for Current Language */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">
                            Video for {languages.find(l => l.code === selectedLanguage)?.name}
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Video Source Type
                              </label>
                              <select
                                value={lesson.videos[selectedLanguage]?.type || 'youtube'}
                                onChange={(e) => {
                                  const type = e.target.value as 'youtube' | 'file';
                                  addVideoToLesson(lesson.id, selectedLanguage, type, lesson.videos[selectedLanguage]?.url || '');
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="youtube">YouTube URL</option>
                                <option value="file">Upload File</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {lesson.videos[selectedLanguage]?.type === 'youtube' ? 'YouTube URL' : 'Video File'}
                              </label>
                              {lesson.videos[selectedLanguage]?.type === 'youtube' ? (
                                <div className="relative">
                                  <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                                  <input
                                    type="url"
                                    value={lesson.videos[selectedLanguage]?.url || ''}
                                    onChange={(e) => addVideoToLesson(lesson.id, selectedLanguage, 'youtube', e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://youtube.com/watch?v=..."
                                  />
                                </div>
                              ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                  <FileVideo className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                  <p className="text-sm text-gray-600">Click to upload video file</p>
                                  <p className="text-xs text-gray-500 mt-1">MP4, WebM, MOV up to 500MB</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Show uploaded videos for all languages */}
                          <div className="mt-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Uploaded Videos</h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {languages.map(lang => (
                                <div key={lang.code} className={`p-3 rounded-lg border ${
                                  lesson.videos[lang.code] ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                                }`}>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{lang.name}</span>
                                    {lesson.videos[lang.code] ? (
                                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                        Added
                                      </span>
                                    ) : (
                                      <span className="text-xs text-gray-500">Not added</span>
                                    )}
                                  </div>
                                  {lesson.videos[lang.code] && (
                                    <div className="mt-2 text-xs text-gray-600">
                                      {lesson.videos[lang.code].type === 'youtube' ? '🎬 YouTube' : '📁 File'}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {lessons.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons yet</h3>
                        <p className="text-gray-600 mb-4">Add your first lesson to get started</p>
                        <button
                          type="button"
                          onClick={addLesson}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add First Lesson
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Pricing Tab */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={courseData.isFree}
                        onChange={(e) => setCourseData({ 
                          ...courseData, 
                          isFree: e.target.checked,
                          price: e.target.checked ? 0 : courseData.price
                        })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Make this course free</span>
                    </label>
                  </div>

                  {!courseData.isFree && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (INR)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          value={courseData.price}
                          onChange={(e) => setCourseData({ ...courseData, price: parseInt(e.target.value) || 0 })}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="2999"
                          min="0"
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Pricing Guidelines</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Free courses help build your reputation</li>
                      <li>• Beginner courses: ₹1,999 - ₹3,999</li>
                      <li>• Intermediate courses: ₹3,999 - ₹6,999</li>
                      <li>• Advanced courses: ₹6,999 - ₹12,999</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              onClick={() => navigate('/instructor/courses')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Publish Course</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}