import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, BookmarkSimple } from 'lucide-react';
import VideoPlayer from '../VideoPlayer';

const MobilePostCard = ({ post, onLike }) => {
  if (!post) return null;
  
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  
  const {
    id,
    user,
    content,
    media,
    comments,
    timestamp,
    hashtags = []
  } = post;

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount(prev => prev + 1);
      if (onLike) onLike(id);
    }
  };
  
  const handleVideoLike = () => {
    handleLike();
  };

  return (
    <div className="relative h-[calc(100vh-132px)] bg-black">
      {/* Media background */}
      <div className="absolute inset-0 w-full h-full">
        {media.type === 'video' ? (
          <VideoPlayer
            src={media.url}
            poster={media.poster || media.thumbnail}
            autoPlay={true}
            loop={true}
            muted={true}
            onLike={handleVideoLike}
          />
        ) : (
          <img
            src={media.url}
            alt={content}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      {/* Overlay gradient for content visibility */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      
      {/* Content and controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
        {/* User info */}
        <div className="flex items-center mb-3">
          <div className="w-9 h-9 rounded-full overflow-hidden mr-2">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-bold">{user.username}</div>
            <div className="text-xs opacity-80">{new Date(timestamp).toLocaleDateString()}</div>
          </div>
        </div>
        
        {/* Post content */}
        <div className="mb-3">
          <p className="text-base">{content}</p>
          <div className="flex flex-wrap mt-1 space-x-1">
            {hashtags.map((tag, index) => (
              <span key={index} className="text-xs text-teal-400">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right side action buttons */}
      <div className="absolute right-3 bottom-1/4 flex flex-col items-center space-y-5">
        <button 
          className="flex flex-col items-center"
          onClick={handleLike}
        >
          <div className={`w-10 h-10 rounded-full ${liked ? 'bg-pink-500/30' : 'bg-black/20'} flex items-center justify-center mb-1`}>
            <Heart className={`w-6 h-6 ${liked ? 'text-pink-500 fill-pink-500' : ''}`} />
          </div>
          <span className="text-white text-xs">{likesCount}</span>
        </button>
        
        <button className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center mb-1">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-white text-xs">{comments || 0}</span>
        </button>
        
        <button className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center mb-1">
            <BookmarkSimple className="w-6 h-6" />
          </div>
          <span className="text-white text-xs">Save</span>
        </button>
        
        <button className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center mb-1">
            <Share2 className="w-6 h-6" />
          </div>
          <span className="text-white text-xs">Share</span>
        </button>
      </div>
    </div>
  );
};

export default MobilePostCard;