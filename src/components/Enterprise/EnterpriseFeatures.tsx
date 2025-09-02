import React, { useState } from 'react';
import { 
  Building2, 
  Shield, 
  Users, 
  Key, 
  Palette, 
  Database,
  Lock,
  Globe,
  BarChart3,
  Settings,
  UserCheck,
  FileText,
  Zap
} from 'lucide-react';

export default function EnterpriseFeatures() {
  const [activeTab, setActiveTab] = useState('sso');

  const enterpriseStats = {
    organizations: 150,
    totalUsers: 25000,
    activeIntegrations: 12,
    complianceScore: 98
  };

  const ssoProviders = [
    { name: 'Microsoft Azure AD', status: 'connected', users: 5420 },
    { name: 'Google Workspace', status: 'connected', users: 3200 },
    { name: 'Okta', status: 'connected', users: 1800 },
    { name: 'LDAP', status: 'available', users: 0 },
    { name: 'SAML 2.0', status: 'available', users: 0 }
  ];

  const complianceFeatures = [
    { name: 'GDPR Compliance', status: 'active', description: 'Data protection and privacy controls' },
    { name: 'WCAG 2.1 AA', status: 'active', description: 'Web accessibility standards' },
    { name: 'SOC 2 Type II', status: 'active', description: 'Security and availability controls' },
    { name: 'FERPA', status: 'active', description: 'Educational records privacy' },
    { name: 'COPPA', status: 'active', description: 'Children\'s online privacy protection' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise Solutions</h2>
        <p className="text-gray-600">Scalable learning management for organizations</p>
      </div>

      {/* Enterprise Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{enterpriseStats.organizations}</div>
          <div className="text-sm text-gray-600">Organizations</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{enterpriseStats.totalUsers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Enterprise Users</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Zap className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{enterpriseStats.activeIntegrations}</div>
          <div className="text-sm text-gray-600">Active Integrations</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Shield className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{enterpriseStats.complianceScore}%</div>
          <div className="text-sm text-gray-600">Compliance Score</div>
        </div>
      </div>

      {/* Feature Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'sso', name: 'SSO & Identity', icon: Key },
              { id: 'branding', name: 'White Label', icon: Palette },
              { id: 'compliance', name: 'Compliance', icon: Shield },
              { id: 'analytics', name: 'Enterprise Analytics', icon: BarChart3 }
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

        <div className="p-6">
          {/* SSO & Identity Tab */}
          {activeTab === 'sso' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Single Sign-On Providers</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {ssoProviders.map((provider, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{provider.name}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          provider.status === 'connected' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {provider.status}
                        </span>
                      </div>
                      {provider.status === 'connected' && (
                        <div className="text-sm text-gray-600">
                          {provider.users.toLocaleString()} active users
                        </div>
                      )}
                      <button className={`w-full mt-3 py-2 rounded-lg font-medium transition-colors ${
                        provider.status === 'connected'
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}>
                        {provider.status === 'connected' ? 'Disconnect' : 'Configure'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Identity Management Features</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Automatic user provisioning and deprovisioning</li>
                  <li>• Role-based access control (RBAC)</li>
                  <li>• Multi-factor authentication (MFA)</li>
                  <li>• Just-in-time (JIT) user creation</li>
                  <li>• Group-based course assignments</li>
                </ul>
              </div>
            </div>
          )}

          {/* White Label Tab */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Customization</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Palette className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload your company logo</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                      <div className="flex items-center space-x-3">
                        <input type="color" value="#3B82F6" className="w-12 h-10 rounded border border-gray-300" />
                        <span className="text-sm text-gray-600">#3B82F6</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Custom Domain</label>
                      <input
                        type="text"
                        placeholder="learning.yourcompany.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Preview</h4>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                        <span className="font-bold text-gray-900">Your Company LMS</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-blue-600 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">White Label Features</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Custom branding and color schemes</li>
                  <li>• Personalized domain and subdomain</li>
                  <li>• Custom email templates</li>
                  <li>• Branded mobile applications</li>
                  <li>• Custom certificate designs</li>
                </ul>
              </div>
            </div>
          )}

          {/* Compliance Tab */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance & Security</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {complianceFeatures.map((feature, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{feature.name}</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {feature.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Security Features</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• End-to-end encryption</li>
                    <li>• Advanced threat protection</li>
                    <li>• Audit logging and monitoring</li>
                    <li>• Data loss prevention (DLP)</li>
                    <li>• Regular security assessments</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Accessibility Features</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Screen reader compatibility</li>
                    <li>• Keyboard navigation support</li>
                    <li>• High contrast mode</li>
                    <li>• Closed captions for videos</li>
                    <li>• Text-to-speech integration</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Enterprise Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enterprise Analytics Dashboard</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
                      <div className="text-sm text-gray-600">Course Completion Rate</div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
                      <div className="text-sm text-gray-600">Average Satisfaction</div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">156h</div>
                      <div className="text-sm text-gray-600">Avg Learning Time</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Department Performance</h4>
                <div className="space-y-3">
                  {[
                    { dept: 'Engineering', completion: 92, users: 450, avgScore: 88 },
                    { dept: 'Sales', completion: 78, users: 320, avgScore: 85 },
                    { dept: 'Marketing', completion: 85, users: 180, avgScore: 90 },
                    { dept: 'HR', completion: 95, users: 120, avgScore: 92 }
                  ].map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{dept.dept}</div>
                        <div className="text-sm text-gray-600">{dept.users} users</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{dept.completion}% completion</div>
                        <div className="text-xs text-gray-600">Avg score: {dept.avgScore}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Multi-Tenant Architecture */}
      <div className="mt-12 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl p-8 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Multi-Tenant Architecture</h3>
          <p className="text-blue-200">Scalable infrastructure for enterprise deployments</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <Database className="h-12 w-12 mx-auto mb-3 text-blue-300" />
            <h4 className="font-semibold mb-2">Data Isolation</h4>
            <p className="text-sm text-blue-200">Complete tenant data separation</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <Globe className="h-12 w-12 mx-auto mb-3 text-green-300" />
            <h4 className="font-semibold mb-2">Global Scale</h4>
            <p className="text-sm text-blue-200">Multi-region deployment support</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <Settings className="h-12 w-12 mx-auto mb-3 text-purple-300" />
            <h4 className="font-semibold mb-2">Custom Configuration</h4>
            <p className="text-sm text-blue-200">Tenant-specific settings and features</p>
          </div>
        </div>
      </div>
    </div>
  );
}