import React from 'react';
import usePlatform from '../hooks/usePlatform';
import { EXPERIENCES } from '../config/platforms';
import { useAuth } from '../context/AuthContext';

// Mobile home screen (landing page for non-logged in users)
const MobileHomeIntro = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-purple-800 to-pink-500 flex flex-col items-center justify-between p-8 text-white">
      <div></div>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8">IGetTo</h1>
        <p className="text-xl font-semibold mb-12">SHARE WHAT YOU GET TO DO</p>
      </div>
      <div className="w-full">
        <button 
          onClick={() => window.location.href = '/signup'}
          className="w-full bg-teal-400 text-gray-800 py-3 rounded-full font-semibold mb-4">
          Sign up
        </button>
        <button 
          onClick={() => window.location.href = '/login'}
          className="w-full bg-transparent border border-white text-white py-3 rounded-full font-semibold">
          Log in
        </button>
      </div>
    </div>
  );
};

// Desktop home screen for non-logged in users
const DesktopHomeIntro = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-purple-800 to-pink-500 text-white py-24">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Share What You Get To Do</h1>
            <p className="text-xl mb-8">
              Join millions sharing gratitude and positivity through short-form video. 
              <br />IGetTo helps you connect with like-minded people focused on positive experiences.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => window.location.href = '/signup'}
                className="bg-teal-400 text-gray-800 px-8 py-3 rounded-full font-semibold text-lg hover:bg-teal-300 transition">
                Get Started
              </button>
              <button 
                onClick={() => window.location.href = '/login'}
                className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white/10 transition">
                Log in
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
              <img 
                src="https://picsum.photos/600/800" 
                alt="IGetTo App Preview" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose IGetTo?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mb-4 text-pink-500 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Positivity Focused</h3>
              <p className="text-gray-600">
                Our community is centered around gratitude and sharing positive experiences, creating a supportive environment.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-pink-500 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Creative Expression</h3>
              <p className="text-gray-600">
                Express yourself through short videos, creative filters, and authentic moments that inspire others.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-pink-500 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Supportive Community</h3>
              <p className="text-gray-600">
                Connect with a community that uplifts each other by celebrating daily moments of gratitude.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to spread gratitude?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of creators sharing what they get to do every day.
          </p>
          <button 
            onClick={() => window.location.href = '/signup'}
            className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-pink-600 transition">
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Mobile feed for logged-in users
const MobileFeed = () => {
  // This would fetch posts from an API in a real app
  const posts = [
    {
      id: 1,
      user: {
        id: 1,
        username: 'johndoe',
        avatar: 'https://picsum.photos/100/100',
      },
      content: 'I get to enjoy a beautiful sunset today!',
      media: {
        type: 'image',
        url: 'https://picsum.photos/400/600',
      },
      likes: 245,
      comments: 32,
      timestamp: new Date().toISOString(),
      hashtags: ['sunset', 'blessed', 'gratitude'],
    },
  ];
  
  return (
    <div className="h-screen bg-black">
      {/* Feed would use a PostCard component */}
      <div className="text-white p-4">
        <h1>Your feed would appear here</h1>
      </div>
    </div>
  );
};

// Desktop feed for logged-in users
const DesktopFeed = () => {
  // This would fetch posts from an API in a real app
  return (
    <div className="py-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-6">For You</h2>
          <div className="space-y-6">
            {/* Feed would use DesktopPostCard components */}
            <div className="bg-white rounded-lg shadow p-4">
              <p>Desktop feed with posts would appear here</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow p-4 sticky top-20">
            <h3 className="font-bold text-lg mb-4">Suggested for You</h3>
            <div className="space-y-4">
              {/* Suggested accounts would appear here */}
              <p>Suggested accounts would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main home page component
const Home = () => {
  const { experience } = usePlatform();
  const { isAuthenticated } = useAuth();
  
  // Decide which version to show based on authentication and platform
  if (!isAuthenticated) {
    // For non-logged in users, show intro screens
    return experience === EXPERIENCES.MOBILE ? <MobileHomeIntro /> : <DesktopHomeIntro />;
  }
  
  // For logged in users, show the feed
  return experience === EXPERIENCES.MOBILE ? <MobileFeed /> : <DesktopFeed />;
};

export default Home;