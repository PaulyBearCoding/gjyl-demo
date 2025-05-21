import React from 'react';
import usePlatform from '../../../hooks/usePlatform';
import MobilePostCard from './MobilePostCard';
import DesktopPostCard from './DesktopPostCard';
import { EXPERIENCES } from '../../../config/platforms';

/**
 * Platform-aware PostCard component
 * Renders the appropriate PostCard based on the current platform experience
 * 
 * Features:
 * - Platform-specific UI and interactions
 * - Advanced video playback with gesture controls
 * - Interactive engagement functionality (likes, comments, shares)
 * - Creator-specific controls for content owners
 * 
 * Usage:
 * <PostCard 
 *   post={postData} 
 *   onLike={(postId) => handleLike(postId)}
 *   onComment={(postId) => openComments(postId)}
 *   onShare={(postId) => sharePost(postId)}
 * />
 * 
 * Will automatically select the appropriate component:
 * - Mobile experience: MobilePostCard with optimized touch controls
 * - Desktop experience: DesktopPostCard with expanded functionality
 * - Creator experience: DesktopPostCard with additional creator controls
 */
const PostCard = (props) => {
  const { experience, isCreator } = usePlatform();
  
  // For creator studio, add special props if this is the user's own content
  const isOwnContent = isCreator && props.post?.user?.id === props.currentUserId;
  const enhancedProps = {
    ...props,
    isOwnContent,
    // Add analytics and editing capabilities for creator's own content
    showCreatorControls: isOwnContent,
    // Default handlers if not provided
    onLike: props.onLike || (() => {}),
    onComment: props.onComment || (() => {}),
    onShare: props.onShare || (() => {})
  };
  
  // Render based on platform experience
  switch (experience) {
    case EXPERIENCES.MOBILE:
      return <MobilePostCard {...enhancedProps} />;
    case EXPERIENCES.DESKTOP:
    case EXPERIENCES.CREATOR:
      return <DesktopPostCard {...enhancedProps} />;
    default:
      // Fallback to mobile version
      return <MobilePostCard {...enhancedProps} />;
  }
};

export default PostCard;