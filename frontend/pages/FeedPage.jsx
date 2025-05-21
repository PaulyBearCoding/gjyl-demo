import React from 'react';
import { usePlatform } from '../context/PlatformContext';
import { EXPERIENCES } from '../config/platforms';
import FeedContainer from '../components/feed/FeedContainer';

/**
 * The main feed page that renders the appropriate feed container
 * based on the current platform experience (mobile, desktop, or creator).
 */
const FeedPage = () => {
  const { experience, isLoading } = usePlatform();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin h-8 w-8 border-4 border-teal-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full">
      {/* The FeedContainer component will render the appropriate variant based on the platform */}
      <FeedContainer />
      
      {/* Additional page-specific components could be added here */}
    </div>
  );
};

export default FeedPage;