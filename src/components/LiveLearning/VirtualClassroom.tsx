import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  Users, 
  MessageCircle,
  Hand,
  Settings,
  Record,
  Square,
  Maximize,
  Volume2,
  VolumeX,
  Pen,
  Eraser,
  Circle,
  Square as SquareIcon,
  Type
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  role: 'instructor' | 'student';
  isVideoOn: boolean;
  isAudioOn: boolean;
  isHandRaised: boolean;
}

export default function VirtualClassroom() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [whiteboardTool, setWhiteboardTool] = useState('pen');
  const [participants] = useState<Participant[]>([
    { id: '1', name: 'Dr. Sarah Wilson', role: 'instructor', isVideoOn: true, isAudioOn: true, isHandRaised: false },
    { id: '2', name: 'John Student', role: 'student', isVideoOn: true, isAudioOn: false, isHandRaised: false },
    { id: '3', name: 'Priya Sharma', role: 'student', isVideoOn: false, isAudioOn: true, isHandRaised: true },
    { id: '4', name: 'Arjun Kumar', role: 'student', isVideoOn: true, isAudioOn: true, isHandRaised: false },
  ]);

  const chatMessages = [
    { id: '1', user: 'Dr. Sarah Wilson', message: 'Welcome to today\'s live session!', time: '10:00 AM', role: 'instructor' },
    { id: '2', user: 'John Student', message: 'Thank you! Excited to learn about React hooks', time: '10:01 AM', role: 'student' },
    { id: '3', user: 'Priya Sharma', message: 'Can you share the code example again?', time: '10:02 AM', role: 'student' },
  ];

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleAudio = () => setIsAudioOn(!isAudioOn);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
  const toggleRecording = () => setIsRecording(!isRecording);

  const sendMessage = () => {
    if (chatMessage.trim()) {
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  const raiseHand = () => {
    console.log('Hand raised');
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-semibold">React Fundamentals - Live Session</h1>
          {isRecording && (
            <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm">Recording</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-gray-300 text-sm">{participants.length} participants</span>
          <button className="text-gray-300 hover:text-white p-2">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Grid */}
          <div className="flex-1 p-4">
            {showWhiteboard ? (
              <div className="h-full bg-white rounded-lg relative">
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setWhiteboardTool('pen')}
                      className={`p-2 rounded-lg ${whiteboardTool === 'pen' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      <Pen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setWhiteboardTool('eraser')}
                      className={`p-2 rounded-lg ${whiteboardTool === 'eraser' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      <Eraser className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setWhiteboardTool('circle')}
                      className={`p-2 rounded-lg ${whiteboardTool === 'circle' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      <Circle className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setWhiteboardTool('square')}
                      className={`p-2 rounded-lg ${whiteboardTool === 'square' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      <SquareIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setWhiteboardTool('text')}
                      className={`p-2 rounded-lg ${whiteboardTool === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      <Type className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowWhiteboard(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                  >
                    Close Whiteboard
                  </button>
                </div>
                
                <canvas
                  ref={canvasRef}
                  className="w-full h-full cursor-crosshair"
                  style={{ marginTop: '60px' }}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                {participants.map((participant) => (
                  <div key={participant.id} className="bg-gray-800 rounded-lg relative overflow-hidden">
                    {participant.isVideoOn ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <div className="text-white text-4xl font-bold">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <div className="text-center">
                          <VideoOff className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-400 text-sm">{participant.name}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Participant Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-white text-sm font-medium">{participant.name}</span>
                          {participant.role === 'instructor' && (
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Host</span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {participant.isHandRaised && (
                            <Hand className="h-4 w-4 text-yellow-400" />
                          )}
                          {!participant.isAudioOn && (
                            <MicOff className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="bg-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-lg transition-colors ${
                    isVideoOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </button>
                
                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-lg transition-colors ${
                    isAudioOn ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </button>

                <button
                  onClick={raiseHand}
                  className="p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <Hand className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleScreenShare}
                  className={`p-3 rounded-lg transition-colors ${
                    isScreenSharing ? 'bg-green-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  <Monitor className="h-5 w-5" />
                </button>

                <button
                  onClick={() => setShowWhiteboard(!showWhiteboard)}
                  className={`p-3 rounded-lg transition-colors ${
                    showWhiteboard ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  <Pen className="h-5 w-5" />
                </button>

                <button
                  onClick={toggleRecording}
                  className={`p-3 rounded-lg transition-colors ${
                    isRecording ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {isRecording ? <Square className="h-5 w-5" /> : <Record className="h-5 w-5" />}
                </button>

                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                  Leave Session
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Live Chat</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      msg.role === 'instructor' ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {msg.user}
                    </span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Chat Toggle */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}