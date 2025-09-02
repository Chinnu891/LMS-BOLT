import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import StudentDashboard from './pages/Student/StudentDashboard';
import MyCoursesPage from './pages/Student/MyCoursesPage';
import FavouritesPage from './pages/Student/FavouritesPage';
import CertificatesPage from './pages/Student/CertificatesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import InstructorDashboard from './pages/Instructor/InstructorDashboard';
import ManageCoursesPage from './pages/Instructor/ManageCoursesPage';
import CreateCoursePage from './pages/Instructor/CreateCoursePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminUsersPage from './pages/Admin/AdminUsersPage';
import AdminCoursesPage from './pages/Admin/AdminCoursesPage';
import AdminPaymentsPage from './pages/Admin/AdminPaymentsPage';
import AdvancedFeaturesPage from './pages/AdvancedFeaturesPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/features" element={<AdvancedFeaturesPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />

          {/* Student Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/my-courses" element={
            <ProtectedRoute role="student">
              <MyCoursesPage />
            </ProtectedRoute>
          } />
          <Route path="/favourites" element={
            <ProtectedRoute role="student">
              <FavouritesPage />
            </ProtectedRoute>
          } />
          <Route path="/certificates" element={
            <ProtectedRoute role="student">
              <CertificatesPage />
            </ProtectedRoute>
          } />

          {/* Instructor Routes */}
          <Route path="/instructor" element={
            <ProtectedRoute role="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/instructor/courses" element={
            <ProtectedRoute role="instructor">
              <ManageCoursesPage />
            </ProtectedRoute>
          } />
          <Route path="/instructor/courses/create" element={
            <ProtectedRoute role="instructor">
              <CreateCoursePage />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute role="admin">
              <AdminUsersPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/courses" element={
            <ProtectedRoute role="admin">
              <AdminCoursesPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/payments" element={
            <ProtectedRoute role="admin">
              <AdminPaymentsPage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <AppContent />
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;