import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward,
  Settings,
  Languages,
  Bookmark,
  FileText
} from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  type: 'youtube' | 'file';
  languages?: Array<{ code: string; name: string; src?: string }>;
  onProgress?: (seconds: number) => void;
  onComplete?: () => void;
  resumePosition?: number;
}

export default function VideoPlayer({ 
  src, 
  type, 
  languages = [{ code: 'en', name: 'English' }],
  onProgress,
  onComplete,
  resumePosition = 0
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]?.code || 'en');
  const [selectedQuality, setSelectedQuality] = useState('auto');
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<Array<{ time: number; text: string }>>([]);
  const [newNote, setNewNote] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // YouTube URL conversion
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0` : url;
  };

  // Control handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const seek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const addBookmark = () => {
    const time = Math.floor(currentTime);
    setNotes(prev => [...prev, { time, text: `Bookmark at ${formatTime(time)}` }]);
  };

  const addNote = () => {
    if (newNote.trim()) {
      const time = Math.floor(currentTime);
      setNotes(prev => [...prev, { time, text: newNote }]);
      setNewNote('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto-hide controls
  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seek(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seek(10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(prev => Math.min(1, prev + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(prev => Math.max(0, prev - 0.1));
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentTime, duration, volume, isMuted]);

  // Progress tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && isPlaying) {
        const time = videoRef.current.currentTime;
        setCurrentTime(time);
        onProgress?.(time);
        
        if (time >= duration * 0.9) {
          onComplete?.();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration, onProgress, onComplete]);

  // Resume position
  useEffect(() => {
    if (videoRef.current && resumePosition > 0) {
      videoRef.current.currentTime = resumePosition;
    }
  }, [resumePosition]);

  if (type === 'youtube') {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          src={getYouTubeEmbedUrl(src)}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* YouTube Overlay Controls */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-3">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center space-x-1 px-3 py-1 bg-white/20 rounded-md hover:bg-white/30 transition-colors"
              >
                <Languages className="h-4 w-4" />
                <span className="text-sm">{languages.find(l => l.code === selectedLanguage)?.name}</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={addBookmark}
                className="p-2 bg-white/20 rounded-md hover:bg-white/30 transition-colors"
              >
                <Bookmark className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="p-2 bg-white/20 rounded-md hover:bg-white/30 transition-colors"
              >
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Language Selector */}
          {showLanguages && (
            <div className="absolute bottom-full mb-2 left-0 bg-black/80 rounded-lg p-2 min-w-[150px]">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    setShowLanguages(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedLanguage === lang.code 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group"
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          onComplete?.();
        }}
      />

      {/* Video Controls */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        
        {/* Center Play Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <Play className="h-8 w-8 text-white ml-1" />
            </button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => {
                const time = parseFloat(e.target.value);
                if (videoRef.current) {
                  videoRef.current.currentTime = time;
                  setCurrentTime(time);
                }
              }}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div className="flex items-center justify-between text-white">
            {/* Left Controls */}
            <div className="flex items-center space-x-3">
              <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              
              <button onClick={() => seek(-10)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <SkipBack className="h-5 w-5" />
              </button>
              
              <button onClick={() => seek(10)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <SkipForward className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-2">
                <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors relative"
              >
                <Languages className="h-5 w-5" />
                {showLanguages && (
                  <div className="absolute bottom-full mb-2 right-0 bg-black/90 rounded-lg p-2 min-w-[120px]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setShowLanguages(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedLanguage === lang.code 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors relative"
              >
                <Settings className="h-5 w-5" />
                {showSettings && (
                  <div className="absolute bottom-full mb-2 right-0 bg-black/90 rounded-lg p-2 min-w-[120px]">
                    <div className="text-xs text-gray-300 mb-2">Quality</div>
                    {['auto', '1080p', '720p', '480p', '360p'].map((quality) => (
                      <button
                        key={quality}
                        onClick={() => {
                          setSelectedQuality(quality);
                          setShowSettings(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedQuality === quality 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        {quality}
                      </button>
                    ))}
                  </div>
                )}
              </button>

              <button
                onClick={addBookmark}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Bookmark className="h-5 w-5" />
              </button>

              <button
                onClick={() => setShowNotes(!showNotes)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <FileText className="h-5 w-5" />
              </button>

              <button onClick={toggleFullscreen} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Panel */}
      {showNotes && (
        <div className="absolute top-4 right-4 w-80 bg-black/80 rounded-lg p-4 text-white max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Notes & Bookmarks</h3>
            <button onClick={() => setShowNotes(false)} className="text-gray-400 hover:text-white">
              ×
            </button>
          </div>
          
          <div className="mb-3">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full px-3 py-2 bg-white/10 rounded-md text-white placeholder-gray-400 border border-white/20 focus:border-blue-500 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && addNote()}
            />
            <button
              onClick={addNote}
              className="mt-2 w-full px-3 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Add Note
            </button>
          </div>

          <div className="space-y-2">
            {notes.map((note, index) => (
              <div key={index} className="p-2 bg-white/10 rounded-md">
                <div className="text-xs text-blue-400 mb-1">{formatTime(note.time)}</div>
                <div className="text-sm">{note.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}