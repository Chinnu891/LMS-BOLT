import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Search,
  Eye,
  Download,
  Clock,
  Users,
  Zap
} from 'lucide-react';

interface PlagiarismResult {
  id: string;
  studentName: string;
  assignment: string;
  similarityScore: number;
  sources: Array<{
    type: 'web' | 'student' | 'database';
    source: string;
    similarity: number;
  }>;
  status: 'clean' | 'suspicious' | 'flagged';
  submittedAt: string;
}

export default function PlagiarismDetection() {
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [scanInProgress, setScanInProgress] = useState(false);

  const plagiarismResults: PlagiarismResult[] = [
    {
      id: '1',
      studentName: 'John Doe',
      assignment: 'React Component Assignment',
      similarityScore: 15,
      sources: [
        { type: 'web', source: 'stackoverflow.com', similarity: 12 },
        { type: 'database', source: 'Code snippets library', similarity: 8 }
      ],
      status: 'clean',
      submittedAt: '2024-02-15 14:30'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      assignment: 'JavaScript Functions Project',
      similarityScore: 45,
      sources: [
        { type: 'student', source: 'Previous submission by Alex Kumar', similarity: 35 },
        { type: 'web', source: 'github.com/example-repo', similarity: 25 }
      ],
      status: 'suspicious',
      submittedAt: '2024-02-15 13:15'
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      assignment: 'Database Design Project',
      similarityScore: 78,
      sources: [
        { type: 'web', source: 'tutorialspoint.com', similarity: 65 },
        { type: 'student', source: 'Sarah Wilson - 2023', similarity: 45 }
      ],
      status: 'flagged',
      submittedAt: '2024-02-15 12:00'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean': return 'text-green-600 bg-green-100';
      case 'suspicious': return 'text-yellow-600 bg-yellow-100';
      case 'flagged': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean': return <CheckCircle className="h-4 w-4" />;
      case 'suspicious': return <AlertTriangle className="h-4 w-4" />;
      case 'flagged': return <Shield className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const runPlagiarismScan = () => {
    setScanInProgress(true);
    setTimeout(() => {
      setScanInProgress(false);
      alert('Plagiarism scan completed for all submissions');
    }, 3000);
  };

  const selectedResultData = plagiarismResults.find(r => r.id === selectedResult);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Plagiarism Detection</h2>
            <p className="text-gray-600">AI-powered academic integrity monitoring</p>
          </div>
          <button
            onClick={runPlagiarismScan}
            disabled={scanInProgress}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <Search className="h-4 w-4" />
            <span>{scanInProgress ? 'Scanning...' : 'Run Scan'}</span>
          </button>
        </div>
      </div>

      {/* Scan Progress */}
      {scanInProgress && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <div>
              <div className="font-medium text-blue-900">AI Plagiarism Scan in Progress</div>
              <div className="text-sm text-blue-700">Analyzing submissions against 50M+ sources...</div>
            </div>
          </div>
          <div className="mt-3 w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-2/3 transition-all duration-1000"></div>
          </div>
        </div>
      )}

      {/* Results Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {plagiarismResults.filter(r => r.status === 'clean').length}
              </div>
              <div className="text-sm text-gray-600">Clean Submissions</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {plagiarismResults.filter(r => r.status === 'suspicious').length}
              </div>
              <div className="text-sm text-gray-600">Needs Review</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {plagiarismResults.filter(r => r.status === 'flagged').length}
              </div>
              <div className="text-sm text-gray-600">Flagged</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">98.5%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Scans</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Similarity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plagiarismResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{result.studentName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{result.assignment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className={`text-sm font-medium ${
                        result.similarityScore < 20 ? 'text-green-600' :
                        result.similarityScore < 50 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {result.similarityScore}%
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${
                            result.similarityScore < 20 ? 'bg-green-600' :
                            result.similarityScore < 50 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${Math.min(result.similarityScore, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {getStatusIcon(result.status)}
                      <span className="ml-1 capitalize">{result.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.submittedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedResult(result.id)}
                        className="p-1 text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-gray-700">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Result Modal */}
      {selectedResult && selectedResultData && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">Plagiarism Analysis Details</h3>
              <button
                onClick={() => setSelectedResult(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Submission Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student:</span>
                      <span className="font-medium">{selectedResultData.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Assignment:</span>
                      <span className="font-medium">{selectedResultData.assignment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Similarity Score:</span>
                      <span className={`font-bold ${
                        selectedResultData.similarityScore < 20 ? 'text-green-600' :
                        selectedResultData.similarityScore < 50 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedResultData.similarityScore}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedResultData.status)}`}>
                        {getStatusIcon(selectedResultData.status)}
                        <span className="ml-1 capitalize">{selectedResultData.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Similar Sources</h4>
                  <div className="space-y-3">
                    {selectedResultData.sources.map((source, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{source.source}</span>
                          <span className="text-sm font-bold text-red-600">{source.similarity}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            source.type === 'web' ? 'bg-blue-100 text-blue-800' :
                            source.type === 'student' ? 'bg-orange-100 text-orange-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {source.type}
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-1">
                            <div 
                              className="bg-red-600 h-1 rounded-full"
                              style={{ width: `${source.similarity}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-3">AI Analysis Report</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-800 mb-2">Detection Methods</h5>
                    <ul className="text-purple-700 space-y-1">
                      <li>• Semantic similarity analysis</li>
                      <li>• Code structure comparison</li>
                      <li>• Variable naming patterns</li>
                      <li>• Comment similarity check</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-800 mb-2">Confidence Metrics</h5>
                    <ul className="text-purple-700 space-y-1">
                      <li>• Algorithm accuracy: 98.5%</li>
                      <li>• False positive rate: 1.2%</li>
                      <li>• Sources checked: 50M+</li>
                      <li>• Processing time: 2.3 seconds</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t">
                <div className="flex items-center space-x-3">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Mark as Reviewed
                  </button>
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                    Request Clarification
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Flag for Investigation
                  </button>
                </div>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Detection Features */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Advanced AI Detection</h3>
            <p className="text-purple-100">Next-generation plagiarism detection technology</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Zap className="h-12 w-12 mx-auto mb-3 text-yellow-300" />
              <h4 className="font-semibold mb-2">Real-time Analysis</h4>
              <p className="text-sm text-purple-100">Instant plagiarism detection as students type</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Search className="h-12 w-12 mx-auto mb-3 text-blue-300" />
              <h4 className="font-semibold mb-2">Deep Web Scanning</h4>
              <p className="text-sm text-purple-100">Searches across 50M+ academic sources</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Shield className="h-12 w-12 mx-auto mb-3 text-green-300" />
              <h4 className="font-semibold mb-2">Code Fingerprinting</h4>
              <p className="text-sm text-purple-100">Advanced algorithm similarity detection</p>
            </div>
          </div>
        </div>
      </div>
    );
  }