import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import '@/components/common/ErrorBoundary.css';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const RiderBookPage = lazy(() => import('@/pages/rider/RiderBookPage'));
const RideCompletion = lazy(() => import('@/pages/rider/RideCompletion'));
const PaymentHistoryPage = lazy(() => import('@/pages/rider/PaymentHistory'));
const RiderMyRides = lazy(() => import('@/pages/rider/RiderMyRides'));
const RiderProfile = lazy(() => import('@/pages/rider/RiderProfile'));
const DriverDashboardPage = lazy(() => import('@/pages/driver/DriverDashboardPage'));
const DriverMyRides = lazy(() => import('@/pages/driver/DriverMyRides'));
const DriverProfile = lazy(() => import('@/pages/driver/DriverProfile'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'));
const UsersManagementPage = lazy(() => import('@/pages/admin/UsersManagementPage'));
const RidesManagementPage = lazy(() => import('@/pages/admin/RidesManagementPage'));
const UserDetailsPage = lazy(() => import('@/pages/admin/UserDetailsPage'));

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ErrorBoundary>
          <AuthProvider>
            <ErrorBoundary>
              <SocketProvider>
                <div className="App">
                  <Suspense fallback={<LoadingSpinner message="Loading application..." />}>
                    <ErrorBoundary>
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Protected Routes - Rider */}
                        <Route
                          path="/rider/*"
                          element={
                            <ProtectedRoute requiredRole="rider">
                              <Layout title="Rider Dashboard">
                                <Routes>
                                  <Route path="book" element={<RiderBookPage />} />
                                  <Route path="completion/:rideId" element={<RideCompletion />} />
                                  <Route path="payments" element={<PaymentHistoryPage />} />
                                  <Route path="rides" element={<RiderMyRides />} />
                                  <Route path="profile" element={<RiderProfile />} />
                                  <Route path="" element={<Navigate to="book" replace />} />
                                </Routes>
                              </Layout>
                            </ProtectedRoute>
                          }
                        />

                        {/* Protected Routes - Driver */}
                        <Route
                          path="/driver/*"
                          element={
                            <ProtectedRoute requiredRole="driver">
                              <Layout title="Driver Dashboard">
                                <Routes>
                                  <Route path="dashboard" element={<DriverDashboardPage />} />
                                  <Route path="rides" element={<DriverMyRides />} />
                                  <Route path="completion/:rideId" element={<RideCompletion />} />
                                  <Route path="profile" element={<DriverProfile />} />
                                  <Route path="" element={<Navigate to="dashboard" replace />} />
                                </Routes>
                              </Layout>
                            </ProtectedRoute>
                          }
                        />

                        {/* Protected Routes - Admin */}
                        <Route
                          path="/admin/*"
                          element={
                            <ProtectedRoute requiredRole="admin">
                              <Layout title="Admin Dashboard">
                                <Routes>
                                  <Route path="dashboard" element={<AdminDashboardPage />} />
                                  <Route path="" element={<AdminDashboardPage />} />
                                  <Route path="users" element={<UsersManagementPage />} />
                                  <Route path="users/:userId" element={<UserDetailsPage />} />
                                  <Route path="rides" element={<RidesManagementPage />} />
                                </Routes>
                              </Layout>
                            </ProtectedRoute>
                          }
                        />

                        {/* Default redirect */}
                        <Route path="/" element={<Navigate to="/login" replace />} />

                        {/* 404 fallback */}
                        <Route path="" element={<Navigate to="/" replace />} />
                      </Routes>
                    </ErrorBoundary>
                  </Suspense>
                </div>
              </SocketProvider>
            </ErrorBoundary>
          </AuthProvider>
        </ErrorBoundary>
      </Router>
    </ErrorBoundary>
  );
}

export default App;