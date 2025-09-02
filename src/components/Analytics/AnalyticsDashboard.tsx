import React, { useState } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Target, 
  Clock, 
  Award,
  BarChart3,
  PieChart,
  Activity,
  Zap
} from 'lucide-react';

interface AnalyticsProps {
  userRole: 'student' | 'instructor' | 'admin';
}

export default function AnalyticsDashboard({ userRole }: AnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const aiInsights = {
    predictedPerformance: 87,
    recommendedCourses: [
      { title: 'Advanced React Patterns', match: 95, reason: 'Based on your JavaScript progress' },
      { title: 'Node.js Backend Development', match: 89, reason: 'Complements your frontend skills' }
    ],
    learningPath: [
      { step: 1, course: 'JavaScript Fundamentals', status: 'completed' },
      { step: 2, course: 'React Basics', status: 'current' },
      { step: 3, course: 'Advanced React', status: 'recommended' },
      { step: 4, course: 'Full-Stack Development', status: 'future' }
    ],
    riskFactors: [
      { factor: 'Engagement dropping', severity: 'medium', suggestion: 'Try interactive coding challenges' },
      { factor: 'Long gaps between sessions', severity: 'low', suggestion: 'Set daily learning reminders' }
    ]
  };

  const performanceMetrics = {
    completionRate: 78,
    averageScore: 85,
    timeSpent: 24.5,
    streakDays: 12,
    engagementScore: 92
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">AI Learning Assistant</h2>
            <p className="text-purple-100">Personalized insights powered by machine learning</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">{aiInsights.predictedPerformance}%</div>
            <div className="text-sm text-purple-100">Predicted Success Rate</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">{aiInsights.recommendedCourses.length}</div>
            <div className="text-sm text-purple-100">AI Recommendations</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">{performanceMetrics.engagementScore}%</div>
            <div className="text-sm text-purple-100">Engagement Score</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Progress Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Learning Progress Analytics</h3>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 3 Months</option>
              </select>
            </div>
            
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <p className="text-gray-600">Interactive Learning Analytics</p>
                <p className="text-sm text-gray-500">Real-time progress tracking with AI insights</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-xl font-bold text-gray-900">{performanceMetrics.completionRate}%</div>
              <div className="text-xs text-gray-600">Completion Rate</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-gray-900">{performanceMetrics.averageScore}%</div>
              <div className="text-xs text-gray-600">Average Score</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-xl font-bold text-gray-900">{performanceMetrics.timeSpent}h</div>
              <div className="text-xs text-gray-600">Time Spent</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🔥</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{performanceMetrics.streakDays}</div>
              <div className="text-xs text-gray-600">Day Streak</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-xl font-bold text-gray-900">{performanceMetrics.engagementScore}%</div>
              <div className="text-xs text-gray-600">Engagement</div>
            </div>
          </div>
        </div>

        {/* AI Recommendations Sidebar */}
        <div className="space-y-6">
          {/* AI Course Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold text-gray-900">AI Recommendations</h3>
            </div>
            
            <div className="space-y-3">
              {aiInsights.recommendedCourses.map((course, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm text-gray-900">{course.title}</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {course.match}% match
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{course.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Personalized Learning Path</h3>
            <div className="space-y-3">
              {aiInsights.learningPath.map((step) => (
                <div key={step.step} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    step.status === 'completed' ? 'bg-green-500 text-white' :
                    step.status === 'current' ? 'bg-blue-500 text-white' :
                    step.status === 'recommended' ? 'bg-yellow-500 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${
                      step.status === 'current' ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {step.course}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">{step.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Factors */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Learning Insights</h3>
            <div className="space-y-3">
              {aiInsights.riskFactors.map((risk, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  risk.severity === 'high' ? 'border-red-200 bg-red-50' :
                  risk.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                  'border-blue-200 bg-blue-50'
                }`}>
                  <div className="font-medium text-sm text-gray-900">{risk.factor}</div>
                  <div className="text-xs text-gray-600 mt-1">{risk.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}