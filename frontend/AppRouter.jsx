import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import usePlatform from '../hooks/usePlatform';
import { useAuth } from '../context/AuthContext';
import { EXPERIENCES } from '../config/platforms';

// Layouts
const ResponsiveLayout = lazy(() => import('../layouts/ResponsiveLayout'));
const MobileLayout = lazy(() => import('../layouts/MobileLayout'));
const DesktopUserLayout = lazy(() => import('../layouts/DesktopUserLayout'));
const CreatorLayout = lazy(() => import('../layouts/CreatorLayout'));

// Import routes
import { publicRoutes, privateRoutes, creatorRoutes } from './routes.jsx';

// Loading component for Suspense fallback
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-700 rounded-full animate-spin"></div>
  </div>
);

// Private route wrapper
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Creator route wrapper
const CreatorRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { isCreator } = usePlatform();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isCreator) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const AppRouter = () => {
  const { experience } = usePlatform();
  
  // Determine the appropriate layout based on experience
  let DefaultLayout;
  switch (experience) {
    case EXPERIENCES.MOBILE:
      DefaultLayout = MobileLayout;
      break;
    case EXPERIENCES.DESKTOP:
      DefaultLayout = DesktopUserLayout;
      break;
    case EXPERIENCES.CREATOR:
      DefaultLayout = CreatorLayout;
      break;
    default:
      DefaultLayout = ResponsiveLayout;
  }
  
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public routes */}
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<Loading />}>
                  <ResponsiveLayout>
                    <Suspense fallback={<Loading />}>
                      {route.element}
                    </Suspense>
                  </ResponsiveLayout>
                </Suspense>
              }
            />
          ))}
          
          {/* Private routes */}
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute>
                  <Suspense fallback={<Loading />}>
                    <DefaultLayout>
                      <Suspense fallback={<Loading />}>
                        {route.element}
                      </Suspense>
                    </DefaultLayout>
                  </Suspense>
                </PrivateRoute>
              }
            />
          ))}
          
          {/* Creator routes */}
          {creatorRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <CreatorRoute>
                  <Suspense fallback={<Loading />}>
                    <CreatorLayout>
                      <Suspense fallback={<Loading />}>
                        {route.element}
                      </Suspense>
                    </CreatorLayout>
                  </Suspense>
                </CreatorRoute>
              }
            />
          ))}
          
          {/* Not found route */}
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <ResponsiveLayout>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold mb-4">404</h1>
                      <p className="text-xl">Page not found</p>
                    </div>
                  </div>
                </ResponsiveLayout>
              </Suspense>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;