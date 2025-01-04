import React, { useState, useRef } from 'react';
import PDFViewer from './PdfViewer';
import GoogleDrivePDFViewer from './GoogleDrivePDFViewer';
import { Play, Pause, Volume2, VolumeX, RotateCcw, FastForward, Rewind } from 'lucide-react';

const AudioPlayer = ({ url, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleForward = () => {
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
  };

  const handleRewind = () => {
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
  };

  const handleReset = () => {
    audioRef.current.currentTime = 0;
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-4">
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
      
      <div className="text-gray-700 font-medium mb-4 text-center">
        {title}
      </div>

      <div className="flex flex-col gap-4">
        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 w-12">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="flex-grow h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-500 w-12">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleRewind}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Reculer de 10 secondes"
          >
            <Rewind size={20} />
          </button>

          <button
            onClick={togglePlay}
            className="p-3 bg-[#006C5F] hover:bg-[#005a4f] text-white rounded-full transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={handleForward}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Avancer de 10 secondes"
          >
            <FastForward size={20} />
          </button>
        </div>

        {/* Additional controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Recommencer"
          >
            <RotateCcw size={20} />
          </button>

          <button
            onClick={toggleMute}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

const MediaDisplay = ({ mediaType, mediaUrl, title }) => {
  const isPDFGoogleDrive = mediaUrl?.includes('drive.google.com');

  const renderMedia = () => {
    switch (mediaType) {
      case 'video':
        const videoId = mediaUrl.split('v=')[1]?.split('&')[0];
        if (!videoId) return <div className="text-red-500">Invalid YouTube URL</div>;
        
        return (
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );

      case 'image':
        return (
          <div className="w-full flex justify-center">
            <img
              src={mediaUrl}
              alt={title}
              className="max-w-full h-auto rounded-xl shadow-sm"
              onError={(e) => {
                e.target.src = "/api/placeholder/400/320";
                e.target.alt = "Image not available";
              }}
            />
          </div>
        );

      case 'pdf':
        return (
          <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
            {isPDFGoogleDrive ? (
              <GoogleDrivePDFViewer url={mediaUrl} />
            ) : (
              <PDFViewer url={mediaUrl} />
            )}
          </div>
        );

      case 'audio':
        return <AudioPlayer url={mediaUrl} title={title} />;

      default:
        return (
          <div className="p-4 bg-gray-100 rounded-xl text-gray-600 text-center">
            Media type not supported
          </div>
        );
    }
  };

  return (
    <div className="w-full mb-8">
      {renderMedia()}
    </div>
  );
};

export default MediaDisplay;