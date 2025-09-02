import React, { useState } from 'react';
import { 
  Brain, 
  Smartphone, 
  Video, 
  Shield, 
  Gamepad2, 
  Building2,
  Users,
  Eye,
  MessageCircle,
  FileText,
  Zap
} from 'lucide-react';
import AnalyticsDashboard from '../components/Analytics/AnalyticsDashboard';
import MobileApp from '../components/Mobile/MobileApp';
import VirtualClassroom from '../components/LiveLearning/VirtualClassroom';
import ProctorSystem from '../components/Assessment/ProctorSystem';
import VRLearning from '../components/Gamification/VRLearning';
import EnterpriseFeatures from '../components/Enterprise/EnterpriseFeatures';
import PlagiarismDetection from '../components/Assessment/PlagiarismDetection';
import SocialLearning from '../components/Social/SocialLearning';
import ContentManagement from '../components/Content/ContentManagement';

export default function AdvancedFeaturesPage() {
  const [activeFeature, setActiveFeature] = useState('analytics');

  const features = [
    {
      id: 'analytics',
      name: 'AI Analytics',
      icon: Brain,
      description: 'Advanced learning analytics with AI insights',
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'mobile',
      name: 'Mobile App',
      icon: Smartphone,
      description: 'Native mobile learning experience',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'live',
      name: 'Live Learning',
      icon: Video,
      description: 'Virtual classrooms and live sessions',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'assessment',
      name: 'Proctored Exams',
      icon: Shield,
      description: 'Secure online assessments',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'vr',
      name: 'VR/AR Learning',
      icon: Gamepad2,
      description: 'Immersive learning experiences',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Building2,
      description: 'Corporate training solutions',
      color: 'from-gray-600 to-blue-600'
    },
    {
      id: 'plagiarism',
      name: 'Plagiarism Detection',
      icon: Eye,
      description: 'AI-powered academic integrity',
      color: 'from-red-600 to-purple-600'
    },
    {
      id: 'social',
      name: 'Social Learning',
      icon: Users,
      description: 'Community and collaboration',
      color: 'from-blue-500 to-green-500'
    },
    {
      id: 'content',
      name: 'Content Management',
      icon: FileText,
      description: 'Advanced content organization',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'analytics':
        return <AnalyticsDashboard userRole="student" />;
      case 'mobile':
        return <MobileApp />;
      case 'live':
        return <VirtualClassroom />;
      case 'assessment':
        return <ProctorSystem examId="exam-001" duration={7200} onViolation={(type, severity) => console.log('Violation:', type, severity)} />;
      case 'vr':
        return <VRLearning courseId="course-1" lessonId="lesson-1" />;
      case 'enterprise':
        return <EnterpriseFeatures />;
      case 'plagiarism':
        return <PlagiarismDetection />;
      case 'social':
        return <SocialLearning />;
      case 'content':
        return <ContentManagement />;
      default:
        return <AnalyticsDashboard userRole="student" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Advanced Learning Platform
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Experience the future of education with AI-powered analytics, VR learning, 
            live classrooms, and enterprise-grade security
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Brain className="h-8 w-8 mx-auto mb-2 text-purple-300" />
              <div className="text-lg font-bold">AI-Powered</div>
              <div className="text-sm text-blue-200">Smart Analytics</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Smartphone className="h-8 w-8 mx-auto mb-2 text-green-300" />
              <div className="text-lg font-bold">Mobile First</div>
              <div className="text-sm text-blue-200">Learn Anywhere</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Video className="h-8 w-8 mx-auto mb-2 text-red-300" />
              <div className="text-lg font-bold">Live Classes</div>
              <div className="text-sm text-blue-200">Real-time Learning</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Shield className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-lg font-bold">Secure</div>
              <div className="text-sm text-blue-200">Enterprise Grade</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  activeFeature === feature.id
                    ? 'bg-gradient-to-r ' + feature.color + ' text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <feature.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">{feature.name}</div>
                  <div className={`text-xs ${activeFeature === feature.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {feature.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Content */}
      <div className="py-8">
        {renderFeatureContent()}
      </div>

      {/* Technology Stack */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powered by Cutting-Edge Technology</h2>
            <p className="text-gray-300">Built with modern technologies for scalability and performance</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: 'React', category: 'Frontend' },
              { name: 'Node.js', category: 'Backend' },
              { name: 'WebRTC', category: 'Video' },
              { name: 'TensorFlow', category: 'AI/ML' },
              { name: 'WebXR', category: 'VR/AR' },
              { name: 'Supabase', category: 'Database' }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <div className="font-semibold">{tech.name}</div>
                <div className="text-sm text-gray-400">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}