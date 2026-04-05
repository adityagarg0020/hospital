import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/layout/Layout';
import { AnimatePresence, motion } from 'framer-motion';

import ProtectedRoute from './components/auth/ProtectedRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';

// Lazy loaded page components
const HomePage = lazy(() => import('./pages/HomePage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const QueuePage = lazy(() => import('./pages/QueuePage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const AppointmentsPage = lazy(() => import('./pages/AppointmentsPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const PrescriptionsPage = lazy(() => import('./pages/PrescriptionsPage'));
const PatientsPage = lazy(() => import('./pages/PatientsPage'));
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'));

function PageLoader() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
    </div>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </motion.div>
  );
}

function AppRoutes() {
  const { isAuthenticated, role } = useApp();

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
        <Route path="/auth" element={
          isAuthenticated ? <Navigate to={`/${role}`} replace /> : <Suspense fallback={<PageLoader />}><AuthPage /></Suspense>
        } />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route path="/patient" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PageTransition><Dashboard /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/doctor" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <PageTransition><Dashboard /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PageTransition><Dashboard /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/appointments" element={
            <ProtectedRoute allowedRoles={['patient', 'doctor', 'admin']}>
              <PageTransition><AppointmentsPage /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/queue" element={
            <ProtectedRoute allowedRoles={['patient', 'doctor', 'admin']}>
              <PageTransition><QueuePage /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute allowedRoles={['patient', 'doctor', 'admin']}>
              <PageTransition><ChatPage /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PageTransition><HistoryPage /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/prescriptions" element={
            <ProtectedRoute allowedRoles={['patient', 'doctor']}>
              <PageTransition><PrescriptionsPage /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/patients" element={
            <ProtectedRoute allowedRoles={['doctor', 'admin']}>
              <PageTransition><PatientsPage /></PageTransition>
            </ProtectedRoute>
          } />
          <Route path="/doctors" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PageTransition><DoctorsPage /></PageTransition>
            </ProtectedRoute>
          } />
        </Route>

        {/* Catch all */}
        <Route path="*" element={
          <Navigate to={
            !isAuthenticated ? '/' :
            `/${role}`
          } replace />
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '16px',
                padding: '12px 16px',
                fontSize: '14px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              },
            }}
          />
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
