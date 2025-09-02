import React, { useState, useRef, useEffect } from 'react';
import { 
  Headphones, 
  Eye, 
  Hand, 
  Gamepad2, 
  Trophy, 
  Users, 
  Zap,
  Target,
  Star,
  Gift,
  Sword,
  Shield,
  Crown,
  Sparkles
} from 'lucide-react';

interface VRLearningProps {
  courseId: string;
  lessonId: string;
  onProgress?: (progress: number) => void;
}

export default function VRLearning({ courseId, lessonId, onProgress }: VRLearningProps) {
  const [isVRMode, setIsVRMode] = useState(false);
  const [vrSupported, setVRSupported] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Alex', avatar: 'A', level: 15, online: true },
    { id: '2', name: 'Priya', avatar: 'P', level: 12, online: true },
    { id: '3', name: 'Carlos', avatar: 'C', level: 18, online: false }
  ]);
  const [rewards, setRewards] = useState([
    { id: '1', name: 'Code Master Badge', type: 'badge', rarity: 'epic', earned: false },
    { id: '2', name: 'Virtual Sword', type: 'item', rarity: 'rare', earned: true },
    { id: '3', name: 'Learning Crown', type: 'cosmetic', rarity: 'legendary', earned: false }
  ]);

  const vrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check VR support
    if ('xr' in navigator) {
      navigator.xr?.isSessionSupported('immersive-vr').then(supported => {
        setVRSupported(supported);
      });
    }
  }, []);

  const startVRSession = async () => {
    try {
      if ('xr' in navigator && navigator.xr) {
        const session = await navigator.xr.requestSession('immersive-vr');
        setIsVRMode(true);
        console.log('VR session started');
      }
    } catch (error) {
      console.error('VR session failed:', error);
      alert('VR not available. Using 3D simulation mode.');
      setIsVRMode(true);
    }
  };

  const joinTeamChallenge = (challengeId: string) => {
    setCurrentChallenge(challengeId);
    console.log(`Joining team challenge: ${challengeId}`);
  };

  const claimReward = (rewardId: string) => {
    setRewards(prev => prev.map(reward => 
      reward.id === rewardId ? { ...reward, earned: true } : reward
    ));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isVRMode) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        {/* VR Environment Simulation */}
        <div className="relative h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black overflow-hidden">
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          {/* VR Interface */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <div className="mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center relative">
                  <Eye className="h-16 w-16 text-white" />
                  <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-spin"></div>
                </div>
                <h2 className="text-3xl font-bold mb-2">VR Learning Environment</h2>
                <p className="text-blue-200">Immersive 3D coding experience</p>
              </div>

              {/* VR Controls */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Hand className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                  <div className="text-sm">Hand Tracking</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Eye className="h-8 w-8 mx-auto mb-2 text-green-300" />
                  <div className="text-sm">Eye Tracking</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Headphones className="h-8 w-8 mx-auto mb-2 text-purple-300" />
                  <div className="text-sm">Spatial Audio</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-sm">Controllers</div>
                </div>
              </div>

              {/* 3D Code Environment */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-white/20">
                    <h3 className="font-semibold mb-2">3D Code Editor</h3>
                    <div className="bg-black/50 rounded p-3 font-mono text-sm text-green-400">
                      <div>function useState() {`{`}</div>
                      <div className="ml-4">return [state, setState];</div>
                      <div>{`}`}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg p-4 border border-white/20">
                    <h3 className="font-semibold mb-2">Virtual Mentor</h3>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <p className="text-xs text-blue-200">AI Assistant Active</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-white/20">
                    <h3 className="font-semibold mb-2">Team Space</h3>
                    <div className="flex -space-x-2 justify-center mb-2">
                      {teamMembers.slice(0, 3).map(member => (
                        <div key={member.id} className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                          {member.avatar}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-blue-200">Collaborative Learning</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsVRMode(false)}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Exit VR Mode
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">VR/AR Learning Experience</h2>
          <p className="text-gray-600">Immersive learning with virtual and augmented reality</p>
        </div>

        {/* VR Setup */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">VR Learning Environment</h3>
                <p className="text-sm text-gray-600">Immersive 3D coding experience</p>
              </div>
            </div>

            <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg mb-4 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Headphones className="h-12 w-12" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">3D Code Universe</h4>
                  <p className="text-purple-200 text-sm">Interactive programming environment</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <div className="text-white text-xs">React Components</div>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <div className="text-white text-xs">JavaScript Functions</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                VR Support: {vrSupported ? '✅ Available' : '❌ Not Available'}
              </div>
              <button
                onClick={startVRSession}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Enter VR</span>
              </button>
            </div>
          </div>

          {/* AR Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AR Code Visualization</h3>
                <p className="text-sm text-gray-600">Augmented reality overlays</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-medium text-gray-900 mb-2">AR Features</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 3D code structure visualization</li>
                  <li>• Interactive debugging overlays</li>
                  <li>• Real-time collaboration markers</li>
                  <li>• Gesture-based code navigation</li>
                </ul>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Launch AR Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gamification Features */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Tournaments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Coding Tournaments</h3>
            </div>

            <div className="space-y-3">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">React Challenge</span>
                  <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full">Live</span>
                </div>
                <div className="text-xs text-gray-600 mb-2">156 participants • Ends in 2h 45m</div>
                <button
                  onClick={() => joinTeamChallenge('react-challenge')}
                  className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                >
                  Join Tournament
                </button>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Python Data Race</span>
                  <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded-full">Upcoming</span>
                </div>
                <div className="text-xs text-gray-600">Starts in 3 days</div>
              </div>
            </div>
          </div>

          {/* Team Challenges */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Team Challenges</h3>
            </div>

            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-medium text-sm text-gray-900 mb-2">Build a Full-Stack App</h4>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex -space-x-1">
                    {teamMembers.map(member => (
                      <div key={member.id} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        member.online ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        {member.avatar}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">Team Alpha</span>
                </div>
                <div className="text-xs text-gray-600 mb-2">Progress: 45% • 2 days remaining</div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-green-600 h-1 rounded-full w-[45%]"></div>
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                Create New Team
              </button>
            </div>
          </div>

          {/* Virtual Rewards */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Gift className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Virtual Rewards</h3>
            </div>

            <div className="space-y-3">
              {rewards.map((reward) => (
                <div key={reward.id} className={`border rounded-lg p-3 ${
                  reward.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {reward.type === 'badge' && <Shield className="h-4 w-4 text-blue-600" />}
                      {reward.type === 'item' && <Sword className="h-4 w-4 text-purple-600" />}
                      {reward.type === 'cosmetic' && <Crown className="h-4 w-4 text-yellow-600" />}
                      <span className="text-sm font-medium">{reward.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(reward.rarity)}`}>
                      {reward.rarity}
                    </span>
                  </div>
                  
                  {reward.earned ? (
                    <div className="text-xs text-green-600 font-medium">✓ Earned</div>
                  ) : (
                    <button
                      onClick={() => claimReward(reward.id)}
                      className="w-full bg-purple-600 text-white py-1 rounded text-xs hover:bg-purple-700 transition-colors"
                    >
                      Unlock (500 XP)
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VR Learning Modes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">VR Learning Modes</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Interactive Coding</h4>
              <p className="text-sm text-gray-600 mb-4">Write code in 3D space with gesture controls</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Start Session
              </button>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Virtual Classroom</h4>
              <p className="text-sm text-gray-600 mb-4">Attend live classes in virtual environments</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                Join Class
              </button>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Coding Games</h4>
              <p className="text-sm text-gray-600 mb-4">Learn through interactive VR games</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                Play Games
              </button>
            </div>
          </div>
        </div>

        {/* Current Challenge */}
        {currentChallenge && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Active Challenge: React Tournament</h3>
                <p className="text-yellow-100">Build a React component in under 30 minutes</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">23:45</div>
                <div className="text-sm text-yellow-200">Time Remaining</div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">156</div>
                <div className="text-xs text-yellow-200">Participants</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">#12</div>
                <div className="text-xs text-yellow-200">Your Rank</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">500</div>
                <div className="text-xs text-yellow-200">XP Prize</div>
              </div>
            </div>
          </div>
        )}

        {/* VR Hardware Requirements */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">VR Hardware Support</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: 'Meta Quest 3', supported: true },
              { name: 'HTC Vive', supported: true },
              { name: 'Valve Index', supported: true },
              { name: 'PICO 4', supported: true }
            ].map((device, index) => (
              <div key={index} className={`p-4 rounded-lg border text-center ${
                device.supported 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="text-sm font-medium text-gray-900">{device.name}</div>
                <div className={`text-xs mt-1 ${
                  device.supported ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {device.supported ? '✓ Supported' : 'Coming Soon'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }