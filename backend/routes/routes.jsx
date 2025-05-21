import React, { lazy, Suspense } from 'react';

// Lazy load all route components
const Home = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const SignUp = lazy(() => import('../features/auth/pages/SignupForm'));
const ForgotPassword = lazy(() => import('../features/auth/pages/ResetPassword'));
const FeedPage = lazy(() => import('../pages/FeedPage'));
const Explore = lazy(() => import('../pages/shared/ExplorePage'));
const CreatePost = lazy(() => import('../features/create/pages/CreatePostPage'));
const Profile = lazy(() => import('../features/profile/pages/ProfilePage'));
const Settings = lazy(() => import('../pages/shared/SettingsPage'));
const MonetizationPage = lazy(() => import('../features/monetization/pages/MonetizationPage'));
const ChatDetailScreen = lazy(() => import('../features/communication/pages/ChatDetail'));

// Creator studio pages - lazy loaded
const CreatorDashboard = lazy(() => import('../features/creator-studio/pages/Dashboard'));
const ContentLibrary = lazy(() => import('../features/creator-studio/pages/ContentLibrary'));
const Analytics = lazy(() => import('../features/creator-studio/pages/Analytics'));
const Community = lazy(() => import('../features/creator-studio/pages/Community'));
const CreatorSettings = lazy(() => import('../features/creator-studio/pages/CreatorSettings'));

// Public routes accessible without authentication
export const publicRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
    title: 'Login',
  },
  {
    path: '/signup',
    element: <SignUp />,
    title: 'Sign Up',
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    title: 'Forgot Password',
  },
  {
    path: '/',
    element: <Home />,
    title: 'Home',
  },
];

// Private routes that require authentication
export const privateRoutes = [
  {
    path: '/feed',
    element: <FeedPage />,
    title: 'Feed',
  },
  {
    path: '/explore',
    element: <Explore />,
    title: 'Explore',
  },
  {
    path: '/create',
    element: <CreatePost />,
    title: 'Create Post',
  },
  {
    path: '/profile',
    element: <Profile />,
    title: 'Profile',
  },
  {
    path: '/profile/:username',
    element: <Profile />,
    title: 'User Profile',
  },
  {
    path: '/settings',
    element: <Settings />,
    title: 'Settings',
  },
  {
    path: '/monetization/*',
    element: <MonetizationPage />,
    title: 'Monetization',
  },
  {
    path: '/conversations/:conversationId',
    element: <ChatDetailScreen />,
    title: 'Chat',
  },
];

// Creator studio routes
export const creatorRoutes = [
  {
    path: '/creator',
    element: <CreatorDashboard />,
    title: 'Creator Studio',
  },
  {
    path: '/creator/dashboard',
    element: <CreatorDashboard />,
    title: 'Creator Dashboard',
  },
  {
    path: '/creator/content',
    element: <ContentLibrary />,
    title: 'Content Library',
  },
  {
    path: '/creator/analytics',
    element: <Analytics />,
    title: 'Analytics',
  },
  {
    path: '/creator/community',
    element: <Community />,
    title: 'Community',
  },
  {
    path: '/creator/monetization/*',
    element: <MonetizationPage />,
    title: 'Monetization',
  },
  {
    path: '/creator/settings',
    element: <CreatorSettings />,
    title: 'Creator Settings',
  },
];

// Combine all routes
export const allRoutes = [...publicRoutes, ...privateRoutes, ...creatorRoutes];

// Helper function to find route by path
export const getRouteByPath = (path) => {
  return allRoutes.find((route) => route.path === path);
};

export default {
  publicRoutes,
  privateRoutes,
  creatorRoutes,
  allRoutes,
  getRouteByPath,
};