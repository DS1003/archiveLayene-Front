import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs';
import { Card, CardContent } from './ui/Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MediaDisplay from './MediaDisplay';

const MediaCollection = ({ mediaItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!mediaItems || mediaItems.length === 0) {
    return null;
  }

  // Si un seul média, on utilise directement MediaDisplay
  if (mediaItems.length === 1) {
    const media = mediaItems[0];
    return (
      <MediaDisplay 
        mediaType={media.type}
        mediaUrl={media.url}
        title={media.title}
      />
    );
  }

  // Pour plusieurs médias, on crée un carousel avec des onglets
  return (
    <Card className="w-full mb-8">
      <CardContent className="p-4">
        {/* Navigation buttons */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : mediaItems.length - 1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft size={24} />
          </button>
          
          <span className="text-sm font-medium text-gray-500">
            {currentIndex + 1} / {mediaItems.length}
          </span>
          
          <button
            onClick={() => setCurrentIndex(prev => prev < mediaItems.length - 1 ? prev + 1 : 0)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Media display */}
        <div className="mb-4">
          <MediaDisplay 
            mediaType={mediaItems[currentIndex].type}
            mediaUrl={mediaItems[currentIndex].url}
            title={mediaItems[currentIndex].title}
          />
        </div>

        {/* Thumbnails/tabs navigation */}
        <div className="grid grid-cols-4 gap-2">
          {mediaItems.map((media, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`p-2 rounded-lg transition-colors ${
                currentIndex === index 
                  ? 'bg-[#006C5F] text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <div className="text-xs font-medium truncate">
                {media.type === 'video' && 'Vidéo'}
                {media.type === 'audio' && 'Audio'}
                {media.type === 'image' && 'Image'}
                {media.type === 'pdf' && 'PDF'}
                {" "}#{index + 1}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaCollection;