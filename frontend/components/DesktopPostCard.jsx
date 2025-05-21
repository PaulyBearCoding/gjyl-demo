import React, { useState, useCallback, memo } from 'react';
import { Heart, MessageCircle, Share2, BookmarkSimple, ThumbsUp, ThumbsDown } from 'lucide-react';

/**
 * Desktop post card component - displays a post with image/video content 
 * and interactive elements. Optimized with memoization.
 */
const DesktopPostCard = memo(({ post, expanded = false, onLike, onComment, onShare, onSave }) => {
  const [showComments, setShowComments] = useState(expanded);
  
  // Memoized callback functions
  const toggleComments = useCallback(() => {
    if (!expanded) setShowComments(prev => !prev);
  }, [expanded]);
  
  if (!post) return null;
  
  const {
    id,
    user,
    content,
    media,
    likes,
    comments,
    timestamp,
    hashtags = []
  } = post;

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${expanded ? 'w-full' : 'max-w-2xl mx-auto'}`}>
      <div className={`flex ${expanded ? 'flex-row' : 'flex-col'}`}>
        {/* Media section */}
        <div className={`${expanded ? 'w-2/3' : 'w-full'} bg-black relative`}>
          {media.type === 'video' ? (
            <div className="aspect-video">
              <video
                src={media.url}
                className="w-full h-full object-contain"
                controls
                autoPlay={expanded}
                loop
                playsInline
              />
            </div>
          ) : (
            <div className="aspect-video">
              <img
                src={media.url}
                alt={content}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          {/* Video control overlay (visible on hover) */}
          {media.type === 'video' && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent h-16 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-between px-4">
              <div className="flex space-x-2">
                <button className="text-white p-1 rounded-full bg-black/20 hover:bg-black/40">
                  <ThumbsUp className="w-5 h-5" />
                </button>
                <button className="text-white p-1 rounded-full bg-black/20 hover:bg-black/40">
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-white text-sm font-medium">
                {media.duration && `${Math.floor(media.duration / 60)}:${(media.duration % 60).toString().padStart(2, '0')}`}
              </div>
            </div>
          )}
        </div>
        
        {/* Content and interaction section */}
        <div className={`${expanded ? 'w-1/3 border-l' : 'w-full'} flex flex-col`}>
          {/* User info */}
          <div className="flex items-center p-4 border-b">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="font-bold">{user.username}</div>
              <div className="text-xs text-gray-500">{new Date(timestamp).toLocaleDateString()}</div>
            </div>
            <button className="text-pink-500 font-medium text-sm hover:text-pink-600">
              Follow
            </button>
          </div>
          
          {/* Post content */}
          <div className="p-4">
            <p className="text-base mb-2">{content}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {hashtags.map((tag, index) => (
                <span key={index} className="text-xs text-teal-500 hover:underline cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
            
            {/* Interaction buttons */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-700 hover:text-pink-500">
                  <Heart className="w-5 h-5 mr-1" />
                  <span>{likes || 0}</span>
                </button>
                
                <button 
                  className="flex items-center text-gray-700 hover:text-blue-500"
                  onClick={toggleComments}
                >
                  <MessageCircle className="w-5 h-5 mr-1" />
                  <span>{comments?.length || 0}</span>
                </button>
              </div>
              
              <div className="flex space-x-3">
                <button className="text-gray-700 hover:text-green-500">
                  <BookmarkSimple className="w-5 h-5" />
                </button>
                
                <button className="text-gray-700 hover:text-blue-500">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Comments section - only in expanded view or when comments are toggled */}
          {(expanded || showComments) && comments?.length > 0 && (
            <div className="mt-2 border-t flex-1 overflow-y-auto max-h-80">
              <div className="p-4">
                <h3 className="font-medium mb-3">Comments ({comments.length})</h3>
                <div className="space-y-3">
                  {comments.map((comment, idx) => (
                    <div key={idx} className="flex">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                        <img 
                          src={comment.user.avatar} 
                          alt={comment.user.username}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <div className="bg-gray-100 rounded-lg p-2">
                          <div className="font-medium text-sm">{comment.user.username}</div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                        <div className="flex space-x-4 mt-1 text-xs text-gray-500">
                          <span>{new Date(comment.timestamp).toLocaleDateString()}</span>
                          <button className="hover:text-gray-700">Like</button>
                          <button className="hover:text-gray-700">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Comment input - always visible in expanded view */}
          {expanded && (
            <div className="p-4 border-t mt-auto">
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:border-pink-500"
                />
                <button className="ml-2 bg-pink-500 text-white rounded-full px-4 py-2 font-medium hover:bg-pink-600">
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  // Memoized action handlers
  const handleLike = useCallback(() => {
    onLike && onLike(id);
  }, [onLike, id]);
  
  const handleComment = useCallback(() => {
    onComment && onComment(id);
  }, [onComment, id]);
  
  const handleShare = useCallback(() => {
    onShare && onShare(id);
  }, [onShare, id]);
  
  const handleSave = useCallback(() => {
    onSave && onSave(id);
  }, [onSave, id]);

// Custom comparison function for memoization
}, (prevProps, nextProps) => {
  // Only re-render if these props change
  if (!prevProps.post || !nextProps.post) return prevProps.post === nextProps.post;
  
  return (
    prevProps.expanded === nextProps.expanded &&
    prevProps.post.id === nextProps.post.id &&
    prevProps.post.likes === nextProps.post.likes &&
    prevProps.post.comments?.length === nextProps.post.comments?.length
  );
});

export default DesktopPostCard;