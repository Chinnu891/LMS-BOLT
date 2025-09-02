import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Monitor, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Eye,
  Clock,
  FileText,
  Lock,
  Unlock,
  Volume2,
  Wifi
} from 'lucide-react';

interface ProctorSystemProps {
  examId: string;
  duration: number;
  onViolation: (type: string, severity: 'low' | 'medium' | 'high') => void;
}

export default function ProctorSystem({ examId, duration, onViolation }: ProctorSystemProps) {
  const [isProctoring, setIsProctoring] = useState(false);
  const [violations, setViolations] = useState<Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
    description: string;
  }>>([]);
  const [systemChecks, setSystemChecks] = useState({
    camera: false,
    microphone: false,
    screenShare: false,
    browser: false,
    network: false
  });
  const [faceDetected, setFaceDetected] = useState(true);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(duration);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initialize webcam
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setSystemChecks(prev => ({ ...prev, camera: true, microphone: true }));
      })
      .catch(err => {
        console.error('Camera access denied:', err);
        addViolation('camera_denied', 'high', 'Camera access was denied');
      });

    // Monitor tab switches
    const handleVisibilityChange = () => {
      if (document.hidden && isProctoring) {
        setTabSwitches(prev => prev + 1);
        addViolation('tab_switch', 'medium', 'Student switched tabs or minimized browser');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isProctoring]);

  useEffect(() => {
    if (isProctoring && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isProctoring, timeRemaining]);

  const addViolation = (type: string, severity: 'low' | 'medium' | 'high', description: string) => {
    const violation = {
      type,
      severity,
      timestamp: new Date().toLocaleTimeString(),
      description
    };
    setViolations(prev => [...prev, violation]);
    onViolation(type, severity);
  };

  const startProctoring = async () => {
    try {
      // Request screen sharing for monitoring
      await navigator.mediaDevices.getDisplayMedia({ video: true });
      setSystemChecks(prev => ({ ...prev, screenShare: true, browser: true, network: true }));
      setIsProctoring(true);
    } catch (err) {
      console.error('Screen sharing denied:', err);
      addViolation('screen_share_denied', 'high', 'Screen sharing was denied');
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getViolationColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (!isProctoring) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Proctoring Setup</h2>
            <p className="text-gray-600">Please complete the system checks before starting your exam</p>
          </div>

          {/* System Checks */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Camera className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Camera Access</span>
              </div>
              {systemChecks.camera ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Volume2 className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Microphone Access</span>
              </div>
              {systemChecks.microphone ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Monitor className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Screen Sharing</span>
              </div>
              {systemChecks.screenShare ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              )}
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Wifi className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Network Connection</span>
              </div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>

          {/* Camera Preview */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Camera Preview</h3>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Proctoring Rules */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-yellow-800 mb-2">Proctoring Guidelines</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Keep your face visible to the camera at all times</li>
              <li>• Do not switch tabs or minimize the browser</li>
              <li>• Ensure you're in a quiet, well-lit environment</li>
              <li>• No external materials or devices allowed</li>
              <li>• Any suspicious activity will be flagged</li>
            </ul>
          </div>

          <button
            onClick={startProctoring}
            disabled={!systemChecks.camera || !systemChecks.microphone}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Proctored Exam
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-100 z-50">
      {/* Proctoring Header */}
      <div className="bg-red-600 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Shield className="h-6 w-6" />
          <span className="font-semibold">Proctored Exam in Progress</span>
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span className="text-sm">Monitoring Active</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm">Violations:</span>
            <span className={`font-bold ${violations.length > 0 ? 'text-yellow-300' : 'text-green-300'}`}>
              {violations.length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Main Exam Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">React Fundamentals Assessment</h1>
              
              {/* Sample Question */}
              <div className="space-y-6">
                <div className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Question 1 of 20</span>
                    <span className="text-sm text-blue-600">5 points</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Which React hook is used for managing component state?
                  </h3>
                  
                  <div className="space-y-3">
                    {['useState', 'useEffect', 'useContext', 'useReducer'].map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="radio" name="question1" value={option} className="text-blue-600" />
                        <span className="text-gray-900">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Next Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proctoring Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-4 space-y-4">
          {/* Live Camera Feed */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Live Monitoring</h3>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-2">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className={`flex items-center space-x-1 ${faceDetected ? 'text-green-600' : 'text-red-600'}`}>
                <Eye className="h-4 w-4" />
                <span>{faceDetected ? 'Face Detected' : 'Face Not Detected'}</span>
              </div>
              <div className="text-gray-600">
                Tab switches: {tabSwitches}
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Security Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Browser Lock</span>
                <Lock className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Screen Recording</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI Monitoring</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>

          {/* Violations Log */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Activity Log</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {violations.length === 0 ? (
                <p className="text-sm text-green-600">No violations detected</p>
              ) : (
                violations.map((violation, index) => (
                  <div key={index} className={`p-2 rounded border text-xs ${getViolationColor(violation.severity)}`}>
                    <div className="font-medium">{violation.type.replace('_', ' ').toUpperCase()}</div>
                    <div className="text-gray-600">{violation.description}</div>
                    <div className="text-gray-500">{violation.timestamp}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">AI Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-purple-700">Attention Level</span>
                <span className="text-purple-900 font-medium">High</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-700">Stress Indicators</span>
                <span className="text-purple-900 font-medium">Normal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-700">Behavior Pattern</span>
                <span className="text-purple-900 font-medium">Consistent</span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">Need Help?</h4>
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
              Contact Proctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function getViolationColor(severity: string) {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50 text-red-700';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-700';
      case 'low': return 'border-blue-200 bg-blue-50 text-blue-700';
      default: return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  }
}