import React from 'react';

// Import monetization features
import { MonetizationPage } from '../features/monetization';
// Import group features
import { 
  GroupDiscoveryPage, 
  GroupDetailPage,
  MobileGroupDetailPage
} from '../features/groups';

// Import your pages here
// For now, use placeholder components as examples
const Home = () => <div>Home Page</div>;
const Login = () => <div>Login Page</div>;
const SignUp = () => <div>Sign Up Page</div>;
const ForgotPassword = () => <div>Forgot Password Page</div>;
const Feed = () => <div>Feed Page</div>;
const Explore = () => <div>Explore Page</div>;
const CreatePost = () => <div>Create Post Page</div>;
const Profile = () => <div>Profile Page</div>;
const Settings = () => <div>Settings Page</div>;

// Creator studio pages
const CreatorDashboard = () => <div>Creator Dashboard</div>;
const ContentLibrary = () => <div>Content Library</div>;
const Analytics = () => <div>Analytics</div>;
const Community = () => <div>Community</div>;
const CreatorSettings = () => <div>Creator Settings</div>;

// Public routes accessible without authentication
export const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
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
    element: <Feed />,
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
  // Group routes
  {
    path: '/groups',
    element: <GroupDiscoveryPage />,
    title: 'Groups',
  },
  {
    path: '/groups/:groupId',
    element: <GroupDetailPage />,
    title: 'Group Detail',
  },
  {
    path: '/m/groups/:groupId',
    element: <MobileGroupDetailPage />,
    title: 'Group (Mobile)',
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