import React, { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  BookOpen, 
  UserPlus,
  Search,
  Filter,
  Calendar,
  Video,
  FileText,
  Award,
  Star,
  Clock,
  Send
} from 'lucide-react';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  maxMembers: number;
  course: string;
  nextSession: string;
  isPrivate: boolean;
  tags: string[];
}

interface SocialPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  content: string;
  type: 'achievement' | 'question' | 'resource' | 'project';
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  course?: string;
}

export default function SocialLearning() {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'React Developers Circle',
      description: 'Weekly React study sessions and project collaborations',
      members: 24,
      maxMembers: 30,
      course: 'Advanced React Patterns',
      nextSession: '2024-02-16 18:00',
      isPrivate: false,
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: '2',
      name: 'Python Data Science Group',
      description: 'Exploring data science with Python, pandas, and machine learning',
      members: 18,
      maxMembers: 25,
      course: 'Python for Data Science',
      nextSession: '2024-02-17 19:30',
      isPrivate: false,
      tags: ['Python', 'Data Science', 'ML']
    },
    {
      id: '3',
      name: 'Full-Stack Builders',
      description: 'Building complete web applications together',
      members: 15,
      maxMembers: 20,
      course: 'Full-Stack Development',
      nextSession: '2024-02-18 20:00',
      isPrivate: true,
      tags: ['Full-Stack', 'MERN', 'Projects']
    }
  ];

  const socialPosts: SocialPost[] = [
    {
      id: '1',
      user: { name: 'Priya Sharma', avatar: 'PS', level: 15 },
      content: 'Just completed my first React project! 🎉 Built a todo app with hooks and context. The useState and useEffect concepts finally clicked!',
      type: 'achievement',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      isLiked: false,
      course: 'React Fundamentals'
    },
    {
      id: '2',
      user: { name: 'Arjun Kumar', avatar: 'AK', level: 12 },
      content: 'Can someone help me understand async/await in JavaScript? I\'m getting confused with promises.',
      type: 'question',
      timestamp: '4 hours ago',
      likes: 12,
      comments: 15,
      isLiked: true,
      course: 'JavaScript Advanced'
    },
    {
      id: '3',
      user: { name: 'Sarah Wilson', avatar: 'SW', level: 25 },
      content: 'Sharing a great resource for learning CSS Grid! This interactive guide helped me master layouts.',
      type: 'resource',
      timestamp: '1 day ago',
      likes: 45,
      comments: 12,
      isLiked: true,
      course: 'CSS Mastery'
    }
  ];

  const mentorshipRequests = [
    {
      id: '1',
      student: 'Rahul Gupta',
      topic: 'React State Management',
      level: 'Beginner',
      timePreference: 'Weekends',
      description: 'Looking for help with Redux and Context API'
    },
    {
      id: '2',
      student: 'Anita Patel',
      topic: 'Python Data Analysis',
      level: 'Intermediate',
      timePreference: 'Evenings',
      description: 'Need guidance on pandas and data visualization'
    }
  ];

  const joinStudyGroup = (groupId: string) => {
    console.log(`Joining study group: ${groupId}`);
    alert('Successfully joined the study group!');
  };

  const createPost = () => {
    if (newPost.trim()) {
      console.log('Creating post:', newPost);
      setNewPost('');
      alert('Post shared with the community!');
    }
  };

  const likePost = (postId: string) => {
    console.log(`Liking post: ${postId}`);
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Award className="h-4 w-4 text-yellow-500" />;
      case 'question': return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'resource': return <BookOpen className="h-4 w-4 text-green-500" />;
      case 'project': return <FileText className="h-4 w-4 text-purple-500" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Social Learning Hub</h2>
        <p className="text-gray-600">Connect, collaborate, and learn together</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'feed', name: 'Community Feed', icon: MessageCircle },
              { id: 'groups', name: 'Study Groups', icon: Users },
              { id: 'mentorship', name: 'Mentorship', icon: UserPlus },
              { id: 'projects', name: 'Collaborative Projects', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
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
      </div>

      {/* Community Feed */}
      {activeTab === 'feed' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your learning progress, ask questions, or help others..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50">
                        <FileText className="h-4 w-4" />
                      </button>
                      <button className="text-gray-500 hover:text-green-600 p-2 rounded-lg hover:bg-green-50">
                        <Video className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={createPost}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Posts */}
            <div className="space-y-4">
              {socialPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {post.user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">{post.user.name}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Level {post.user.level}
                        </span>
                        {getPostIcon(post.type)}
                        <span className="text-xs text-gray-500">{post.timestamp}</span>
                      </div>
                      
                      {post.course && (
                        <div className="text-xs text-blue-600 mb-2">📚 {post.course}</div>
                      )}
                      
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => likePost(post.id)}
                          className={`flex items-center space-x-1 text-sm transition-colors ${
                            post.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </button>
                        
                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-600 transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Study Groups */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Study Groups</h3>
              <div className="space-y-3">
                {studyGroups.slice(0, 2).map((group) => (
                  <div key={group.id} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-900">{group.name}</h4>
                    <div className="text-xs text-gray-600 mb-2">{group.members} members</div>
                    <div className="text-xs text-blue-600">Next: {group.nextSession}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Groups →
              </button>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Trending Topics</h3>
              <div className="space-y-2">
                {[
                  { tag: '#ReactHooks', posts: 45 },
                  { tag: '#PythonTips', posts: 32 },
                  { tag: '#WebDev', posts: 28 },
                  { tag: '#DataScience', posts: 21 }
                ].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <span className="text-sm font-medium text-blue-600">{topic.tag}</span>
                    <span className="text-xs text-gray-500">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Top Contributors</h3>
              <div className="space-y-3">
                {[
                  { name: 'Dr. Sarah Wilson', contributions: 156, avatar: 'SW' },
                  { name: 'Alex Rodriguez', contributions: 89, avatar: 'AR' },
                  { name: 'Emily Chen', contributions: 67, avatar: 'EC' }
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {contributor.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{contributor.name}</div>
                      <div className="text-xs text-gray-500">{contributor.contributions} helpful answers</div>
                    </div>
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Study Groups */}
      {activeTab === 'groups' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search study groups..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Courses</option>
                <option>Web Development</option>
                <option>Data Science</option>
                <option>Mobile Development</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Groups</option>
                <option>Public</option>
                <option>Private</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Create Group
              </button>
            </div>
          </div>

          {/* Study Groups Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{group.name}</h3>
                    <p className="text-sm text-gray-600">{group.description}</p>
                  </div>
                  {group.isPrivate && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Private</span>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Members</span>
                    <span className="font-medium">{group.members}/{group.maxMembers}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Course</span>
                    <span className="font-medium text-blue-600">{group.course}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Next Session</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span className="font-medium">{group.nextSession}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {group.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => joinStudyGroup(group.id)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Join Group
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mentorship */}
      {activeTab === 'mentorship' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Become a Mentor</h3>
              <p className="text-gray-600 mb-4">Share your knowledge and help fellow learners grow</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Expertise</label>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'JavaScript', 'Python', 'Node.js', 'CSS'].map((skill) => (
                      <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Weekends</option>
                    <option>Weekday Evenings</option>
                    <option>Flexible</option>
                  </select>
                </div>
                
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Start Mentoring
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Find a Mentor</h3>
              <p className="text-gray-600 mb-4">Get personalized guidance from experienced developers</p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Select your level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Find Mentors
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mentorship Requests</h3>
              <div className="space-y-4">
                {mentorshipRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{request.student}</h4>
                        <p className="text-sm text-gray-600">{request.topic}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {request.level}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{request.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Prefers: {request.timePreference}</span>
                      <div className="flex items-center space-x-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                          Accept
                        </button>
                        <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collaborative Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Collaborative Projects</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start New Project
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: '1',
                  title: 'E-commerce Platform',
                  description: 'Building a full-stack e-commerce site with React and Node.js',
                  members: 4,
                  maxMembers: 6,
                  progress: 65,
                  technologies: ['React', 'Node.js', 'MongoDB'],
                  deadline: '2024-03-15'
                },
                {
                  id: '2',
                  title: 'Data Visualization Dashboard',
                  description: 'Creating interactive charts and graphs with D3.js and Python',
                  members: 3,
                  maxMembers: 5,
                  progress: 40,
                  technologies: ['Python', 'D3.js', 'Flask'],
                  deadline: '2024-03-20'
                },
                {
                  id: '3',
                  title: 'Mobile Learning App',
                  description: 'React Native app for micro-learning on mobile devices',
                  members: 2,
                  maxMembers: 4,
                  progress: 20,
                  technologies: ['React Native', 'Firebase'],
                  deadline: '2024-04-01'
                }
              ].map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-600">{project.members}/{project.maxMembers} members</span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Due {project.deadline}</span>
                    </div>
                  </div>

                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Join Project
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}