import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { VideoSecurityMonitor } from './VideoSecurityMonitor';
import './VideoProtection.css';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!isOpen) return null;

  const getFullUrl = (url: string): string => {
    // Get the API base URL from environment or fallback to production
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://deev--edu-platform--fnj72wsf9xl6.code.run/api';
    const backendBaseUrl = apiBaseUrl.replace('/api', '');
    
    if (url.startsWith('http')) {
      // If it's already a full URL, check if it needs a token
      if (url.includes('/uploads/videos/') || url.includes('/api/files/videos/')) {
        const token = localStorage.getItem('token');
        // Check if token is already in the URL
        if (token && !url.includes('token=')) {
          return `${url}?token=${token}`;
        }
      }
      return url;
    }
    
    // For video files, append authentication token
    if (url.includes('/uploads/videos/') || url.includes('/api/files/videos/')) {
      const token = localStorage.getItem('token');
      const baseUrl = url.startsWith('/uploads') ? `${backendBaseUrl}${url}` : url;
      return token ? `${baseUrl}?token=${token}` : baseUrl;
    }
    
    if (url.startsWith('/uploads')) return `${backendBaseUrl}${url}`;
    return url;
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const error = video.error;
    
    if (error) {
      console.error('Video error code:', error.code, error.message);
      
      // Show user-friendly error message
      let errorMessage = 'Failed to load video. ';
      switch(error.code) {
        case 1: // MEDIA_ERR_ABORTED
          errorMessage += 'The video loading was aborted.';
          break;
        case 2: // MEDIA_ERR_NETWORK
          errorMessage += 'A network error occurred. Please check your internet connection.';
          break;
        case 3: // MEDIA_ERR_DECODE
          errorMessage += 'The video format is not supported or corrupted.';
          break;
        case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
          errorMessage += 'The video cannot be loaded. You may not have permission to access this video.';
          break;
        default:
          errorMessage += 'Please try refreshing the page or contact support.';
      }
      
      // Try to detect authentication issues
      if (video.src.includes('token=') && (error.code === 4 || error.message.includes('DEMUXER_ERROR'))) {
        errorMessage = 'Authentication failed. Please log out and log back in to refresh your access token.';
      }
      
      alert(errorMessage);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      
      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  return (
    <VideoSecurityMonitor isStudent={true}>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full mx-4">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4 video-protected no-select">
            <video
              ref={videoRef}
              src={getFullUrl(videoUrl)}
              className="w-full rounded-lg"
              style={{ maxHeight: '70vh' }}
              onError={handleError}
              crossOrigin="use-credentials"
              controlsList="nodownload"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Custom Video Controls */}
            <div className="mt-4 bg-gray-100 rounded-lg p-4">
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                {/* Progress Bar */}
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    aria-label="Video progress"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                
                {/* Mute Button */}
                <button
                  onClick={toggleMute}
                  className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VideoSecurityMonitor>
  );
};
